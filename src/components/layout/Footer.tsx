import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Music className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold">AMADVS</span>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              Escola de Música ADVS oferecendo educação musical de qualidade presencial e à distância.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-indigo-700 pb-2">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 text-sm">Início</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-400 text-sm">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-yellow-400 text-sm">Cursos</Link>
              </li>
              <li>
                <Link to="/library" className="text-gray-300 hover:text-yellow-400 text-sm">Biblioteca</Link>
              </li>
              <li>
                <Link to="/store" className="text-gray-300 hover:text-yellow-400 text-sm">Loja Virtual</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-indigo-700 pb-2">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Daniel: (11) 97376-8373</span>
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Maestro Jonathas: (11) 95721-0280</span>
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Dansax2016@gmail.com</span>
              </li>
              <li className="flex items-start text-gray-300 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-yellow-400 flex-shrink-0 mt-1" />
                <span>Sede da Escola de Música ADVS</span>
              </li>
            </ul>
          </div>

          {/* Social Media and Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-indigo-700 pb-2">Siga-nos</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-yellow-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            <h3 className="text-lg font-semibold mb-2">Boletim Informativo</h3>
            <p className="text-gray-300 text-sm mb-2">
              Inscreva-se para receber novidades e atualizações.
            </p>
            <form className="flex mt-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="px-3 py-2 w-full text-sm text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-r-md font-medium hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-indigo-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Escola de Música ADVS (AMADVS). Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;