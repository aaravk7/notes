import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Modal(props: ModalProps) {
  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [props.isOpen]);

  if (!props.isOpen) return null;
  return (
    <div className="fixed inset-0">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-black opacity-10"
          onClick={props.onClose}
        ></div>
        <div className="relative z-10 bg-white p-8 rounded-lg shadow">
          <div className="absolute top-1 right-3 text-2xl font-medium">
            <button
              onClick={props.onClose}
              className="text-gray-500 hover:text-indigo-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
          <div className="min-w-[20rem] max-w-[90%]">
            <h2 className="text-2xl font-bold mb-4">{props.title}</h2>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
