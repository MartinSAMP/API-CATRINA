import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Loader2, 
  Image as ImageIcon, 
  HeartPulse, 
  List,
  Copy,
  Check,
  Terminal,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const TryIt = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // AI Generator State
  const [prompt, setPrompt] = useState('');

  // Health Check State
  const [healthResult, setHealthResult] = useState<any>(null);
  const [healthLoading, setHealthLoading] = useState(false);

  // Endpoints State
  const [endpointsResult, setEndpointsResult] = useState<any>(null);
  const [endpointsLoading, setEndpointsLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Using the actual API endpoint
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        toast.success('Image generated successfully!');
      } else {
        toast.error(data.message || 'Failed to generate image');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      setResult({
        status: 500,
        success: false,
        message: 'Network error or API unavailable',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    setHealthLoading(true);
    setHealthResult(null);

    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setHealthResult(data);
      toast.success('Health check completed');
    } catch (error) {
      toast.error('Failed to check health');
      setHealthResult({
        status: 500,
        success: false,
        message: 'API unavailable',
      });
    } finally {
      setHealthLoading(false);
    }
  };

  const handleGetEndpoints = async () => {
    setEndpointsLoading(true);
    setEndpointsResult(null);

    try {
      const response = await fetch('/api/endpoints');
      const data = await response.json();
      setEndpointsResult(data);
      toast.success('Endpoints fetched successfully');
    } catch (error) {
      toast.error('Failed to fetch endpoints');
      setEndpointsResult({
        status: 500,
        success: false,
        message: 'API unavailable',
      });
    } finally {
      setEndpointsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard');
  };

  return (
    <section id="try-it" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-white/20 text-white/60">
            <Terminal className="w-3 h-3 mr-2" />
            Interactive Playground
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Try It Now
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Test our API endpoints directly in your browser. 
            No setup required.
          </p>
        </div>

        {/* API Playground */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white/60" />
              API Playground
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full max-w-md mx-auto mb-6 bg-white/5 p-1 rounded-xl">
                <TabsTrigger
                  value="ai"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-lg transition-all"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  AI Image
                </TabsTrigger>
                <TabsTrigger
                  value="health"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-lg transition-all"
                >
                  <HeartPulse className="w-4 h-4 mr-2" />
                  Health
                </TabsTrigger>
                <TabsTrigger
                  value="endpoints"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-lg transition-all"
                >
                  <List className="w-4 h-4 mr-2" />
                  Endpoints
                </TabsTrigger>
              </TabsList>

              {/* AI Image Generator */}
              <TabsContent value="ai" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60 mb-2 block">
                      Enter your prompt
                    </label>
                    <div className="flex gap-3">
                      <Input
                        placeholder="e.g., A futuristic city at night with neon lights"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                      />
                      <Button
                        onClick={handleGenerateImage}
                        disabled={loading}
                        className="bg-white text-black hover:bg-white/90"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Generated Image */}
                  {result?.success && result.payload?.url && (
                    <div className="space-y-3">
                      <label className="text-sm text-white/60 block">
                        Generated Image
                      </label>
                      <div className="relative rounded-xl overflow-hidden bg-white/5">
                        <img
                          src={result.payload.url}
                          alt="Generated"
                          className="w-full max-h-96 object-contain"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.payload.url)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 mr-2" />
                          ) : (
                            <Copy className="w-4 h-4 mr-2" />
                          )}
                          Copy URL
                        </Button>
                        <a
                          href={result.payload.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            View Full
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  {result && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-white/60 block">
                          Response
                        </label>
                        <Badge 
                          variant="outline" 
                          className={result.success ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}
                        >
                          {result.status}
                        </Badge>
                      </div>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-blue-400">
                          {JSON.stringify(result, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Health Check */}
              <TabsContent value="health" className="space-y-6">
                <div className="text-center py-8">
                  <Button
                    onClick={handleHealthCheck}
                    disabled={healthLoading}
                    size="lg"
                    className="bg-white text-black hover:bg-white/90"
                  >
                    {healthLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <HeartPulse className="w-5 h-5 mr-2" />
                    )}
                    Check API Health
                  </Button>
                </div>

                {healthResult && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white/60 block">
                        Response
                      </label>
                      <Badge 
                        variant="outline" 
                        className={healthResult.success ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}
                      >
                        {healthResult.status}
                      </Badge>
                    </div>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-blue-400">
                        {JSON.stringify(healthResult, null, 2)}
                      </code>
                    </pre>
                  </div>
                )}
              </TabsContent>

              {/* Get Endpoints */}
              <TabsContent value="endpoints" className="space-y-6">
                <div className="text-center py-8">
                  <Button
                    onClick={handleGetEndpoints}
                    disabled={endpointsLoading}
                    size="lg"
                    className="bg-white text-black hover:bg-white/90"
                  >
                    {endpointsLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <List className="w-5 h-5 mr-2" />
                    )}
                    Fetch All Endpoints
                  </Button>
                </div>

                {endpointsResult && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white/60 block">
                        Response
                      </label>
                      <Badge 
                        variant="outline" 
                        className={endpointsResult.success ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}
                      >
                        {endpointsResult.status}
                      </Badge>
                    </div>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                      <code className="text-sm font-mono text-blue-400">
                        {JSON.stringify(endpointsResult, null, 2)}
                      </code>
                    </pre>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">cURL Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono text-emerald-400">
                  {`curl -X POST \\
  https://your-api.com/api/ai/generate-image \\
  -H 'Content-Type: application/json' \\
  -d '{
    "prompt": "A beautiful sunset"
  }'`}
                </code>
              </pre>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">JavaScript Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono text-blue-400">
                  {`const response = await fetch(
  '/api/ai/generate-image',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: 'A beautiful sunset'
    })
  }
);

const data = await response.json();
console.log(data.payload.url);`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TryIt;
