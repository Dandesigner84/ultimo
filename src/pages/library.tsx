import React, { useState } from 'react';

const mockSongs = [
  { id: 1, title: 'Hallelujah - Leonard Cohen' },
  { id: 2, title: 'Bohemian Rhapsody - Queen' },
  { id: 3, title: 'Imagine - John Lennon' },
  { id: 4, title: 'Clair de Lune - Debussy' },
  { id: 5, title: 'Nocturne Op.9 No.2 - Chopin' },
];

const Biblioteca = () => {
  const [search, setSearch] = useState('');

  const filteredSongs = mockSongs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Biblioteca de Músicas</h1>

      <input
        type="text"
        placeholder="Buscar música por nome ou artista..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredSongs.length > 0 ? (
        <ul className="space-y-4">
          {filteredSongs.map((song) => (
            <li
              key={song.id}
              className="bg-white shadow-md rounded-md px-4 py-3 flex justify-between items-center"
            >
              <span>{song.title}</span>
              <button className="text-sm text-indigo-600 hover:underline">Ouvir</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhuma música encontrada.</p>
      )}
    </div>
  );
};

export default Biblioteca;
