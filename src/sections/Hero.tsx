import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Code2, Shield, Globe } from 'lucide-react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToEndpoints = () => {
    document.getElementById('endpoints')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTryIt = () => {
    document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/80">REST API Documentation</span>
          </div>

          {/* Title */}
          <h1 
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-white">API</span>
            <span className="text-gradient"> Catrina</span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-4 transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Powerful, fast, and reliable REST APIs for your applications.
            Built for developers, by developers.
          </p>

          {/* Description */}
          <p 
            className={`text-sm text-white/40 max-w-xl mx-auto mb-12 transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Featuring AI-powered image generation with Flux-1-Dev model.
            Simple integration, instant results.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Button 
              size="lg" 
              onClick={scrollToTryIt}
              className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-xl transition-all hover:scale-105"
            >
              Try It Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToEndpoints}
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-xl"
            >
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {[
              { icon: Zap, label: 'Fast Response', value: '< 2s' },
              { icon: Shield, label: 'Reliable', value: '99.9%' },
              { icon: Code2, label: 'Endpoints', value: '3+' },
              { icon: Globe, label: 'Global CDN', value: 'Worldwide' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass rounded-2xl p-4 hover-lift cursor-default"
              >
                <stat.icon className="w-5 h-5 text-white/60 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
