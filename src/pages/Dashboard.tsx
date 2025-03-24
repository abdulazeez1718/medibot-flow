
import React from 'react';
import Navbar from '@/components/Navbar';
import ApiKeyInput from '@/components/ApiKeyInput';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  User, 
  Key, 
  MessageCircle, 
  CreditCard, 
  History,
  Trash2,
  DownloadCloud
} from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { clearMessages, isPremium, setIsPremium } = useChat();
  const { toast } = useToast();
  
  const handleClearHistory = () => {
    clearMessages();
    toast({
      title: "History Cleared",
      description: "Your chat history has been cleared successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-28 pb-16 px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-medical-dark to-medical">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">User</h3>
                      <p className="text-white/80 text-sm">
                        {isPremium ? 'Premium Plan' : 'Basic Plan'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <nav className="space-y-1">
                    {[
                      { icon: <Settings className="h-5 w-5" />, label: "General", active: true },
                      { icon: <Key className="h-5 w-5" />, label: "API Keys", active: false },
                      { icon: <MessageCircle className="h-5 w-5" />, label: "Chat History", active: false },
                      { icon: <CreditCard className="h-5 w-5" />, label: "Subscription", active: false },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                          item.active 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              <div className="mt-6 glass-card rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Your Plan</h3>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/pricing">Upgrade</Link>
                  </Button>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  isPremium 
                    ? 'bg-gradient-to-r from-medical-light to-blue-50 border border-medical/20' 
                    : 'bg-muted'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {isPremium ? 'Premium' : 'Basic'}
                    </span>
                    {isPremium && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-medical text-white rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isPremium 
                      ? 'Unlimited questions, interactive flowcharts, and more' 
                      : 'Limited to 5 questions per day'}
                  </p>
                </div>
                
                {/* Temporary toggle for demo purposes */}
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => setIsPremium(!isPremium)}
                    className="text-sm text-medical hover:underline"
                  >
                    {isPremium ? 'Switch to Basic (Demo)' : 'Switch to Premium (Demo)'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <Key className="h-5 w-5 text-medical mr-2" />
                  <h2 className="text-xl font-semibold">API Configuration</h2>
                </div>
                
                <ApiKeyInput />
                
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Your API key is stored locally in your browser and never sent to our servers. It's used only to communicate directly with the OpenAI API.
                  </p>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <History className="h-5 w-5 text-medical mr-2" />
                  <h2 className="text-xl font-semibold">Chat History</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <p className="text-muted-foreground">
                    Manage your chat history and saved conversations.
                  </p>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={handleClearHistory}
                    >
                      <Trash2 size={14} />
                      <span>Clear History</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="sm" 
                      className="flex items-center gap-1"
                      disabled={!isPremium}
                      onClick={() => {
                        if (isPremium) {
                          toast({
                            title: "Download History",
                            description: "Your chat history would be downloaded in a real app.",
                          });
                        } else {
                          toast({
                            title: "Premium Feature",
                            description: "Downloading chat history is available in the Premium plan.",
                          });
                        }
                      }}
                    >
                      <DownloadCloud size={14} />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No chat history available. Start a conversation to see your history here.
                  </p>
                  
                  <Button asChild className="mt-4">
                    <Link to="/chat">Start Chatting</Link>
                  </Button>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <Settings className="h-5 w-5 text-medical mr-2" />
                  <h2 className="text-xl font-semibold">Preferences</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Show Images in Responses</h3>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable images in AI responses
                      </p>
                    </div>
                    <div className="flex items-center h-6">
                      <input 
                        type="checkbox" 
                        id="images" 
                        className="rounded text-primary w-4 h-4"
                        defaultChecked={true}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Show Flowcharts</h3>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable flowcharts in AI responses
                      </p>
                    </div>
                    <div className="flex items-center h-6">
                      <input 
                        type="checkbox" 
                        id="flowcharts" 
                        className="rounded text-primary w-4 h-4"
                        defaultChecked={true}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Medical Specialty Focus</h3>
                      <p className="text-sm text-muted-foreground">
                        Customize responses to your specialty (Premium)
                      </p>
                    </div>
                    <select 
                      className="rounded border p-1 text-sm bg-white"
                      disabled={!isPremium}
                    >
                      <option value="general">General Medicine</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="surgery">Surgery</option>
                    </select>
                  </div>
                </div>
                
                {!isPremium && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Some preferences are only available with a{' '}
                      <Link to="/pricing" className="text-medical hover:underline">
                        Premium plan
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
