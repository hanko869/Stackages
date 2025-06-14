import React from "react";

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed p-4 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 bg-white rounded-xl flex flex-col items-center">
        <span className="loading loading-ring loading-lg"></span>
        <p className="mt-4 text-sm text-black">Processing, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
