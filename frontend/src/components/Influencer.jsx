import React from 'react';
import { Link } from 'react-router-dom';

const looks = [
  {
    category: 'STREETWEAR',
    imgSrc: 'https://static.bershka.net/assets/public/a625/6fc3/d4f64705ab3c/28a2b8c70723/kephmarques_c77c5a0e9f0894986f9e/kephmarques_c77c5a0e9f0894986f9e.jpg?ts=1728044441033&t=20241025021705&w=750',
    link: '/influencer1', // Link for the first image
  },
  {
    category: 'CASUAL',
    imgSrc: 'https://static.bershka.net/assets/public/88c1/62f8/534949caa06e/fa67a5c63879/karb______fe8ce3657aa96ac4c29c/karb______fe8ce3657aa96ac4c29c.jpg?ts=1728044442483&t=20241025021705&w=750',
    link: '/influencer2', // Link for the second image
  },
];

function Influencer() {
  return (
    <div className="container mx-auto px-4 py-8 mb-[150px] -mt-[150px]">
      {/* Header section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">→ GET THE LOOK</h1>
        <p className="text-gray-500 mt-1">
          Find your style in our lookbook and tag @brohh with #brohhlife!
        </p>
      </div>

      {/* Centered grid layout */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {looks.map((look, index) => (
            <div key={index} className="relative w-[300px]">
              <Link to={look.link}>
                <img
                  src={look.imgSrc}
                  alt={look.category}
                  className="w-full h-auto object-cover transition-transform transform hover:scale-105 duration-300 rounded-md"
                />
              </Link>
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1 text-sm">
                {look.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Influencer;
