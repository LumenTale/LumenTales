import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeColors } from '@/types';

interface UIContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  modalOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  toast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  themeColors: ThemeColors;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  
  // Theme colors
  const themeColors: ThemeColors = {
    primary: '#0066FF',
    secondary: '#6699FF',
    accent: '#FF9900',
    background: theme === 'light' ? '#FFFFFF' : '#121212',
    text: theme === 'light' ? '#333333' : '#F5F5F5',
  };
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  
  // Open modal function
  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };
  
  // Close modal function
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalContent(null);
    }, 300); // Wait for animation to complete
  };
  
  // Toast function
  const toast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };
  
  const value = {
    theme,
    toggleTheme,
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    modalOpen,
    modalContent,
    openModal,
    closeModal,
    toast,
    themeColors,
  };
  
  return (
    <UIContext.Provider value={value}>
      {children}
      
      {/* Toast component */}
      {toastVisible && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md transition-all transform ${
            toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } ${
            toastType === 'success'
              ? 'bg-green-500'
              : toastType === 'error'
              ? 'bg-red-500'
              : toastType === 'warning'
              ? 'bg-yellow-500'
              : 'bg-blue-500'
          } text-white`}
        >
          {toastMessage}
        </div>
      )}
      
      {/* Modal component */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            {modalContent}
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}; 