'use client';

import { useState } from 'react';

interface HouseCardProps {
  name: string;
  founder: string;
  animalSymbol: string;
  color?: string;
  attributes: string[];
}

export default function HouseCard({
  name,
  founder,
  animalSymbol,
  color,
  attributes,
}: HouseCardProps) {
  const [traitFilter, setTraitFilter] = useState('');

  const getValidColor = (inputColor?: string) => {
    if (inputColor && CSS.supports('color', inputColor)) {
      return inputColor;
    }
    return 'white';
  };

  const validColor = getValidColor(color);

  const filteredTraits =
    traitFilter.trim() === ''
      ? attributes
      : attributes.filter((trait) =>
          trait.toLowerCase().includes(traitFilter.toLowerCase())
        );

  return (
    <div className="house-card bg-white rounded-lg shadow-md border border-gray-200 mb-6">
      {/* Header row */}
      <div className="flex justify-between items-center"
      style={{
        marginTop: '-16px',
        marginBottom: '-8px',
        padding: '0px'
      }}>
        <h2 className="text-xl font-bold">{name}</h2>
        <span className="text-sm">{animalSymbol}</span>
      </div>

      {/* Gradient bar */}
      <div
        className="h-4 w-full mb-4"
        style={{
          borderRadius: '6px',
          minHeight: '20px',
          background: `linear-gradient(to right, ${validColor}, black)`,
          marginBottom: '-8px',
        }}
      ></div>

      {/* Founder */}
      <p className="mb-3 text-sm"
        style={{
          fontFamily: 'Verdana, sans serif',
          marginBottom: '8px',
        }}
        >
        <span>Founder:</span>{' '}
        <strong className="font-semibold">{founder}</strong>
      </p>

      {/* Trait search */}
      <input
        type="text"
        placeholder="Search house traits"
        value={traitFilter}
        onChange={(e) => setTraitFilter(e.target.value)}
        className="w-2/3 px-3 py-2 border border-gray-300 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          fontFamily: 'Verdana, sans serif',
          minHeight: '24px',
          borderRadius: '6px',
          marginBottom: '8px',
          paddingLeft: '5px',
        }}
      />

      {/* Traits */}
      <div className="flex flex-wrap gap-2 mb-3">
        {filteredTraits.map((trait, index) => (
          <span
            key={index}
            className="bg-[#3c2f2f] text-xs font-semibold px-3 py-1"
            style={{
              fontFamily: 'Verdana, sans serif',
              borderRadius: '6px',
              fontSize: '12px',
              color: 'lightgrey',
              marginRight: '8px',
              marginBottom: '8px',  
              padding: '5px',
            }}
          >
            {trait}
          </span>
        ))}
    </div>


    </div>
  );
}
