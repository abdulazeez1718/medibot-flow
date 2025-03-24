
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import Navbar from '@/components/Navbar';
import { useChat } from '@/context/ChatContext';
import ApiKeyInput from '@/components/ApiKeyInput';

const Chat = () => {
  const { apiKey } = useChat();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20 flex flex-col">
        <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col">
          {!apiKey ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center">
              <div className="max-w-md w-full animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome to MediFlow Chat</h2>
                <p className="text-muted-foreground mb-6 text-center">
                  To start using the AI assistant, please enter your OpenAI API key below.
                </p>
                <ApiKeyInput />
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-medical hover:underline"
                  >
                    Go to Dashboard for more settings
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-4 md:p-6 flex flex-col border rounded-xl m-4 md:m-6 glass-card">
              <ChatInterface />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
