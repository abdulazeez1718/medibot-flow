
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/context/ChatContext';
import { useToast } from '@/components/ui/use-toast';

interface SubscriptionCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPremium: boolean;
  className?: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  description,
  features,
  isPremium,
  className,
}) => {
  const { setIsPremium, isPremium: currentPlan } = useChat();
  const { toast } = useToast();
  
  const handleSubscribe = () => {
    if (isPremium) {
      setIsPremium(true);
      toast({
        title: "Premium Plan Activated",
        description: "You now have access to all premium features!",
      });
    } else {
      // For the basic plan
      setIsPremium(false);
      toast({
        title: "Basic Plan Selected",
        description: "You've switched to the basic plan.",
      });
    }
  };
  
  const isActive = (isPremium && currentPlan) || (!isPremium && !currentPlan);

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300",
        className,
        isPremium ? "hover:shadow-lg" : "hover:shadow-md",
        isActive && "ring-2 ring-primary"
      )}
    >
      {isPremium && (
        <div className="premium-gradient text-white text-center py-1 text-sm font-medium">
          RECOMMENDED
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {isPremium ? (
                <Check className="h-5 w-5 text-medical shrink-0 mr-2" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 shrink-0 mr-2" />
              )}
              <span className={isPremium ? "text-foreground" : "text-muted-foreground"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={cn(
            "w-full", 
            isPremium 
              ? "bg-gradient-to-r from-medical-dark to-medical hover:from-medical hover:to-medical-dark" 
              : ""
          )}
          variant={isPremium ? "default" : "outline"}
          onClick={handleSubscribe}
          disabled={isActive}
        >
          {isActive ? "Current Plan" : "Subscribe"}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
