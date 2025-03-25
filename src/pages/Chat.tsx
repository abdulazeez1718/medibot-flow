
import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import Navbar from '@/components/Navbar';
import { useChat } from '@/context/ChatContext';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20 flex flex-col">
        <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col">
          <div className="flex-1 p-4 md:p-6 flex flex-col border rounded-xl m-4 md:m-6 glass-card">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
