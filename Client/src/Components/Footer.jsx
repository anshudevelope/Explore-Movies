import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">
              Movie Explorer
            </h3>
            <p className="text-sm leading-relaxed">
              Discover, explore, and save your favorite movies. Powered by the
              OMDb API and built with the MERN stack.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                API Documentation
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Support
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <p className="text-sm leading-relaxed">
              Movie Explorer is a demo project showcasing modern frontend and
              backend development practices with React, Redux Toolkit, Node.js,
              and MongoDB.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Movie Explorer. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Built with MERN Stack By Anshu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
