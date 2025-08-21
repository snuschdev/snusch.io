import { create } from 'zustand';
import type { ReactNode } from 'react';

export interface Window {
  id: string;
  title: string;
  content: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
}

interface WindowStore {
  windows: Window[];
  activeWindow: string | null;
  maxZIndex: number;
  addWindow: (window: Omit<Window, 'zIndex'>) => void;
  removeWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  setActiveWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  activeWindow: null,
  maxZIndex: 0,
  addWindow: (window) =>
    set((state) => ({
      windows: [
        ...state.windows,
        { ...window, zIndex: state.maxZIndex + 1 }
      ],
      maxZIndex: state.maxZIndex + 1,
      activeWindow: window.id,
    })),
  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    })),
  toggleMinimize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    })),
  toggleMaximize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w;
        if (!w.isMaximized) {
          // Store current size/position and maximize
          return {
            ...w,
            prevPosition: { ...w.position },
            prevSize: { ...w.size },
            isMaximized: true,
          };
        } else {
          // Restore previous size/position
          return {
            ...w,
            isMaximized: false,
            position: w.prevPosition ?? w.position,
            size: w.prevSize ?? w.size,
            prevPosition: undefined,
            prevSize: undefined,
          };
        }
      }),
    })),
  setActiveWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, zIndex: state.maxZIndex + 1 }
          : w
      ),
      maxZIndex: state.maxZIndex + 1,
      activeWindow: id,
    })),
  updateWindowPosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    })),
  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    })),
}));
