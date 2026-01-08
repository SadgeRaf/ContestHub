import React from 'react';
import { Link } from 'react-router';
import { Home, Trophy, Mail, FileText, Shield, X, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home first
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="bg-base-300 text-base-content">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-3 md:space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <span className="text-xl md:text-2xl font-bold">
                ContestHub
              </span>
            </Link>
            <p className="text-xs md:text-sm opacity-80">
              Your premier platform for creative competitions. Showcase your talent and win amazing prizes.
            </p>
            <div className="flex items-center gap-2 md:gap-3 pt-1 md:pt-2">
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 md:p-2 rounded-full hover:bg-base-100 transition-colors"
                aria-label="X (Twitter)"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 md:p-2 rounded-full hover:bg-base-100 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 md:p-2 rounded-full hover:bg-base-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Homepage Sections */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2">
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              Quick Links
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('contests-section')}
                  className="link link-hover flex items-center gap-2 w-full text-left text-sm md:text-base"
                >
                  <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                  All Contests
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="link link-hover flex items-center gap-2 w-full text-left text-sm md:text-base"
                >
                  <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('winners-section')}
                  className="link link-hover flex items-center gap-2 w-full text-left text-sm md:text-base"
                >
                  <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                  Winners
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('why-choose-us')}
                  className="link link-hover flex items-center gap-2 w-full text-left text-sm md:text-base"
                >
                  <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                  Why Choose Us
                </button>
              </li>
              <li>
                <Link 
                  to="/allcontests" 
                  className="link link-hover flex items-center gap-2 text-sm md:text-base"
                >
                  <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                  Browse All
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="mt-4 sm:mt-0 lg:mt-0">
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
              Resources
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link 
                  to="/contact" 
                  className="link link-hover flex items-center gap-2 text-sm md:text-base"
                >
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70" />
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="link link-hover flex items-center gap-2 text-sm md:text-base"
                >
                  <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70" />
                  Terms
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="link link-hover flex items-center gap-2 text-sm md:text-base"
                >
                  <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70" />
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-base-200 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-xs md:text-sm opacity-70">
            © {new Date().getFullYear()} ContestHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;