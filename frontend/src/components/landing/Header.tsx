import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">AVC LAW FIRM</h1>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

