import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  
  const openWhatsApp = (message: string) => {
    // Daniel's WhatsApp number
    const phoneNumber = '5511973768373';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setShowOptions(false);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showOptions && (
        <div className="bg-white rounded-lg shadow-xl p-4 mb-4 w-64 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-indigo-900">Como podemos ajudar?</h3>
            <button 
              onClick={toggleOptions}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-2">
            <button 
              onClick={() => openWhatsApp('Olá! Gostaria de informações sobre as aulas de música.')}
              className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded transition"
            >
              Informações sobre aulas
            </button>
            <button 
              onClick={() => openWhatsApp('Olá! Gostaria de saber como posso contribuir com a escola de música.')}
              className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded transition"
            >
              Como contribuir
            </button>
            <button 
              onClick={() => openWhatsApp('Olá! Tenho dúvidas sobre o processo de matrícula.')}
              className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded transition"
            >
              Dúvidas sobre matrícula
            </button>
            <button 
              onClick={() => openWhatsApp('Olá! Gostaria de falar com um representante da escola.')}
              className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded transition"
            >
              Falar com representante
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={toggleOptions}
        className={`flex items-center justify-center w-14 h-14 rounded-full ${showOptions ? 'bg-red-500' : 'bg-green-500'} text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none`}
      >
        {showOptions ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;