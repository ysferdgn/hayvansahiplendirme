import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaShare, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from '../utils/axios';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`/api/pets/${id}`);
        setPet(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load pet details');
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C]"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pet Images */}
        <div className="space-y-4">
          <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
            <img
              src={pet.images[0]}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {pet.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${pet.name} - ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pet Information */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
              <p className="text-gray-600">{pet.breed}</p>
            </div>
            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-[#4CAF50]">
                <FaHeart />
              </button>
              <button className="text-gray-600 hover:text-[#4CAF50]">
                <FaShare />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About {pet.name}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Age</p>
                  <p className="font-medium">{pet.age} years</p>
                </div>
                <div>
                  <p className="text-gray-600">Gender</p>
                  <p className="font-medium">{pet.gender}</p>
                </div>
                <div>
                  <p className="text-gray-600">Size</p>
                  <p className="font-medium">{pet.size}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium">{pet.location}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Description</p>
                <p className="mt-2">{pet.description}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Contact the Owner</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#4CAF50]" />
                <span>{pet.owner.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#4CAF50]" />
                <span>{pet.owner.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#4CAF50]" />
                <span>{pet.owner.location}</span>
              </div>
            </div>
            <button className="w-full mt-6 px-6 py-3 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C]">
              Contact Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail; 