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
  const [query, setQuery] = useState('');
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);
      fetchHousesByQuery(query)
        .then(setHouses)
        .catch((err) => console.error('API error:', err))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <main className="flex flex-col items-start py-10 px-4 font-[Verdana,sans-serif] max-w-3xl mx-auto">
      {/* Search box */}
      <input
        type="text"
        placeholder="Search houses"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
          <div className="flex justify-center items-center py-6">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
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
