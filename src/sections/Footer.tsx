import { Github, Twitter, Heart, Code2, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">API Catrina</span>
            </div>
            <p className="text-white/50 text-sm max-w-md mb-6">
              Powerful REST APIs built for modern applications. 
              Fast, reliable, and easy to integrate.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Documentation', href: '#endpoints' },
                { label: 'Try It Now', href: '#try-it' },
                { label: 'API Health', href: '#try-it' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* API Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">API Categories</h4>
            <ul className="space-y-3">
              {[
                { label: 'AI Generation', href: '#try-it' },
                { label: 'Health Check', href: '#try-it' },
                { label: 'Endpoints List', href: '#try-it' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Martin
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-sm">
              © {currentYear} API Catrina. All rights reserved.
            </span>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Code2 className="w-4 h-4" />
              <span>Built with React + Express</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
