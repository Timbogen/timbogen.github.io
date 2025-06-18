"use client";

import React, { useRef, useEffect } from "react";
import styles from "./matrix.module.scss";

/**
 * A component that renders a "Matrix" style raining code animation on a canvas.
 * It's designed to be a full-page background that scrolls with the content.
 */
export const Matrix: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Add willReadFrequently attribute for performance optimization
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return;

        // Characters used in the animation
        const alphabet = "01";

        const fontSize = 16;
        let columns: number = 0;
        let rainDrops: number[] = [];
        let isVisible: boolean[] = []; // Tracks if a column's stream is visible

        // --- DENSITY VARIABLES ---
        let edgeDensity = 0.7;
        let centerDensity = 0.02;

        // Function to set canvas dimensions and reset columns
        const setCanvasDimensionsAndColumns = () => {
            const newWidth = window.innerWidth;
            const newHeight = document.body.scrollHeight;

            if (canvas.width === newWidth && canvas.height === newHeight) {
                return;
            }

            // --- DYNAMIC DENSITY CALCULATION ---
            const maxWidth = 2560; // Max width for density calculation
            const minWidth = 320; // Min width
            const maxEdgeDensity = 0.9; // Higher density for smaller screens
            const minEdgeDensity = 0.5; // Lower density for larger screens
            const centerDensityFactor = 0.1; // Center is always much sparser

            // Clamp the current width to our min/max range
            const clampedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));

            // Calculate the density based on screen width (linear interpolation)
            edgeDensity =
                maxEdgeDensity -
                ((clampedWidth - minWidth) / (maxWidth - minWidth)) * (maxEdgeDensity - minEdgeDensity);
            centerDensity = edgeDensity * centerDensityFactor;

            const oldImageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const oldWidth = canvas.width;
            const oldColumns = columns;
            const oldRainDrops = [...rainDrops];
            const oldIsVisible = [...isVisible];

            canvas.width = newWidth;
            canvas.height = newHeight;

            // Calculate the horizontal offset to center the old content
            const xOffset = newWidth > oldWidth ? (newWidth - oldWidth) / 2 : 0;
            context.putImageData(oldImageData, xOffset, 0);

            columns = Math.floor(canvas.width / fontSize);
            rainDrops = [];
            isVisible = [];

            // Calculate the number of columns to shift the old data by
            const columnOffset = Math.floor(xOffset / fontSize);

            for (let x = 0; x < columns; x++) {
                // If the column falls within the centered old data, preserve its state
                if (x >= columnOffset && x < columnOffset + oldColumns) {
                    rainDrops[x] = oldRainDrops[x - columnOffset];
                    isVisible[x] = oldIsVisible[x - columnOffset];
                } else {
                    // Otherwise, initialize a new column on the edges
                    rainDrops[x] = -Math.random() * (canvas.height / fontSize);
                    const isCenter = x > columns * 0.3 && x < columns * 0.7;
                    if (isCenter) {
                        isVisible[x] = Math.random() < centerDensity;
                    } else {
                        isVisible[x] = Math.random() < edgeDensity;
                    }
                }
            }
        };

        const handleResize = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(setCanvasDimensionsAndColumns, 100);
        };

        // Use requestAnimationFrame for a more elegant way to wait for the DOM to be ready
        const initAnimationFrame = requestAnimationFrame(() => {
            setCanvasDimensionsAndColumns();
        });

        const draw = () => {
            // Get the current pixel data to manually create a fade effect
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const width = canvas.width;

            // Iterate over all pixels to apply a variable fade and eliminate ghosting
            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (alpha === 0) continue; // Skip already transparent pixels

                // Calculate the pixel's x position to determine the fade speed
                const pixelIndex = i / 4;
                const x = pixelIndex % width;

                // Calculate how fast to fade based on horizontal position
                const distanceFromCenter = Math.abs(x - width / 2);
                const normalizedDistance = distanceFromCenter / (width / 2);

                // Increased the difference between center and edge fade factors for a stronger effect
                const centerFadeFactor = 0.85; // Faster fade (shorter trails) in the center
                const edgeFadeFactor = 0.97; // Slower fade (longer trails) at the edges
                const fadeFactor = centerFadeFactor + normalizedDistance * (edgeFadeFactor - centerFadeFactor);

                const newAlpha = alpha * fadeFactor;

                // Aggressive threshold to definitively kill ghosting
                data[i + 3] = newAlpha < 20 ? 0 : newAlpha;
            }

            // Put the faded pixel data back
            context.putImageData(imageData, 0, 0);

            // Draw the new characters for this frame
            context.fillStyle = "#03c712";
            context.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i += 2) {
                if (isVisible[i]) {
                    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                    context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                }

                const resetThreshold = 0.98;

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > resetThreshold) {
                    rainDrops[i] = 0;
                    // Apply a random visibility check everywhere upon reset
                    const isCenter = i > columns * 0.3 && i < columns * 0.7;
                    if (isCenter) {
                        isVisible[i] = Math.random() < centerDensity; // Use the calculated density
                    } else {
                        isVisible[i] = Math.random() < edgeDensity; // Use the calculated density
                    }
                } else {
                    rainDrops[i]++;
                }
            }
        };

        const interval = setInterval(draw, 80);

        const observer = new MutationObserver(handleResize);
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            cancelAnimationFrame(initAnimationFrame);
        };
    }, []); // Main effect runs only once on mount

    return <canvas ref={canvasRef} className={styles.matrixCanvas} />;
};
