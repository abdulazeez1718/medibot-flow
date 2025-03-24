
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Brain, 
  Stethoscope, 
  BookOpen, 
  Microscope, 
  Sparkles 
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center py-1 px-3 rounded-full bg-medical-light text-medical-dark text-sm font-medium mb-2">
                <Sparkles className="h-4 w-4 mr-1" />
                <span>AI-Powered Medical Learning</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Master Medicine with Interactive AI Assistance
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                MediFlow transforms medical education through AI-powered conversations, interactive flowcharts, and visualizations tailored for students and practitioners.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-medical-dark to-medical hover:from-medical hover:to-medical-dark">
                  <Link to="/chat">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="relative z-10 bg-white p-4 rounded-xl shadow-lg max-w-md mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                    alt="Medical learning with AI" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Interactive Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize complex medical concepts through interactive flowcharts and expert explanations.
                  </p>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4 w-40 h-40 bg-medical-light rounded-full opacity-70 blur-3xl -z-10"></div>
              <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4 w-60 h-60 bg-blue-100 rounded-full opacity-70 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MediFlow</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform is designed specifically for medical education, offering unique features to enhance your learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-medical" />,
                title: "AI-Powered Learning",
                description: "Get instant, accurate answers to your medical questions from our specialized AI."
              },
              {
                icon: <Stethoscope className="h-8 w-8 text-medical" />,
                title: "Clinical Flowcharts",
                description: "Visualize diagnostic and treatment pathways with interactive flowcharts."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-medical" />,
                title: "Simplified Concepts",
                description: "Complex medical concepts explained in clear, easy-to-understand language."
              },
              {
                icon: <Microscope className="h-8 w-8 text-medical" />,
                title: "Evidence-Based",
                description: "All information is based on the latest medical research and guidelines."
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-light/60 to-blue-50/60 -z-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Medical Learning?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of medical students and professionals who are learning more efficiently with MediFlow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-medical-dark to-medical hover:from-medical hover:to-medical-dark">
                <Link to="/chat">
                  Try For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/pricing">Explore Premium</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-medical to-medical-dark flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">M</span>
                </div>
                <span className="font-semibold text-xl tracking-tight">MediFlow</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                © {new Date().getFullYear()} MediFlow. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                Chat
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
