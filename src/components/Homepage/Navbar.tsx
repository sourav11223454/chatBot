import React, { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
interface NavbarProps {
  onLoginClick: () => void
  onSignupClick: () => void
}
const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className="bg-black border-b border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">
                  AIChatBot
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  About
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={onLoginClick}
                className="px-4 py-2 text-sm font-medium text-white hover:text-blue-500"
              >
                Log in
              </button>
              <button
                onClick={onSignupClick}
                className="ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-900"
            >
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-blue-900 transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-blue-900 transition-colors duration-300"
            >
              About
            </a>
            <button
              onClick={onLoginClick}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-blue-900"
            >
              Log in
            </button>
            <button
              onClick={onSignupClick}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar;
