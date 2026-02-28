import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/custom/Navbar';
import Hero from '@/sections/Hero';
import Endpoints from '@/sections/Endpoints';
import TryIt from '@/sections/TryIt';
import Footer from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Endpoints />
        <TryIt />
      </main>
      <Footer />
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'hsl(0 0% 6%)',
            border: '1px solid hsl(0 0% 18%)',
            color: 'white',
          },
        }}
      />
    </div>
  );
}

export default App;
