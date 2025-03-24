
import React from 'react';
import Navbar from '@/components/Navbar';
import SubscriptionCard from '@/components/SubscriptionCard';
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const basicFeatures = [
    "Access to medical AI chatbot",
    "Basic medical flowcharts",
    "Text-based answers",
    "5 questions per day limit"
  ];
  
  const premiumFeatures = [
    "Unlimited questions",
    "Advanced interactive flowcharts",
    "Medical images and visualizations",
    "Priority response time",
    "Save and export conversations",
    "Custom medical specialty focus"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-28 pb-16 px-6 flex-1">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the plan that fits your needs and start enhancing your medical knowledge today.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <SubscriptionCard
            title="Basic"
            price="Free"
            description="Perfect for casual learners who want to explore the platform."
            features={basicFeatures}
            isPremium={false}
          />
          
          <SubscriptionCard
            title="Premium"
            price="$12.99"
            description="Ideal for medical students and professionals who need comprehensive learning tools."
            features={premiumFeatures}
            isPremium={true}
            className="md:scale-105 md:-translate-y-2"
          />
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">All Plans Include</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "AI-powered medical assistant",
              "Evidence-based information",
              "Regular content updates",
              "Cross-platform access",
              "User-friendly interface",
              "Secure data handling"
            ].map((feature, index) => (
              <div key={index} className="flex items-center p-4 glass-card rounded-lg">
                <CheckCircle className="h-5 w-5 text-medical mr-3 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How does the free plan work?",
                answer: "The free plan gives you access to our basic AI-powered medical assistant with a limit of 5 questions per day. You'll get text-based answers and basic flowcharts to help with your medical learning."
              },
              {
                question: "Can I cancel my premium subscription anytime?",
                answer: "Yes, you can cancel your premium subscription at any time. Your premium features will remain active until the end of your current billing period."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we take data security very seriously. All your conversations and personal information are encrypted and securely stored. We never share your data with third parties."
              },
              {
                question: "How accurate is the medical information?",
                answer: "MediFlow provides information based on current medical research and guidelines. However, it's designed for educational purposes only and should not replace professional medical advice."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-medium mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} MediFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
