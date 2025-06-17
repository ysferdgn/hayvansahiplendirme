import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaHome, FaUserMd } from 'react-icons/fa';

const PetGuide = () => {
  const guideCategories = [
    {
      id: 'choosing',
      title: 'Choosing the Right Pet',
      icon: <FaHeart className="text-3xl text-[#4CAF50] mb-4" />,
      description: 'Learn how to select the perfect pet for your lifestyle and home.',
      articles: [
        {
          id: 'choosing-dog',
          title: 'How to Choose the Right Dog Breed',
          excerpt: 'Find the perfect dog breed that matches your lifestyle and living situation.'
        },
        {
          id: 'choosing-cat',
          title: 'Selecting the Perfect Cat',
          excerpt: 'Understanding different cat personalities and finding your ideal match.'
        },
        {
          id: 'first-time-owner',
          title: 'First-Time Pet Owner Guide',
          excerpt: 'Essential tips for those considering their first pet adoption.'
        }
      ]
    },
    {
      id: 'care',
      title: 'Pet Care Basics',
      icon: <FaHome className="text-3xl text-[#4CAF50] mb-4" />,
      description: 'Essential tips for taking care of your new companion.',
      articles: [
        {
          id: 'feeding-guide',
          title: 'Proper Pet Nutrition',
          excerpt: 'Understanding your pet\'s dietary needs and feeding schedule.'
        },
        {
          id: 'grooming',
          title: 'Grooming Essentials',
          excerpt: 'Basic grooming tips for keeping your pet clean and healthy.'
        },
        {
          id: 'training',
          title: 'Basic Training Tips',
          excerpt: 'Simple training techniques for well-behaved pets.'
        }
      ]
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      icon: <FaUserMd className="text-3xl text-[#4CAF50] mb-4" />,
      description: 'Important health considerations for your pet\'s well-being.',
      articles: [
        {
          id: 'vaccinations',
          title: 'Vaccination Schedule',
          excerpt: 'Essential vaccinations and when your pet needs them.'
        },
        {
          id: 'common-illnesses',
          title: 'Common Pet Illnesses',
          excerpt: 'Recognizing signs of common pet health issues.'
        },
        {
          id: 'emergency-care',
          title: 'Emergency Care Guide',
          excerpt: 'What to do in case of pet emergencies.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pet Care Guide</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to know about pet care, adoption, and creating a happy home for your new companion.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link to="/pet-guide#choosing" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
          <FaHeart className="text-[#4CAF50]" /> Choosing a Pet
        </Link>
        <Link to="/pet-guide#care" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
          <FaHome className="text-[#4CAF50]" /> Care Basics
        </Link>
        <Link to="/pet-guide#health" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
          <FaUserMd className="text-[#4CAF50]" /> Health & Wellness
        </Link>
      </div>

      {/* Guide Categories */}
      <div className="space-y-16">
        {guideCategories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-20">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center gap-4 mb-6">
                {category.icon}
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              <p className="text-gray-600 mb-8">{category.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/pet-guide/${article.id}`}
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Additional Resources */}
      <section className="mt-16">
        <div className="bg-[#4CAF50] text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-6">Our team of pet care experts is here to help you with any questions about pet adoption and care.</p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-white text-[#4CAF50] rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="px-6 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetGuide; 