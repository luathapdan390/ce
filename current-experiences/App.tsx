import React, { useState } from 'react';
import { scenarios } from './constants/scenarios';

const App: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleShowRandomScenario = () => {
    setIsFading(true);
    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * scenarios.length);
      
      // Avoid showing the same scenario twice in a row if possible
      if (scenarios.length > 1 && scenarios[randomIndex] === currentScenario) {
        randomIndex = (randomIndex + 1) % scenarios.length;
      }
      
      setCurrentScenario(scenarios[randomIndex]);
      setIsFading(false);
    }, 300); // This duration should match the fade-out transition
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased">
      {/* Custom scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563; /* bg-gray-600 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280; /* bg-gray-500 */
        }
      `}</style>
      
      <div className="w-full max-w-4xl text-center flex flex-col items-center">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 animate-fade-in-down">
            Trải Nghiệm Hiện Tại
          </h1>
          <p className="text-lg sm:text-xl text-gray-400">
            Nhấn nút bên dưới để khám phá trải nghiệm hiện tại của bạn.
          </p>
        </header>

        <main className="w-full h-96 min-h-[24rem] flex items-center justify-center">
          <div
            className={`transition-opacity duration-300 ease-in-out w-full ${isFading ? 'opacity-0' : 'opacity-100'}`}
          >
            {currentScenario ? (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-left max-h-[24rem] overflow-y-auto custom-scrollbar">
                <p className="whitespace-pre-wrap text-gray-300 leading-relaxed text-base sm:text-lg">
                  {currentScenario}
                </p>
              </div>
            ) : (
                <div className="text-gray-500 text-2xl italic">Đấy là hiện tại của bạn</div>
            )}
          </div>
        </main>

        <footer className="mt-8">
          <button
            onClick={handleShowRandomScenario}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300 active:scale-100"
          >
            {currentScenario ? 'Khám Phá Trải Nghiệm Khác' : 'Khám Phá Trải Nghiệm Của Tôi'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;