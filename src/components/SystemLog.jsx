"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SystemLog({ logs = [] }) {
    const [visibleLogs, setVisibleLogs] = useState([]);
    const [currentLogIdx, setCurrentLogIdx] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentLogIdx >= logs.length) {
            setIsComplete(true);
            return;
        }

        const fullText = logs[currentLogIdx];
        let charIdx = 0;

        const timer = setInterval(() => {
            if (charIdx <= fullText.length) {
                setCurrentText(fullText.slice(0, charIdx));
                charIdx++;
            } else {
                clearInterval(timer);
                setVisibleLogs(prev => [...prev, fullText]);
                setCurrentText("");
                setCurrentLogIdx(prev => prev + 1);
            }
        }, 30); // Speed of typing

        return () => clearInterval(timer);
    }, [currentLogIdx, logs]);

    return (
        <div className="mb-16 font-mono text-xs text-orange-500 border-l-2 border-orange-500 pl-4 py-1 opacity-80 uppercase tracking-widest min-h-[40px]">
            {visibleLogs.map((log, i) => (
                <p key={i} className={i > 0 ? "mt-1" : ""}>
                    {log}
                </p>
            ))}
            {!isComplete && (
                <p className={visibleLogs.length > 0 ? "mt-1" : ""}>
                    {currentText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-1.5 h-3 bg-orange-500 ml-1 align-middle"
                    />
                </p>
            )}
        </div>
    );
}
