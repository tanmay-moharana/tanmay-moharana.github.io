"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const frameCount = 192; // Total 192 frames in sequence2

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        // Preload images into memory to avoid flickering on scroll
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");

            // Handle specific sequence2 filenames (last frame has different delay)
            const delayStr = i === 191 ? "2.058s" : "0.042s";
            img.src = `/sequence2/frame_${paddedIndex}_delay-${delayStr}.webp`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                }
            };
            loadedImages.push(img);
        }
    }, []);

    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(frameIndex.get());
        };

        const renderFrame = (index: number) => {
            const img = images[Math.round(index)];
            if (!img) return;

            // Crop 8% from the bottom of the source image to hide the Veo watermark
            const cropMarginBottom = img.height * 0.08;

            const sX = 0;
            const sY = 0;
            const sWidth = img.width;
            const sHeight = img.height - cropMarginBottom;

            // Object-fit: cover logic based on the cropped dimensions
            const scale = Math.max(canvas.width / sWidth, canvas.height / sHeight);
            const x = (canvas.width / 2) - (sWidth / 2) * scale;
            const y = (canvas.height / 2) - (sHeight / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, sX, sY, sWidth, sHeight, x, y, sWidth * scale, sHeight * scale);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // Draw initial frame

        // Subscriber to update frame on scroll
        const unsubscribe = frameIndex.on("change", (latest) => {
            renderFrame(latest);
        });

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            unsubscribe();
        };
    }, [images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
            <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>
        </div>
    );
}
