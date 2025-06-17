import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaPaw } from 'react-icons/fa';
import axios from '../utils/axios';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/pets/my-listings');
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/pets/${id}`);
      setListings(listings.filter(listing => listing.id !== id));
      setShowDeleteModal(false);
      setSelectedListing(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
      setError('Failed to delete listing');
    }
  };

  const confirmDelete = (listing) => {
    setSelectedListing(listing);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Pet Listings</h1>
          <button
            onClick={() => window.location.href = '/pets/new'}
            className="px-4 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C] flex items-center gap-2"
          >
            <FaPlus />
            Add New Listing
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {listings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FaPaw className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Listings Yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first pet listing</p>
            <button
              onClick={() => window.location.href = '/pets/new'}
              className="px-4 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C] flex items-center gap-2 mx-auto"
            >
              <FaPlus />
              Add New Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{listing.name}</h3>
                      <p className="text-gray-600">{listing.breed} • {listing.age} years old</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.location.href = `/pets/${listing.id}/edit`}
                        className="p-2 text-[#4CAF50] hover:text-[#388E3C]"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(listing)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{listing.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Status: <span className={listing.status === 'available' ? 'text-green-600' : 'text-gray-600'}>
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                    </span>
                    <button
                      onClick={() => window.location.href = `/pets/${listing.id}`}
                      className="text-[#4CAF50] hover:text-[#388E3C] text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Listing</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the listing for {selectedListing.name}? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedListing(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedListing.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings; 