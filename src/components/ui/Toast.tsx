'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  let timeoutId: NodeJS.Timeout;

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`toast ${toast.visible ? 'on' : ''}`} role="status" aria-live="polite">
        {toast.message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}