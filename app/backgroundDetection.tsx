"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import FaceDetection from "@/mediapipe/face-detection";
import initMediaPipVision from "@/mediapipe/mediapipe-vision";

const BackgroundDetection = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const [isPersonDetected, setPersonDetected] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const initModels = async () => {
            const vision = await initMediaPipVision();
            if (vision) {
                await FaceDetection.initModel(vision);
                console.log("Face detection model initialized");
            }
        };

        const runDetection = async () => {
            if (
                webcamRef.current &&
                webcamRef.current.video &&
                webcamRef.current.video.readyState === 4
            ) {
                const facePredictions = await FaceDetection.detectFace(
                    webcamRef.current.video
                );
                if (facePredictions?.detections && facePredictions.detections.length > 0) {
                    console.log("Face detected");
                    setPersonDetected(true);
                } else {
                    setPersonDetected(false);
                }
            }
        };

        initModels();

        const interval = setInterval(runDetection, 1000);
        return () => clearInterval(interval);
    }, [isClient]);

    useEffect(() => {
        if (isPersonDetected) {
            console.log("Redirecting to Google");
            const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL || "https://www.google.com";
            window.location.href = redirectUrl;
        }
    }, [isPersonDetected]);

    if (!isClient) {
        return null;
    }

    return (
        <div style={{ display: "none" }}>
            <Webcam ref={webcamRef} />
        </div>
    );
};

export default BackgroundDetection;
