import React from 'react';
import ReactDOM from 'react-dom';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onCancel}
            className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
