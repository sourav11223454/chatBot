import React from 'react'
import {
  BrainIcon,
  ClockIcon,
  ShieldIcon,
  UsersIcon,
  SparklesIcon,
  GlobeIcon,
} from 'lucide-react'
const Features: React.FC = () => {
  const features = [
    {
      icon: <BrainIcon className="h-8 w-8 text-blue-500" />,
      title: 'Advanced AI',
      description:
        'Powered by the latest AI models to understand context and deliver accurate responses.',
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-blue-500" />,
      title: '24/7 Availability',
      description:
        'Always online to assist your customers, answer questions, and solve problems.',
    },
    {
      icon: <ShieldIcon className="h-8 w-8 text-blue-500" />,
      title: 'Secure & Private',
      description:
        'Enterprise-grade security with end-to-end encryption to protect sensitive conversations.',
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-blue-500" />,
      title: 'Multi-User Support',
      description:
        'Handle thousands of conversations simultaneously without compromising quality.',
    },
    {
      icon: <SparklesIcon className="h-8 w-8 text-blue-500" />,
      title: 'Creative Assistant',
      description:
        'Generate content, brainstorm ideas, and provide creative solutions to complex problems.',
    },
    {
      icon: <GlobeIcon className="h-8 w-8 text-blue-500" />,
      title: 'Multilingual',
      description:
        'Communicate fluently in over 50 languages to serve a global audience.',
    },
  ]
  return (
    <div id="features" className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful <span className="text-blue-500">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our AI chatbot comes with everything you need to transform your
            customer experience and streamline operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg border border-blue-900 hover:border-blue-500 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  )
}
export default Features;
