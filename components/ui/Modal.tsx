import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="w-[90%] md:w-[80%] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-[-40px] right-[0] text-white dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
