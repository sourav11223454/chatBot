import React, { useState } from 'react'
import {
  BrainIcon,
  ClockIcon,
  ShieldIcon,
  UsersIcon,
  SparklesIcon,
  GlobeIcon,
} from 'lucide-react'
import './features.css'

const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null)

  const features = [
    {
      icon: <BrainIcon size={40} color="#3b82f6" />,
      title: 'Advanced AI',
      description:
        'Powered by the latest AI models to understand context and deliver accurate responses.',
    },
    {
      icon: <ClockIcon size={40} color="#3b82f6" />,
      title: '24/7 Availability',
      description:
        'Always online to assist your customers, answer questions, and solve problems.',
    },
    {
      icon: <ShieldIcon size={40} color="#3b82f6" />,
      title: 'Secure & Private',
      description:
        'Enterprise-grade security with end-to-end encryption to protect sensitive conversations.',
    },
    {
      icon: <UsersIcon size={40} color="#3b82f6" />,
      title: 'Multi-User Support',
      description:
        'Handle thousands of conversations simultaneously without compromising quality.',
    },
    {
      icon: <SparklesIcon size={40} color="#3b82f6" />,
      title: 'Creative Assistant',
      description:
        'Generate content, brainstorm ideas, and provide creative solutions to complex problems.',
    },
    {
      icon: <GlobeIcon size={40} color="#3b82f6" />,
      title: 'Multilingual',
      description:
        'Communicate fluently in over 50 languages to serve a global audience.',
    },
  ]

  const openModal = (feature: any) => {
    setSelectedFeature(feature)
  }

  const closeModal = () => {
    setSelectedFeature(null)
  }

  return (
    <section className="features-section" id="features">
      <h2 className="features-title">
        Powerful <span className="highlight">Features</span>
      </h2>
      <p className="features-description">
        Our AI chatbot comes loaded with everything you need to transform customer experiences, automate workflows, and operate securely at scale.
      </p>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            onClick={() => openModal(feature)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {selectedFeature && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="feature-icon">{selectedFeature.icon}</div>
            <h2>{selectedFeature.title}</h2>
            <p>{selectedFeature.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Features
