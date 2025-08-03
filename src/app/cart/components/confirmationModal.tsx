'use client';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: ConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h3 className="text-xl font-bold text-zinc-900">{title}</h3>
        <p className="mt-2 text-base text-zinc-600">{message}</p>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-zinc-200 text-zinc-800 rounded-md hover:bg-zinc-300 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}