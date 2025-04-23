
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-300 to-purple-500 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white animate-pulse" style={{animationDuration: '4s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl flex items-center justify-center">
          Ready to supercharge your tech career?
          <Sparkles className="ml-2 h-6 w-6 text-yellow-300 animate-bounce-subtle" />
        </h2>
        <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
          Join thousands of tech professionals whove found jobs, made connections, gained knowledge, and advanced their careers.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-md shadow animate-fade-in" style={{animationDelay: '200ms'}}>
            <Button className="px-8 py-3 bg-white text-tech-purple hover:bg-gray-100 transition-transform hover:scale-105 group">
              <span className='text-black'>Get started — its free</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 text-black" />
            </Button>
          </div>
          <div className="" style={{animationDelay: '400ms'}}>
            <Button variant="outline" className="px-8 py-3 border-white hover:bg-white/10 transition-transform hover:scale-105">
              Learn more
            </Button>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/70 animate-fade-in" style={{animationDelay: '600ms'}}>
          No credit card required • Free forever • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default CTASection;