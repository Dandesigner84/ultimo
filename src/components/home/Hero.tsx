import React from 'react';
import { Link } from 'react-router-dom';
import { Music, BookOpen, Video, ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-indigo-900 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
        aria-hidden="true"
      ></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Escola de Música <span className="text-yellow-400">ADVS</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
              Desenvolvendo talentos musicais através de ensino de excelência, 
              tanto presencial quanto à distância.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/register?role=student"
                aria-label="Seja um aluno da Escola de Música ADVS"
                className="px-6 py-3 bg-yellow-400 text-indigo-900 font-medium rounded-md hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Seja um Aluno
              </Link>
              <Link
                to="/courses"
                aria-label="Conheça nossos cursos musicais"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300"
              >
                Conheça Nossos Cursos
              </Link>
            </div>
          </div>
          
          <div
            className="hidden md:block bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
            aria-label="Imagem e citação musical inspiradora"
          >
            <img
              src="/images/violino-orquestra.jpg.png"
              alt="Violino em uma orquestra"
              className="rounded-lg w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="mt-4 p-4 bg-indigo-800/80 backdrop-blur rounded-lg -mb-10 -ml-6 -mr-6 shadow-lg">
              <p className="text-white text-center font-medium italic">
                "A música dá alma ao universo, asas à mente, voo à imaginação e vida a tudo." - Platão
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature boxes */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              Icon: Music,
              title: 'Aulas Presenciais',
              description: 'Aprenda com os melhores maestros e professores em um ambiente inspirador.',
            },
            {
              Icon: Video,
              title: 'Aulas à Distância',
              description: 'Acesse conteúdo educacional de qualidade e aulas ao vivo de qualquer lugar.',
            },
            {
              Icon: BookOpen,
              title: 'Biblioteca Digital',
              description: 'Acesse partituras, livros e conteúdos exclusivos para aprimorar seus estudos.',
            },
            {
              Icon: ShoppingBag,
              title: 'Loja Virtual',
              description: 'Adquira materiais exclusivos, apostilas e produtos personalizados.',
            },
          ].map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-lg shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300"
              role="region"
              aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
              <h3 id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`} className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
