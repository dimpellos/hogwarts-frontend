'use client';

import { useEffect, useState } from 'react';
import HouseCard from '../components/HouseCard';
import { fetchHousesByQuery } from '../lib/api';

type House = {
  id: number;
  name: string;
  founder: string;
  animalSymbol: string;
  color?: string;
  attributes: string[];
};

export default function Home() {
  const [name, setName] = useState('');
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);
  
      const fetchPromise = fetchHousesByQuery(name);
      const delayPromise = new Promise((res) => setTimeout(res, 1000)); // Minimum spinner time
  
      Promise.all([fetchPromise, delayPromise])
        .then(([fetchedHouses]) => setHouses(fetchedHouses))
        .catch((err) => console.error('API error:', err))
        .finally(() => setLoading(false));
    }, 300);
  
    return () => clearTimeout(delayDebounce);
  }, [name]);

  return (
    <main className="flex flex-col items-start py-10 px-4 font-[Verdana,sans-serif] max-w-3xl mx-auto">
      {/* Search box */}
      <input
        type="text"
        placeholder="Search houses"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-64 p-3 border border-gray-300 rounded-lg shadow-sm mb-8"
        style={{
          fontFamily: 'Verdana, sans serif',
          borderRadius: '6px',
          minHeight: '32px',
          paddingLeft: '5px',
        }}
      />

      {/* House Cards or Spinner */}
      <div className="flex flex-col gap-8 m-4">
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid transparent',
              borderTop: '4px solid #3B82F6', // Tailwind blue-500
              borderBottom: '4px solid #3B82F6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          houses.map((house) => (
            <div key={house.id} className="w-[25rem]">
              <HouseCard {...house} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
