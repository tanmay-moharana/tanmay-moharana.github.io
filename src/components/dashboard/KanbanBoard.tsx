"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, Timestamp, query, orderBy } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { db } from "../../lib/firebase";
import TaskModal from "./TaskModal";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    priority: "High" | "Medium" | "Low";
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Fetch tasks from Firestore in real-time
    useEffect(() => {
        const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const taskDatas = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Task[];
            setTasks(taskDatas);
        }, (error) => {
            console.error("Firestore Listen Error:", error);
        });

        return () => unsubscribe();
    }, []);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            await addDoc(collection(db, "tasks"), {
                title: newTaskTitle,
                description: "",
                status: "todo",
                priority: "Medium",
                createdAt: Timestamp.now()
            });
            setNewTaskTitle("");
            setIsAdding(false);
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };

    const handleDeleteTask = async (taskId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // prevent modal opening
        try {
            await deleteDoc(doc(db, "tasks", taskId));
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return; // Dropped outside valid zones
        if (destination.droppableId === source.droppableId && destination.index === source.index) return; // Exact same spot

        const newStatus = destination.droppableId as Task["status"];
        
        // Optimistic UI update
        const previousTasks = [...tasks];
        setTasks(prev => prev.map(t => t.id === draggableId ? { ...t, status: newStatus } : t));

        try {
            await updateDoc(doc(db, "tasks", draggableId), {
                status: newStatus
            });
        } catch (error) {
            console.error("Error dragging task: ", error);
            setTasks(previousTasks); // Revert on failure
        }
    };

    const columns: Array<{ id: Task["status"]; title: string }> = [
        { id: "todo", title: "To Do" },
        { id: "in-progress", title: "In Progress" },
        { id: "done", title: "Completed" }
    ];

    return (
        <section className="space-y-6 select-none">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-[#c0c7d6]">Activities</h3>
                    <span className="px-2 py-0.5 rounded bg-[#c0c7d6]/10 text-[#c0c7d6] text-[10px] font-bold">{tasks.length} Total</span>
                </div>
                <div className="flex gap-2 relative">
                    {isAdding ? (
                        <form onSubmit={handleAddTask} className="flex items-center gap-2">
                            <input 
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                placeholder="Task title..."
                                className="px-3 py-1.5 bg-[#1c1b1b] text-sm text-[#e5e2e1] outline-none border border-[#ffffff0a] rounded focus:border-[#c0c7d6]"
                                autoFocus
                            />
                            <button type="button" onClick={() => setIsAdding(false)} className="px-2 text-xs text-[#6b7280] hover:text-[#e5e2e1]">Cancel</button>
                            <button type="submit" className="px-3 py-1.5 bg-[#c0c7d6] text-[#2a313d] rounded text-xs font-bold uppercase tracking-widest active:scale-95 transition-all">Save</button>
                        </form>
                    ) : (
                        <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-[#c0c7d6] text-[#2a313d] rounded-lg text-xs font-bold uppercase tracking-widest active:scale-95 transition-all outline-none">New Task</button>
                    )}
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4" style={{scrollbarWidth: 'none'}}>
                    {columns.map((column) => {
                        const columnTasks = tasks.filter(t => t.status === column.id);

                        return (
                            <Droppable key={column.id} droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div 
                                        className={`space-y-4 min-w-[320px] rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-[#ffffff0a]' : 'bg-transparent'}`}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="flex items-center justify-between px-2 mb-4">
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">
                                                {column.title} / {columnTasks.length < 10 ? `0${columnTasks.length}` : columnTasks.length}
                                            </span>
                                        </div>
                                        
                                        <div className="min-h-[200px] flex flex-col gap-4">
                                            {columnTasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div 
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => setSelectedTask(task)}
                                                            className={`
                                                                p-4 rounded-lg relative group transition-all cursor-grab active:cursor-grabbing outline-none
                                                                ${column.id === 'done' ? 'bg-[#1c1b1b] opacity-60 hover:opacity-100' : column.id === 'in-progress' ? 'bg-[#201f1f] border border-[#c0c7d6]/20' : 'bg-[#1c1b1b] border border-transparent hover:border-[#ffffff0a]'}
                                                                ${snapshot.isDragging ? 'shadow-2xl opacity-100 ring-2 ring-[#c0c7d6] z-50 scale-105' : 'shadow-none'}
                                                            `}
                                                        >
                                                            {column.id === 'in-progress' && (
                                                                <div className="absolute top-0 left-0 w-1 h-full bg-[#c0c7d6] rounded-l-lg" />
                                                            )}
                                                            
                                                            <div className="flex justify-between items-start mb-3">
                                                                <span className={`inline-block px-2 py-0.5 text-[8px] uppercase font-bold rounded ${column.id === 'in-progress' ? 'bg-[#c0c7d6]/20 text-[#c0c7d6]' : 'bg-[#2a2a2a] text-[#c0c7d6]'}`}>
                                                                    Priority: {task.priority}
                                                                </span>
                                                                <button onClick={(e) => handleDeleteTask(task.id, e)} className="opacity-0 group-hover:opacity-100 text-[#6b7280] hover:text-red-400 p-1">&times;</button>
                                                            </div>
                                                            <h5 className={`text-sm font-semibold text-[#e5e2e1] mb-2 pr-4 ${column.id === 'done' ? 'line-through' : ''}`}>
                                                                {task.title}
                                                            </h5>
                                                            {task.description && (
                                                                <p className="text-xs text-[#c5c6cc]/70 mb-4 line-clamp-2 leading-relaxed pointer-events-none">
                                                                    {task.description}
                                                                </p>
                                                            )}
                                                            <div className="flex justify-between items-center mt-4">
                                                                {column.id === 'done' ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500">
                                                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                                    </svg>
                                                                ) : (
                                                                   <div className="w-full h-0.5"></div>
                                                                )}
                                                                <span className="text-[10px] text-[#6b7280] font-mono whitespace-nowrap">ID-{task.id.slice(0, 4)}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DragDropContext>
            
            <TaskModal task={selectedTask} isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} />
        </section>
    );
}
