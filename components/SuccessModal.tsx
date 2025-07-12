
import React, { useEffect } from 'react';

interface SuccessModalProps {
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full text-center border-2 border-green-500/50 transform transition-transform duration-300 ease-out animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <style>
          {`
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scale-up {
              from { transform: scale(0.9); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .checkmark__circle {
              stroke-dasharray: 166;
              stroke-dashoffset: 166;
              stroke-width: 3;
              stroke-miterlimit: 10;
              stroke: #4ade80; /* green-400 */
              fill: none;
              animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              display: block;
              stroke-width: 3;
              stroke: #fff;
              stroke-miterlimit: 10;
              margin: 0 auto 20px auto;
              box-shadow: inset 0px 0px 0px #4ade80;
              animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            }
            .checkmark__check {
              transform-origin: 50% 50%;
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }
            @keyframes stroke {
              100% {
                stroke-dashoffset: 0;
              }
            }
            @keyframes scale {
              0%, 100% {
                transform: none;
              }
              50% {
                transform: scale3d(1.1, 1.1, 1);
              }
            }
            @keyframes fill {
              100% {
                box-shadow: inset 0px 0px 0px 40px #4ade80;
              }
            }
          `}
        </style>
        
        <div className="checkmark-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">ส่งข้อมูลสำเร็จ!</h2>
        <p className="text-slate-300 mb-6">
          ข้อมูลของคุณถูกส่งไปยัง Discord เรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด
        </p>
        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-colors"
        >
          ตกลง
        </button>

        <div className="mt-6 pt-4 border-t border-slate-600/50 text-center">
          <p className="text-sm text-slate-400 mb-3">หากต้องการการตอบกลับที่เร็วให้ติดต่อตามนี้:</p>
          <div className="flex justify-center items-center gap-x-3 sm:gap-x-4 flex-wrap gap-y-2">
            <a href="https://www.instagram.com/lxmonadier._/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-fuchsia-400 transition-colors text-sm font-medium">
              Instagram
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a href="https://www.facebook.com/LemonadeX20" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Facebook
            </a>
             <span className="text-slate-600 hidden sm:inline">|</span>
            <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 transition-colors text-sm font-medium">
              Discord
            </a>
             <span className="text-slate-600 hidden sm:inline">|</span>
            <a href="https://line.me/ti/p/BI6O7ex0-x" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-green-400 transition-colors text-sm font-medium">
              Line
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
