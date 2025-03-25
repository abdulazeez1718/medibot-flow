
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Image as ImageIcon, RefreshCw, Trash, Brain, Heart, Lungs, Activity } from 'lucide-react';
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
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  
  useEffect(() => {
    scrollToBottom();
    
    // Set animation for the latest message
    if (messages.length > 0 && !isLoading) {
      setAnimatingIndex(messages.length - 1);
      const timer = setTimeout(() => {
        setAnimatingIndex(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading]);
  
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
        description: "Please check if the API key is properly configured in the app.",
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
      
      // Example response data with medical content
      const medicalResponses = [
        {
          content: "The cardiovascular system consists of the heart, blood vessels, and blood. It's responsible for transporting oxygen, nutrients, hormones, and waste products throughout the body.\n\nLet me explain how the heart functions as the central pump of this system:",
          hasFlowchart: true,
          imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1389&q=80"
        },
        {
          content: "Heart failure is a complex clinical syndrome that occurs when the heart is unable to pump sufficient blood to meet the body's metabolic demands. The pathophysiology involves:\n\n1. Initial cardiac injury\n2. Neurohormonal activation\n3. Ventricular remodeling\n4. Progression to end-stage disease",
          hasFlowchart: true,
          imageUrl: null
        },
        {
          content: "Diabetes mellitus is characterized by chronic hyperglycemia resulting from defects in insulin secretion, insulin action, or both.\n\nType 1 diabetes: Autoimmune destruction of pancreatic β-cells leading to absolute insulin deficiency.\n\nType 2 diabetes: Progressive insulin secretory defect on the background of insulin resistance.",
          hasFlowchart: false,
          imageUrl: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        },
        {
          content: "The Glasgow Coma Scale (GCS) is a neurological scale used to assess the level of consciousness after a brain injury. It evaluates three aspects of responsiveness:\n\n1. Eye Opening (E): 4 points\n2. Verbal Response (V): 5 points\n3. Motor Response (M): 6 points\n\nTotal score ranges from 3 (deep coma) to 15 (fully awake).",
          hasFlowchart: true,
          imageUrl: null
        },
        {
          content: "The respiratory system consists of the airways, lungs, and respiratory muscles that mediate gas exchange between the atmosphere and blood. The process of breathing includes:\n\n1. Ventilation - movement of air in and out of lungs\n2. External respiration - gas exchange between alveoli and pulmonary capillaries\n3. Transport of gases via blood\n4. Internal respiration - gas exchange between systemic capillaries and tissues",
          hasFlowchart: true,
          imageUrl: null
        }
      ];
      
      // Select a response based on user input
      let responseIndex = 0;
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes("heart") || lowerInput.includes("cardio")) {
        responseIndex = 0;
      } else if (lowerInput.includes("failure")) {
        responseIndex = 1;
      } else if (lowerInput.includes("diabetes")) {
        responseIndex = 2;
      } else if (lowerInput.includes("glasgow") || lowerInput.includes("coma")) {
        responseIndex = 3;
      } else if (lowerInput.includes("lung") || lowerInput.includes("breath")) {
        responseIndex = 4;
      } else {
        // Random response if no keywords match
        responseIndex = Math.floor(Math.random() * medicalResponses.length);
      }
      
      const response = medicalResponses[responseIndex];
      
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
        description: "Failed to get a response. Please check API key configuration.",
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

  const getMedicalIcons = () => {
    return [
      <Brain size={24} className="text-medical" key="brain" />,
      <Heart size={24} className="text-medical" key="heart" />,
      <Lungs size={24} className="text-medical" key="lungs" />,
      <Activity size={24} className="text-medical" key="activity" />
    ];
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 subtle-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-medical-light flex items-center justify-center mb-6 animate-pulse">
              <Sparkles className="h-10 w-10 text-medical" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 animate-fade-in">MediFlow - Your Medical Learning Assistant</h3>
            <p className="text-muted-foreground max-w-md mb-8 animate-fade-in">
              I'm specialized in medical education. Ask me about anatomy, physiology, pathology, or any medical concept. I can provide explanations, flowcharts, and images to enhance your learning.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-2xl animate-scale-in">
              <div className="col-span-1 sm:col-span-2 mb-2">
                <h4 className="text-lg font-medium text-medical mb-2">Popular Topics</h4>
              </div>
              
              {[
                { icon: <Heart className="mr-2 h-4 w-4" />, text: "Explain the cardiovascular system" },
                { icon: <Activity className="mr-2 h-4 w-4" />, text: "What is heart failure pathophysiology?" },
                { icon: <Brain className="mr-2 h-4 w-4" />, text: "Explain the Glasgow Coma Scale" },
                { icon: <Lungs className="mr-2 h-4 w-4" />, text: "How does the respiratory system work?" }
              ].map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start overflow-hidden text-left hover:bg-medical/10 hover:text-medical transition-all"
                  onClick={() => {
                    setInput(suggestion.text);
                  }}
                >
                  {suggestion.icon}
                  <span className="truncate">{suggestion.text}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } ${animatingIndex === index ? 'animate-scale-in' : ''}`}
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
                    className={`rounded-xl p-4 ${
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
                <div className="flex max-w-[85%] flex-row animate-fade-in">
                  <Avatar className="h-8 w-8 mr-3">
                    <div className="bg-medical h-full w-full flex items-center justify-center text-white">
                      M
                    </div>
                  </Avatar>
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-2">
                        {getMedicalIcons().map((icon, index) => (
                          <div key={index} className="animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
                            {icon}
                          </div>
                        ))}
                      </div>
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
              className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
              onClick={clearMessages}
              title="Clear conversation"
            >
              <Trash size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                // This would regenerate the last response in a real app
                toast({
                  title: "Regenerating response",
                  description: "Generating a new answer to your last question.",
                });
              }}
              title="Regenerate response"
            >
              <RefreshCw size={16} />
            </Button>
          </div>
          
          {isPremium && (
            <span className="text-xs bg-gradient-to-r from-medical to-medical-dark bg-clip-text text-transparent font-medium">
              Premium Medicine Mode
            </span>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any medical question..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="bg-medical hover:bg-medical-dark transition-colors"
          >
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
                  description: "Image upload feature available in premium mode.",
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
