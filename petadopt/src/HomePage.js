import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaPaw, FaSignInAlt, FaUserPlus, 
  FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone,
  FaSignOutAlt, FaBars, FaTimes, FaDog, FaCat, FaDove, FaPlus,
  FaBook, FaChevronDown
} from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredPets, setFeaturedPets] = useState([]);
  const [recentAds, setRecentAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPetMenuOpen, setIsPetMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredResponse, recentResponse] = await Promise.all([
          axios.get('/api/pets/featured'),
          axios.get('/api/pets/recent')
        ]);
        setFeaturedPets(featuredResponse.data);
        setRecentAds(recentResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <FaPaw className="text-3xl text-[#4CAF50]" />
              <span className="text-2xl font-bold text-[#4CAF50]">PetAdopt</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#4CAF50] font-medium">
                Home
              </Link>
              
              {/* Pets Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-gray-700 hover:text-[#4CAF50] font-medium"
                  onMouseEnter={() => setIsPetMenuOpen(true)}
                  onMouseLeave={() => setIsPetMenuOpen(false)}
                >
                  Pets <FaChevronDown className="ml-1" />
                </button>
                {isPetMenuOpen && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                    onMouseEnter={() => setIsPetMenuOpen(true)}
                    onMouseLeave={() => setIsPetMenuOpen(false)}
                  >
                    <Link to="/pets/dogs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FaDog className="inline mr-2" /> Dogs
                    </Link>
                    <Link to="/pets/cats" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FaCat className="inline mr-2" /> Cats
                    </Link>
                    <Link to="/pets/birds" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FaDove className="inline mr-2" /> Birds
                    </Link>
                    <Link to="/pets/other" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FaPaw className="inline mr-2" /> Other Pets
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/pet-guide" className="text-gray-700 hover:text-[#4CAF50] font-medium">
                <FaBook className="inline mr-1" /> Pet Guide
              </Link>

              {isAuthenticated && (
                <>
                  <Link to="/my-listings" className="text-gray-700 hover:text-[#4CAF50] font-medium">
                    My Listings
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-[#4CAF50] font-medium">
                    Profile
                  </Link>
                </>
              )}
              <Link to="/search" className="text-gray-700 hover:text-[#4CAF50] font-medium">
                Search
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/add-pet"
                    className="px-4 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C] transition-colors flex items-center gap-2"
                  >
                    <FaPlus /> Add Pet
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 border border-[#4CAF50] text-[#4CAF50] rounded-md hover:bg-[#4CAF50] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <FaSignInAlt /> Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C] transition-colors flex items-center gap-2"
                  >
                    <FaUserPlus /> Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#4CAF50]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/pets/dogs"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaDog className="inline mr-2" /> Dogs
              </Link>
              <Link
                to="/pets/cats"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaCat className="inline mr-2" /> Cats
              </Link>
              <Link
                to="/pets/birds"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaDove className="inline mr-2" /> Birds
              </Link>
              <Link
                to="/pet-guide"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaBook className="inline mr-2" /> Pet Guide
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/my-listings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/add-pet"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#4CAF50] hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaPlus className="inline mr-2" /> Add Pet
                  </Link>
                </>
              )}
              <Link
                to="/search"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Search
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-red-600 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#4CAF50] hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#4CAF50] hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* Quick Access Menu */}
        <section className="bg-gray-50 py-4 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/pets/dogs" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <FaDog className="text-[#4CAF50]" /> Dogs
              </Link>
              <Link to="/pets/cats" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <FaCat className="text-[#4CAF50]" /> Cats
              </Link>
              <Link to="/pets/birds" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <FaDove className="text-[#4CAF50]" /> Birds
              </Link>
              <Link to="/pets/other" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <FaPaw className="text-[#4CAF50]" /> Other Pets
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="hero relative">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Perfect Companion
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Give a loving home to a pet in need. Browse our selection of adorable pets waiting for adoption.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="px-8 py-3 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C] transition-colors text-lg font-medium"
              >
                Browse Pets
              </Link>
              <Link
                to="/pet-guide"
                className="px-8 py-3 bg-white text-[#4CAF50] rounded-md hover:bg-gray-100 transition-colors text-lg font-medium"
              >
                Pet Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Ads Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Recent Ads</h2>
              <Link to="/search" className="text-[#4CAF50] hover:text-[#388E3C] font-medium">
                View All
              </Link>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading recent ads...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentAds.map((pet) => (
                  <div key={pet.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                        {pet.type === 'dog' ? (
                          <FaDog className="text-[#4CAF50] text-xl" />
                        ) : (
                          <FaCat className="text-[#4CAF50] text-xl" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{pet.breed} • {pet.age} years old</p>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pet.description}</p>
                      <Link
                        to={`/pets/${pet.id}`}
                        className="block w-full px-4 py-2 bg-[#4CAF50] text-white text-center rounded-md hover:bg-[#388E3C] transition-colors text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Pets</h2>
              <Link to="/search" className="text-[#4CAF50] hover:text-[#388E3C] font-medium">
                View All
              </Link>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading featured pets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPets.map((pet) => (
                  <div key={pet.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                        {pet.type === 'dog' ? (
                          <FaDog className="text-[#4CAF50] text-xl" />
                        ) : (
                          <FaCat className="text-[#4CAF50] text-xl" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{pet.breed} • {pet.age} years old</p>
                      <p className="text-gray-500 text-sm mb-6">{pet.description}</p>
                      <Link
                        to={`/pets/${pet.id}`}
                        className="block w-full px-4 py-2 bg-[#4CAF50] text-white text-center rounded-md hover:bg-[#388E3C] transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Pet Guide Preview Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Pet Care Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/pet-guide/choosing" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choosing the Right Pet</h3>
                <p className="text-gray-600">Learn how to select the perfect pet for your lifestyle and home.</p>
              </Link>
              <Link to="/pet-guide/care" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pet Care Basics</h3>
                <p className="text-gray-600">Essential tips for taking care of your new companion.</p>
              </Link>
              <Link to="/pet-guide/health" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Health & Wellness</h3>
                <p className="text-gray-600">Important health considerations for your pet's well-being.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#388E3C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-4">PetAdopt</h4>
              <p className="mb-4">Making pet adoption easier and safer</p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#C8E6C9] transition-colors">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#C8E6C9] transition-colors">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#C8E6C9] transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link to="/about" className="hover:text-[#C8E6C9] transition-colors">About Us</Link>
                <Link to="/contact" className="hover:text-[#C8E6C9] transition-colors">Contact</Link>
                <Link to="/faq" className="hover:text-[#C8E6C9] transition-colors">FAQ</Link>
                <Link to="/pet-guide" className="hover:text-[#C8E6C9] transition-colors">Pet Guide</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact</h4>
              <p className="flex items-center gap-2 mb-2">
                <FaEnvelope /> info@petadopt.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone /> +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-white/10">
            <p>&copy; 2024 PetAdopt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 