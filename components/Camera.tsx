import React, { useRef, useState, useEffect } from 'react';
import { Camera as CameraIcon, RotateCcw } from 'lucide-react';

interface CameraProps {
  onCapture: (base64Data: string) => void;
  onCancel: () => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access camera. Please allow permissions or use file upload.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Mirror the image horizontally to feel like a mirror
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0);
        
        // Convert to base64 (remove prefix for API)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64 = dataUrl.split(',')[1];
        onCapture(base64);
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-sakura-50 rounded-lg">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover transform -scale-x-100" // Mirror effect via CSS
      />
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-t from-black/50 to-transparent">
        <button 
          onClick={onCancel}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
        
        <button 
          onClick={handleCapture}
          className="p-1 border-4 border-white/50 rounded-full hover:scale-105 transition-transform"
        >
          <div className="w-14 h-14 bg-sakura-500 rounded-full flex items-center justify-center text-white">
            <CameraIcon size={28} />
          </div>
        </button>
        
        <div className="w-12" /> {/* Spacer for symmetry */}
      </div>
    </div>
  );
};