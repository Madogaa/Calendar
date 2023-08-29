import React, { useEffect, useState } from 'react'
import { useApp } from '../Context/AppContext';
import './ErrorMessage.css'

function ErrorMessage() {
  const { err, msg, msgTrigger } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (msg) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }, [msgTrigger]);

  return (
    <div
      className={`flex items-center absolute justify-center err w-full h-16 text-white-t font-semibold z-50
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        ${err ? 'bg-red-500' : 'bg-green-500'}
      `}
    >
      {msg}
    </div>
  );
}

export default ErrorMessage