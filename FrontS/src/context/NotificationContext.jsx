import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const NotificationContext = createContext();

// 2. Create the Provider (Make sure this name only appears once as a declaration)
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to USCMS Portal!", time: "Just now", read: false },
  ]);

  const addNotification = (msg) => {
    setNotifications((prev) => [
      { id: Date.now(), message: msg, time: "Just now", read: false },
      ...prev,
    ]);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

// 3. Create the Custom Hook
export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotificationProvider");
  }
  return context;
};