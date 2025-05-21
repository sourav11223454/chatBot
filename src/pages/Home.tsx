import React, { useState } from 'react'

import Hero from '../components/Homepage/Hero'
import Features from '../components/Homepage/Features'

import LoginModal from '../components/Homepage/LoginModal'
import SignupModal from '../components/Homepage/SignupModal'

const Home: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#00040f] to-[#020617] text-white font-sans">
     

      <main className="flex-grow">
        <section className="px-6 md:px-12 lg:px-24 py-20 relative z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b]/30 to-transparent pointer-events-none z-0"></div>
          <div className="relative z-10">
            <Hero />
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-24 py-20 bg-[#0f172a] border-t border-white/10 shadow-inner">
          <Features />
        </section>
      </main>


      {/* Modals */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} />
      )}
    </div>
  )
}

export default Home;
