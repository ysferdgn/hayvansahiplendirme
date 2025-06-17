import React from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <img
          src={pet.images[0] || '/placeholder-pet.jpg'}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            pet.status === 'available' ? 'bg-green-100 text-green-800' :
            pet.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{pet.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <span className="mr-2">{pet.breed}</span>
          <span className="mx-2">•</span>
          <span>{pet.age} years old</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pet.description}</p>
        <Link
          to={`/pets/${pet._id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard; 