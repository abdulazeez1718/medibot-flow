
import React, { createContext, useContext, useState, useEffect } from 'react';

export type MessageType = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  flowchart?: string;
  imageUrl?: string;
};

export type ChatContextType = {
  messages: MessageType[];
  addMessage: (content: string, role: 'user' | 'assistant', flowchart?: string, imageUrl?: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isPremium: boolean;
  setIsPremium: (premium: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  
  // Load API key from localStorage
  useEffect(() => {
    const storedApiKey = localStorage.getItem('openai-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    
    const premium = localStorage.getItem('is-premium') === 'true';
    setIsPremium(premium);
  }, []);
  
  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openai-api-key', apiKey);
    }
  }, [apiKey]);
  
  // Save premium status to localStorage
  useEffect(() => {
    localStorage.setItem('is-premium', isPremium.toString());
  }, [isPremium]);

  const addMessage = (content: string, role: 'user' | 'assistant', flowchart?: string, imageUrl?: string) => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
      flowchart,
      imageUrl,
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isLoading,
        setIsLoading,
        apiKey,
        setApiKey,
        isPremium,
        setIsPremium
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
