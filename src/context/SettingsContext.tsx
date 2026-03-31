"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

interface Settings {
    githubUsername: string;
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
    loadingSettings: boolean;
}

const defaultSettings: Settings = {
    githubUsername: "tanmay-moharana"
};

const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: async () => {},
    loadingSettings: true
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [loadingSettings, setLoadingSettings] = useState(true);

    useEffect(() => {
        if (!user) {
            setSettings(defaultSettings);
            setLoadingSettings(false);
            return;
        }

        const userDocRef = doc(db, "users", user.uid);
        
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setSettings({ ...defaultSettings, ...docSnap.data() });
            } else {
                // Initialize default on first access
                setDoc(userDocRef, defaultSettings, { merge: true });
            }
            setLoadingSettings(false);
        }, (error) => {
            console.error("Error fetching settings:", error);
            setLoadingSettings(false);
        });

        return () => unsubscribe();
    }, [user]);

    const updateSettings = async (newSettings: Partial<Settings>) => {
        if (!user) return;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, newSettings, { merge: true });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, loadingSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
