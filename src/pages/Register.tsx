import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types';
import { Music, User, Lock, Mail, Phone, CalendarDays, MapPin, Guitar } from 'lucide-react';

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = searchParams.get('role') as UserRole || 'student';
  
  const [role, setRole] = useState<UserRole>(initialRole);
  const [step, setStep] = useState(1);
  const [isNewStudent, setIsNewStudent] = useState(true);
  
  const { register, isLoading, error } = useAuthStore();
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    congregation: '',
    instrument: '',
    church: '',
    pastorName: '',
    sundayServiceTime: 'morning' as 'morning' | 'evening',
    startDate: '',
    password: '',
    confirmPassword: '',
    photo: null as File | null,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };
  
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleStudentTypeChange = (isNew: boolean) => {
    setIsNewStudent(isNew);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      alert("As senhas não coincidem");
      return;
    }
    
    try {
      // In a real app, you'd upload the photo to a storage service and get a URL
      const photoUrl = formData.photo ? URL.createObjectURL(formData.photo) : undefined;
      
      // Create user data based on role
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        photo: photoUrl,
        // Student-specific fields
        ...(role === 'student' && {
          instrument: formData.instrument,
          congregation: formData.congregation,
          ...(isNewStudent ? {} : { startDate: formData.startDate }),
        }),
        // Maestro-specific fields
        ...(role === 'maestro' && {
          church: formData.church,
          pastorName: formData.pastorName,
          sundayServiceTime: formData.sundayServiceTime,
        }),
      };
      
      await register(userData, formData.password, role);
      
      // For students, show success message and redirect
      if (role === 'student') {
        alert("Cadastro realizado com sucesso! Seu cadastro será avaliado pelos maestros e diretores.");
        navigate('/registration-success');
      } else {
        alert("Cadastro realizado com sucesso! Aguarde a aprovação do seu cadastro.");
        navigate('/');
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  
  // Render form based on role and step
  const renderForm = () => {
    if (role === 'student') {
      if (step === 1) {
        return (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tipo de Cadastro</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                  isNewStudent ? 'bg-indigo-50 border-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                }`}
                onClick={() => handleStudentTypeChange(true)}
              >
                <h4 className="font-medium text-indigo-900 mb-2">Novo Aluno</h4>
                <p className="text-sm text-gray-600">
                  Primeira vez se matriculando na Escola de Música ADVS.
                </p>
              </div>
              
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                  !isNewStudent ? 'bg-indigo-50 border-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                }`}
                onClick={() => handleStudentTypeChange(false)}
              >
                <h4 className="font-medium text-indigo-900 mb-2">Recadastro de Aluno</h4>
                <p className="text-sm text-gray-600">
                  Já foi aluno da Escola de Música ADVS anteriormente.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Próximo
              </button>
            </div>
          </div>
        );
      } else if (step === 2) {
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="congregation" className="block text-sm font-medium text-gray-700 mb-1">
                  Congregação/Igreja
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="congregation"
                    name="congregation"
                    value={formData.congregation}
                    onChange={handleChange}
                    placeholder="Nome e localização da igreja que frequenta"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="instrument" className="block text-sm font-medium text-gray-700 mb-1">
                  Instrumento que Deseja Aprender
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Guitar className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="instrument"
                    name="instrument"
                    value={formData.instrument}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Selecione um instrumento</option>
                    <option value="violin">Violino</option>
                    <option value="viola">Viola</option>
                    <option value="cello">Violoncelo</option>
                    <option value="bass">Contrabaixo</option>
                    <option value="flute">Flauta</option>
                    <option value="clarinet">Clarinete</option>
                    <option value="oboe">Oboé</option>
                    <option value="bassoon">Fagote</option>
                    <option value="trumpet">Trompete</option>
                    <option value="trombone">Trombone</option>
                    <option value="french-horn">Trompa</option>
                    <option value="tuba">Tuba</option>
                    <option value="percussion">Percussão</option>
                    <option value="piano">Piano</option>
                  </select>
                </div>
              </div>
              
              {!isNewStudent && (
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Início na Escola
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                  Foto (Selfie)
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  required
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Próximo
              </button>
            </div>
          </div>
        );
      } else if (step === 3) {
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cadastre uma Senha</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirme a Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Seu cadastro será enviado para análise dos Maestros e Diretores. Após aprovação, você receberá um e-mail com as instruções de acesso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? 'Processando...' : 'Finalizar Cadastro'}
              </button>
            </div>
          </div>
        );
      }
    } else if (role === 'maestro') {
      return (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cadastro de Maestro</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="church" className="block text-sm font-medium text-gray-700 mb-1">
                Igreja em que Congrega
              </label>
              <input
                type="text"
                id="church"
                name="church"
                value={formData.church}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="pastorName" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Pastor
              </label>
              <input
                type="text"
                id="pastorName"
                name="pastorName"
                value={formData.pastorName}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horário de Culto no Domingo
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="morning"
                    name="sundayServiceTime"
                    type="radio"
                    value="morning"
                    checked={formData.sundayServiceTime === 'morning'}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="morning" className="ml-2 block text-sm text-gray-700">
                    Manhã
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="evening"
                    name="sundayServiceTime"
                    type="radio"
                    value="evening"
                    checked={formData.sundayServiceTime === 'evening'}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="evening" className="ml-2 block text-sm text-gray-700">
                    Noite
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirme a Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Seu cadastro será enviado para análise da diretoria e do Maestro Regional Jonathas Teles. Após aprovação, você receberá um WhatsApp com as instruções de acesso.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Cadastrar'}
            </button>
          </div>
        </div>
      );
    } else if (role === 'pastor') {
      return (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cadastro de Pastor Presidente</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="church" className="block text-sm font-medium text-gray-700 mb-1">
                  Igreja
                </label>
                <input
                  type="text"
                  id="church"
                  name="church"
                  value={formData.church}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirme a Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Seu cadastro passará por um processo de verificação com os Maestros e Diretores. Após aprovação, você receberá um WhatsApp com as instruções de acesso.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Cadastrar'}
            </button>
          </div>
        </div>
      );
    }
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Music className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Cadastro na AMADVS</h2>
          <p className="mt-2 text-lg text-gray-600">
            Faça parte da nossa comunidade musical e desenvolva seu talento.
          </p>
        </div>
        
        {/* Role selector */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selecione seu perfil</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  role === 'student' ? 'bg-indigo-50 border-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                }`}
                onClick={() => handleRoleChange('student')}
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Aluno</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Cadastre-se como aluno para participar dos cursos e atividades da escola.
                </p>
              </div>
              
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  role === 'maestro' ? 'bg-indigo-50 border-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                }`}
                onClick={() => handleRoleChange('maestro')}
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <Music className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Maestro</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Cadastre-se como maestro para ministrar aulas e conduzir a orquestra.
                </p>
              </div>
              
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  role === 'pastor' ? 'bg-indigo-50 border-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                }`}
                onClick={() => handleRoleChange('pastor')}
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">Pastor Presidente</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Cadastre-se como Pastor Presidente para acompanhar o desenvolvimento da escola.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Registration form */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              {renderForm()}
            </form>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Register;