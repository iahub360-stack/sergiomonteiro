'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface GeminiVisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

export default function GeminiVisionModal({ isOpen, onClose, content }: GeminiVisionModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] transition-opacity duration-300"
      onClick={onClose}
      style={{ 
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
    >
      <div 
        className="max-w-[600px] w-[90%] p-8 relative bg-[rgba(16,16,32,0.6)] backdrop-blur-[10px] border border-[rgba(0,255,255,0.1)] rounded-2xl transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          transform: isOpen ? 'scale(1)' : 'scale(0.95)'
        }}
      >
        {content}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}