
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Image as ImageIcon, RefreshCw, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/context/ChatContext';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import FlowchartViewer from './FlowchartViewer';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, addMessage, isLoading, setIsLoading, clearMessages, apiKey, isPremium } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your OpenAI API key in the dashboard to use the chat.",
      });
      return;
    }
    
    const userMessage = input;
    setInput('');
    addMessage(userMessage, 'user');
    
    setIsLoading(true);
    
    try {
      // This would be an actual API call in a real app
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Example response data
      const exampleResponses = [
        {
          content: "Cardiovascular examination is a systematic process that includes inspection, palpation, percussion, and auscultation. It's essential to follow this sequence to ensure comprehensive assessment.\n\nLet me break it down for you:",
          hasFlowchart: true,
          imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1389&q=80"
        },
        {
          content: "The pathophysiology of heart failure involves complex mechanisms. When cardiac output decreases, compensatory mechanisms activate, including the renin-angiotensin-aldosterone system and sympathetic nervous system. While these help initially, they eventually lead to cardiac remodeling and worsening heart function.",
          hasFlowchart: true,
          imageUrl: null
        },
        {
          content: "Diabetes mellitus is characterized by chronic hyperglycemia resulting from defects in insulin secretion, insulin action, or both. Type 1 diabetes results from autoimmune destruction of pancreatic β-cells, while Type 2 involves insulin resistance and relative insulin deficiency.",
          hasFlowchart: false,
          imageUrl: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        }
      ];
      
      // Select a random example response
      const response = exampleResponses[Math.floor(Math.random() * exampleResponses.length)];
      
      // Add bot response
      addMessage(
        response.content,
        'assistant',
        response.hasFlowchart ? 'sample-flowchart-data' : undefined,
        response.imageUrl || undefined
      );
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderMessageContent = (message: any) => {
    return (
      <div className="space-y-3">
        <div className="prose prose-sm max-w-none">
          {message.content.split("\n").map((line: string, i: number) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
        
        {message.imageUrl && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img 
              src={message.imageUrl} 
              alt="Medical illustration" 
              className="w-full h-auto max-h-64 object-cover"
            />
          </div>
        )}
        
        {message.flowchart && (
          <div className="mt-4">
            <FlowchartViewer flowchartData={message.flowchart} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 subtle-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-medical" />
            </div>
            <h3 className="text-xl font-semibold mb-2">MediFlow AI Assistant</h3>
            <p className="text-muted-foreground max-w-md">
              Ask me anything about medical concepts, diagnoses, procedures, or treatments. I can provide explanations, flowcharts, and images to help you understand.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">
              {[
                "Explain the pathophysiology of heart failure",
                "How do I perform a cardiovascular examination?",
                "What's the difference between Type 1 and Type 2 diabetes?",
                "Explain the Glasgow Coma Scale"
              ].map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start overflow-hidden text-left text-nowrap text-ellipsis"
                  onClick={() => {
                    setInput(suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className={`h-8 w-8 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                    {message.role === 'user' ? (
                      <div className="bg-primary h-full w-full flex items-center justify-center text-white">
                        U
                      </div>
                    ) : (
                      <div className="bg-medical h-full w-full flex items-center justify-center text-white">
                        M
                      </div>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-xl p-4 animate-scale-in ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-card'
                    }`}
                  >
                    {renderMessageContent(message)}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[85%] flex-row">
                  <Avatar className="h-8 w-8 mr-3">
                    <div className="bg-medical h-full w-full flex items-center justify-center text-white">
                      M
                    </div>
                  </Avatar>
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-medical rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-medical rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-medical rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={clearMessages}
              title="Clear conversation"
            >
              <Trash size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => {
                // This would regenerate the last response in a real app
                toast({
                  title: "Regenerating response",
                  description: "This would regenerate the last response in a real app.",
                });
              }}
              title="Regenerate response"
            >
              <RefreshCw size={16} />
            </Button>
          </div>
          
          {isPremium && (
            <span className="text-xs text-muted-foreground">
              Premium features enabled
            </span>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a medical question..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </Button>
          {isPremium && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => {
                toast({
                  title: "Image Upload",
                  description: "Image upload would be available here in the premium version.",
                });
              }}
              title="Upload image (Premium feature)"
            >
              <ImageIcon size={18} />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
