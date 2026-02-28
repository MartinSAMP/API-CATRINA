# API Catrina - REST API Documentation

A modern, responsive REST API documentation website with built-in AI image generation endpoint.

## Features

- 🎨 **Modern Black & White Theme** - Clean, elegant design
- ⚡ **Fast & Responsive** - Built with React + Vite
- 🔥 **AI Image Generation** - Powered by Flux-1-Dev model
- 📚 **Interactive Documentation** - Try APIs directly in the browser
- 🚀 **Vercel Ready** - Easy deployment configuration

## API Endpoints

### AI Category

#### POST `/api/ai/generate-image`
Generate AI images using the Flux-1-Dev model.

**Parameters:**
- `prompt` (string, required) - Text description of the image

**Response:**
```json
{
  "status": 200,
  "success": true,
  "owners": "Martin",
  "payload": {
    "url": "https://generated.image.url/image.png",
    "model": "flux-1-dev",
    "prompt": "Your prompt"
  }
}
```

### General Category

#### GET `/api/health`
Check API health status.

#### GET `/api/endpoints`
Get all available API endpoints.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run API server (in another terminal)
node api/index.js
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Using GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Environment Variables

No environment variables required for basic setup.

## Project Structure

```
├── api/
│   └── index.js          # Express API server
├── src/
│   ├── components/       # React components
│   ├── sections/         # Page sections
│   ├── App.tsx          # Main app component
│   └── index.css        # Global styles
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies
```

## Credits

- AI Image Generation by [DeepImg](https://deepimg.ai)
- Built by Martin
- GitHub: https://github.com/MartinSAMP

## License

MIT License
