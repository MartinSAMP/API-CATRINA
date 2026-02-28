import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  HeartPulse, 
  List, 
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  response: object;
  example: object;
}

interface Category {
  name: string;
  icon: React.ElementType;
  endpoints: Endpoint[];
}

const Endpoints = () => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: 'AI',
      icon: Cpu,
      endpoints: [
        {
          method: 'POST',
          path: '/api/ai/generate-image',
          description: 'Generate AI image using Flux-1-Dev model powered by DeepImg',
          parameters: [
            {
              name: 'prompt',
              type: 'string',
              required: true,
              description: 'Text prompt describing the image you want to generate',
            },
          ],
          response: {
            status: 200,
            success: true,
            owners: 'Martin',
            payload: {
              url: 'https://generated.image.url/image.png',
              model: 'flux-1-dev',
              prompt: 'Your prompt here',
            },
          },
          example: {
            prompt: 'A serene mountain landscape at sunset',
          },
        },
      ],
    },
    {
      name: 'General',
      icon: HeartPulse,
      endpoints: [
        {
          method: 'GET',
          path: '/api/health',
          description: 'Check API health status and availability',
          parameters: [],
          response: {
            status: 200,
            success: true,
            message: 'API is running',
            timestamp: '2024-01-01T00:00:00.000Z',
          },
          example: {},
        },
        {
          method: 'GET',
          path: '/api/endpoints',
          description: 'Get all available API endpoints with documentation',
          parameters: [],
          response: {
            status: 200,
            success: true,
            data: [],
          },
          example: {},
        },
      ],
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'POST':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'PUT':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'DELETE':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="endpoints" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-white/20 text-white/60">
            <List className="w-3 h-3 mr-2" />
            API Reference
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Endpoints
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Explore our available API endpoints. All endpoints return JSON responses 
            and support standard HTTP methods.
          </p>
        </div>

        {/* Endpoints by Category */}
        <Tabs defaultValue="AI" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 bg-white/5 p-1 rounded-xl">
            {categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-lg transition-all"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="space-y-6">
              {category.endpoints.map((endpoint, index) => (
                <Card key={index} className="glass border-white/10 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <Badge 
                        variant="outline" 
                        className={`${getMethodColor(endpoint.method)} font-mono text-sm px-3 py-1 w-fit`}
                      >
                        {endpoint.method}
                      </Badge>
                      <div className="flex items-center gap-2 flex-1">
                        <code className="text-white font-mono text-sm sm:text-base">
                          {endpoint.path}
                        </code>
                        <button
                          onClick={() => copyToClipboard(endpoint.path)}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {copiedPath === endpoint.path ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-white/40" />
                          )}
                        </button>
                      </div>
                    </div>
                    <CardTitle className="text-white/80 text-base font-normal mt-2">
                      {endpoint.description}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Parameters */}
                    {endpoint.parameters.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white/60 mb-3 flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          Parameters
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left py-2 px-3 text-white/40 font-medium">Name</th>
                                <th className="text-left py-2 px-3 text-white/40 font-medium">Type</th>
                                <th className="text-left py-2 px-3 text-white/40 font-medium">Required</th>
                                <th className="text-left py-2 px-3 text-white/40 font-medium">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters.map((param, pIndex) => (
                                <tr key={pIndex} className="border-b border-white/5">
                                  <td className="py-3 px-3 font-mono text-white">{param.name}</td>
                                  <td className="py-3 px-3">
                                    <span className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded">
                                      {param.type}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3">
                                    {param.required ? (
                                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                                        Required
                                      </span>
                                    ) : (
                                      <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded">
                                        Optional
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3 text-white/50">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Request Example */}
                    {Object.keys(endpoint.example).length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white/60 mb-3 flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          Request Example
                        </h4>
                        <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm font-mono text-emerald-400">
                            {JSON.stringify(endpoint.example, null, 2)}
                          </code>
                        </pre>
                      </div>
                    )}

                    {/* Response Example */}
                    <div>
                      <h4 className="text-sm font-semibold text-white/60 mb-3 flex items-center">
                        <ChevronRight className="w-4 h-4 mr-1" />
                        Response Example
                      </h4>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-blue-400">
                          {JSON.stringify(endpoint.response, null, 2)}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Base URL Note */}
        <div className="mt-12 glass rounded-2xl p-6 text-center">
          <p className="text-white/50 text-sm">
            <span className="text-white/70 font-medium">Base URL:</span>{' '}
            <code className="bg-white/10 px-2 py-1 rounded text-white font-mono">
              https://your-api-domain.com/api
            </code>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Endpoints;
