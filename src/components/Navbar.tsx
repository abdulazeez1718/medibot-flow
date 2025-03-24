
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isPremium } = useChat();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-medical to-medical-dark flex items-center justify-center">
            <span className="text-white font-semibold text-sm">M</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">MediFlow</span>
          {isPremium && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-medical-dark to-medical text-white rounded-full">
              PREMIUM
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/chat" className={`navbar-link ${isActive('/chat') ? 'active' : ''}`}>
            Chat
          </Link>
          <Link to="/pricing" className={`navbar-link ${isActive('/pricing') ? 'active' : ''}`}>
            Pricing
          </Link>
          <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}>
            Dashboard
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="mr-2 icon-button"
          >
            <Link to="/dashboard">
              <User size={20} />
            </Link>
          </Button>
          
          <Button
            asChild
            variant={isScrolled ? "default" : "outline"}
            className="animate-scale-in"
          >
            <Link to="/chat">Try MediFlow</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden icon-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-slide-up">
          <div className="flex flex-col p-6 space-y-4">
            <Link
              to="/"
              className={`text-lg font-medium ${isActive('/') ? 'text-primary' : 'text-foreground/80'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className={`text-lg font-medium ${isActive('/chat') ? 'text-primary' : 'text-foreground/80'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              to="/pricing"
              className={`text-lg font-medium ${isActive('/pricing') ? 'text-primary' : 'text-foreground/80'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/dashboard"
              className={`text-lg font-medium ${isActive('/dashboard') ? 'text-primary' : 'text-foreground/80'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Button asChild className="w-full animate-scale-in">
              <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
                Try MediFlow
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
