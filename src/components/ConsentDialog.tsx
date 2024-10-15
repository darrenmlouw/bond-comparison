import React from 'react';

interface ConsentDialogProps {
  onConsent: (allowStorage: boolean) => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({ onConsent }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Storage Permission</h2>
        <p className="mb-4">
          This application would like to store data on your device using cookies and local storage. Do you consent?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => onConsent(true)}
          >
            Allow
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => onConsent(false)}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentDialog;
