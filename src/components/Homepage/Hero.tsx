import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import chatbotAnimation from '../../assets/animation.json'
import './Hero.css'

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowModal(false)
      setIsClosing(false)
    }, 300)
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            <span className="highlight">AI-Powered</span> Conversations
            <br />
            Made Simple
          </h1>
          <p>
            Experience next-gen AI chatbot support. Instant, creative, and
            helpful — 24/7.
          </p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        <div className="hero-animation">
          <Lottie
            animationData={chatbotAnimation}
            loop
            autoplay
            style={{ width: 500, height: 500 }}
          />
        </div>
      </div>

      {/* Background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`modal ${isClosing ? 'closing' : ''}`}>
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Welcome!</h2>
            <p>Choose an option to continue:</p>
            <div className="modal-buttons">
              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
              <button className="signup-btn" onClick={handleSignup}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
