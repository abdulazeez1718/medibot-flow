
import React, { useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ApiKeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useChat();
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const handleSaveKey = () => {
    if (!inputKey.trim()) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
      });
      return;
    }

    setApiKey(inputKey.trim());
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully.",
    });
  };

  return (
    <div className="glass-card rounded-xl p-5 animate-fade-in">
      <div className="mb-4 flex items-center">
        <Key className="w-5 h-5 mr-2 text-medical" />
        <h3 className="text-lg font-medium">OpenAI API Key</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Your API key is stored locally and never sent to our servers. It's used only to communicate with the OpenAI API.
      </p>
      
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            type={showKey ? "text" : "password"}
            placeholder="Enter your OpenAI API key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <Button onClick={handleSaveKey} className="flex items-center gap-1">
          <CheckCircle size={16} />
          <span>Save</span>
        </Button>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground">
        To get an API key, visit{' '}
        <a 
          href="https://platform.openai.com/api-keys" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-medical hover:underline"
        >
          platform.openai.com/api-keys
        </a>
      </div>
    </div>
  );
};

export default ApiKeyInput;
