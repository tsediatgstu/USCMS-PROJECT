import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Menu, X, LogOut, User, 
  LayoutDashboard, Home as HomeIcon, 
  Info, LifeBuoy, ChevronRight,
  PlusCircle // Added for "Create Complaint"
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import NotificationIcon from './NotificationIcon';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isLoggedIn = !!user;

  // Professional Navigation Logic
  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    
    // Logic: If Student, show "Create Complaint"
    ...(user && user.role === 'student' ? [
      { name: 'Create Complaint', path: '/create-complaint', icon: <PlusCircle size={18} /> }
    ] : []),

    // Dashboard logic (Admin or Student)
    ...(user ? [
      { 
        name: user.role === 'admin' ? 'Admin' : 'Dashboard', 
        path: user.role === 'admin' ? '/admin' : '/student-dashboard', 
        icon: <LayoutDashboard size={18} /> 
      }
    ] : [
      // If not logged in, still show Support
      { name: 'Support', path: '/support', icon: <LifeBuoy size={18} /> }
    ])
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 dark:border-gray-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img src={logo} alt="University Logo" className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">USCMS</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] opacity-80">University Portal</span>
            </div>
          </Link>

          {/* Desktop View */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-bold transition-all flex items-center gap-1 ${
                    isActive(link.path) 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  } ${link.name === 'Create Complaint' ? 'bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg text-blue-600' : ''}`}
                >
                  {link.name === 'Create Complaint' && <PlusCircle size={14} />}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-[13px] font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600">Sign In</Link>
                  <Link to="/register" className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black text-[13px] font-bold rounded-xl transition-all hover:scale-105 active:scale-95">
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                   <Link to={user.role === 'admin' ? '/admin' : '/student-dashboard'} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full transition-all hover:border-blue-200">
                    <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white"><User size={14} /></div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 pr-1 truncate max-w-[80px]">{user.username}</span>
                  </Link>
                  <button onClick={logout} className="p-2 text-gray-400 hover:text-rose-500 transition-colors" title="Logout">
                    <LogOut size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Utility Section */}
            <div className="flex items-center gap-1 border-l border-gray-100 dark:border-gray-800 pl-4">
              {isLoggedIn && <NotificationIcon />}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile UI */}
          <div className="lg:hidden flex items-center gap-2">
            {isLoggedIn && <NotificationIcon />}
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      

      {/* Mobile Drawer (Simplified) */}
      <div className={`lg:hidden fixed inset-x-0 bg-white dark:bg-gray-950 border-b border-gray-900/10 transition-all duration-300 z-40 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`} style={{ top: '80px' }}>
        <div className="p-8 space-y-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`text-xl font-bold ${isActive(link.path) ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`} onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link to="/login" className="w-full py-3 text-center bg-blue-600 text-white rounded-xl font-bold" onClick={() => setIsOpen(false)}>Sign In</Link>
          ) : (
            <button onClick={() => { logout(); setIsOpen(false); }} className="w-full py-3 text-rose-600 font-bold bg-rose-50 dark:bg-rose-900/10 rounded-xl">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;