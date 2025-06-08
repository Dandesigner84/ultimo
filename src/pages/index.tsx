import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Carousel from '../components/home/Carousel';
import Birthday from '../components/home/Birthday';
import { Users, BookOpen, PlayCircle, Clock } from 'lucide-react';

const Home: React.FC = () => {
  // Mock data for carousel
  const carouselImages = [
    {
      url: '/images/violino-orquestra.jpg',
      alt: 'Violino com fundo de orquestra',
      caption: 'Destaque para o Violino na Orquestra'
    },
    {
      url: 'https://images.pexels.com/photos/7097455/pexels-photo-7097455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Music classroom',
      caption: 'Aulas teóricas e práticas'
    },
    {
      url: 'https://images.pexels.com/photos/4090902/pexels-photo-4090902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Student practicing',
      caption: 'Alunos em desenvolvimento'
    }
  ];

  // Mock birthday person
  const birthdayPerson = {
    id: '123',
    name: 'Maria Silva',
    role: 'Professora de Violino',
    photoUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  };

  return (
    <Layout>
      <Hero />

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900">Sobre a AMADVS</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto my-4"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Uma escola de música dedicada ao ensino de excelência e ao desenvolvimento de talentos musicais, com foco na formação de instrumentistas para a orquestra.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Nossa Missão</h3>
              <p className="text-gray-700 mb-6">
                Formar músicos talentosos através de um ensino de qualidade, proporcionando acesso à educação musical tanto presencial quanto à distância, e contribuindo para o desenvolvimento cultural da comunidade.
              </p>

              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Nossa Visão</h3>
              <p className="text-gray-700 mb-6">
                Ser referência no ensino musical, formando instrumentistas de excelência e mantendo uma orquestra de alto nível, reconhecida por sua qualidade artística e contribuição cultural.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">+500</h4>
                    <p className="text-sm text-gray-600">Alunos formados</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">20+</h4>
                    <p className="text-sm text-gray-600">Cursos oferecidos</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <PlayCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">30+</h4>
                    <p className="text-sm text-gray-600">Apresentações anuais</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">15+</h4>
                    <p className="text-sm text-gray-600">Anos de história</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Carousel images={carouselImages} />
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900">Celebrações</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto my-4"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Compartilhamos momentos especiais da nossa comunidade musical.
            </p>
          </div>

          <Birthday person={birthdayPerson} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Faça Parte da Nossa Orquestra</h2>
          <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
            Inicie sua jornada musical conosco e desenvolva seu talento sob a orientação dos melhores professores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register?role=student" 
              className="px-6 py-3 bg-yellow-400 text-indigo-900 font-medium rounded-md hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Matricule-se Agora
            </a>
            <a 
              href="/courses" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300"
            >
              Conheça Nossos Cursos
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
