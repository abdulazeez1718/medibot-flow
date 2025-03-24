
import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlowchartViewerProps {
  flowchartData: string;
}

const FlowchartViewer: React.FC<FlowchartViewerProps> = ({ flowchartData }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate loading the flowchart
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [flowchartData]);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([flowchartData], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `medical-flowchart-${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // This is a placeholder render function - in a real app, you'd use a proper
  // flowchart rendering library like react-flow or mermaid.js
  const renderFlowchart = () => {
    try {
      // Simplified example - parse the flowchart data and render something basic
      // In a real app, you would render an actual interactive flowchart
      const steps = ['History Taking', 'Physical Examination', 'Differential Diagnosis', 'Additional Tests', 'Final Diagnosis', 'Treatment Plan'];
      
      return (
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <div className="flex flex-col space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="p-3 rounded-lg bg-gradient-to-r from-medical-light to-blue-50 border border-medical/20">
                  <span className="font-medium">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-0.5 h-4 bg-medical/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-200">
          Error rendering flowchart. Please check the data format.
        </div>
      );
    }
  };

  return (
    <div className={`relative bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 ${
      expanded ? 'fixed inset-4 z-50' : 'w-full h-auto'
    }`}>
      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={handleDownload}
        >
          <Download size={16} />
        </Button>
      </div>
      
      <div className={`p-4 ${expanded ? 'h-full overflow-auto' : 'max-h-[400px] overflow-auto'}`}>
        <h3 className="font-medium text-lg mb-4">Interactive Flowchart</h3>
        
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-medical/30 border-t-medical rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {renderFlowchart()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowchartViewer;
