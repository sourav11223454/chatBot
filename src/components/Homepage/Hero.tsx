import React from 'react'
import { SendIcon } from 'lucide-react'
const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-black to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-blue-500">AI-Powered</span> Conversations
              <br />
              Made Simple
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Experience the next generation of AI chatbot technology. Get
              instant answers, creative content, and helpful assistance 24/7.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                Get Started Now
              </button>
            </div>
          </div>
          <div className="mt-8 md:mt-0 transform hover:scale-102 transition-transform duration-500">
            <div className="bg-gray-900 rounded-lg shadow-2xl border border-blue-900 p-4 max-w-md mx-auto hover:border-blue-500 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-300">
                    AIChatBot
                  </span>
                </div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
              <div className="space-y-4 mb-4">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-xs">
                    How can you help with my business?
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-xs">
                    I can help with customer support, generate content, analyze
                    data, automate tasks, and provide 24/7 assistance to improve
                    efficiency and customer satisfaction.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-xs">
                    Can you write social media posts?
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-xs">
                    Absolutely! I can create engaging social media content
                    tailored to your brand voice and target audience across
                    different platforms.
                  </div>
                </div>
              </div>
              <div className="flex items-center border-t border-gray-700 pt-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <button className="bg-blue-600 p-2 rounded-r-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                  <SendIcon className="h-5 w-5 text-white animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-700 rounded-full filter blur-3xl opacity-10"></div>
    </div>
  )
}
export default Hero;
