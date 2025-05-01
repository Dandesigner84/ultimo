import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Music, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Music className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold">AMADVS</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-yellow-400">
                Início
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-yellow-400">
                Sobre
              </Link>
              <Link to="/courses" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-yellow-400">
                Cursos
              </Link>
              <Link to="/library" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-yellow-400">
                Biblioteca
              </Link>
              <Link to="/store" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-yellow-400">
                Loja
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-sm font-medium hover:text-yellow-400">
                  Painel
                </Link>
                <button 
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Sair
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-indigo-800">
              Início
            </Link>
            <Link to="/about" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-indigo-800">
              Sobre
            </Link>
            <Link to="/courses" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-indigo-800">
              Cursos
            </Link>
            <Link to="/library" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-indigo-800">
              Biblioteca
            </Link>
            <Link to="/store" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-indigo-800">
              Loja
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-indigo-800">
                  Painel
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-400 hover:bg-indigo-800"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block pl-3 pr-4 py-2 text-base font-medium text-yellow-400 hover:bg-indigo-800">
                  Entrar
                </Link>
                <Link to="/register" className="block pl-3 pr-4 py-2 text-base font-medium bg-indigo-700 hover:bg-indigo-600">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;