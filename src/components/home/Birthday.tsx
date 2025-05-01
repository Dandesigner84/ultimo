import React from 'react';
import { Cake, MessageSquare } from 'lucide-react';

interface BirthdayProps {
  person: {
    id: string;
    name: string;
    role: string;
    photoUrl: string;
  } | null;
}

const Birthday: React.FC<BirthdayProps> = ({ person }) => {
  if (!person) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl overflow-hidden shadow-xl">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500">
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                <Cake className="h-4 w-4 text-indigo-900" />
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
              Aniversariante do Dia
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-1">{person.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{person.role}</p>
            
            <div className="bg-white p-3 rounded-lg shadow-inner">
              <p className="text-gray-800 italic text-sm">
                "Feliz aniversário! Que Deus continue abençoando sua vida e seu talento musical. Toda a família AMADVS celebra este dia especial com você!"
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 border-t border-indigo-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-indigo-600 font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Deixe uma mensagem
            </span>
            <button className="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors">
              Enviar Parabéns
            </button>
          </div>
          <textarea
            className="mt-2 w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Escreva sua mensagem de felicitações..."
            rows={2}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Birthday;