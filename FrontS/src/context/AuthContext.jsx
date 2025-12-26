import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. SAFE INITIALIZATION
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("AuthContext: Data corruption detected, resetting storage.");
      localStorage.removeItem('user');
    }
    return null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [loading, setLoading] = useState(true);

  // 2. UNIFIED EFFECT FOR INITIAL LOAD & THEME
  useEffect(() => {
    // Apply Dark Mode
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Force loading to false once the component has mounted
    setLoading(false);
  }, [darkMode]);

  // 3. LOGIN FUNCTION
  const login = (userData, token) => {
    if (!userData) return;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  // 4. LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // 5. UPDATE USER PROFILE
  const updateUser = (newData) => {
    if (!user) return;
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser,
      darkMode, 
      setDarkMode,
      loading 
    }}>
      {/* FIX: If your screen is still white, change the line below to:
        {children}
        Removing the !loading check will force the page to show.
      */}
      {!loading ? children : <div className="min-h-screen bg-white dark:bg-gray-950"></div>}
    </AuthContext.Provider>
  );
};