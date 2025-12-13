import { useState, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

interface WindowProps {
  title: string;
  children: ReactNode;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
}

export const Window = ({ title, children, zIndex, onClose, onFocus }: WindowProps) => {
  const [position, setPosition] = useState({ x: window.innerWidth < 640 ? 10 : 100 + Math.random() * 200, y: 50 + Math.random() * 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current || isMaximized) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      setPosition({
        x: dragRef.current.initialX + deltaX,
        y: Math.max(0, dragRef.current.initialY + deltaY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        x: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100%" : "auto",
        height: isMaximized ? "calc(100% - 80px)" : "auto",
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ zIndex, left: isMaximized ? 0 : position.x }}
      className={`fixed glass-strong rounded-2xl window-shadow overflow-hidden ${
        isMaximized ? "!left-0 !top-0" : ""
      }`}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between px-4 py-3 bg-window-header/80 cursor-move select-none border-b border-border/30"
      >
        <div className="flex items-center gap-2">
          {/* Window controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-destructive hover:bg-destructive/80 transition-colors"
          />
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(!isMaximized);
            }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
          />
        </div>
        <span className="text-sm font-medium text-foreground/80">{title}</span>
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className={`${isMaximized ? "h-[calc(100%-48px)]" : "w-[calc(100vw-20px)] sm:w-[600px] max-h-[70vh] sm:h-[450px]"} overflow-auto`}>
        {children}
      </div>
    </motion.div>
  );
};
