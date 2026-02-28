const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const DeepImgGenerator = {
  config: {
    apiUrl: "https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev",
    imageSize: "1024x1024",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://deepimg.ai",
      Referer: "https://deepimg.ai/",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    },
  },

  _getDeviceId: () => {
    return `dev-${Math.floor(Math.random() * 1000000)}`;
  },

  generate: async (prompt) => {
    try {
      if (!prompt) {
        return {
          status: 400,
          success: false,
          owners: "Martin",
          message: "Prompt is required",
        };
      }

      const response = await axios.post(
        DeepImgGenerator.config.apiUrl,
        {
          prompt,
          size: DeepImgGenerator.config.imageSize,
          device_id: DeepImgGenerator._getDeviceId(),
        },
        { headers: DeepImgGenerator.config.headers }
      );

      const imageUrl = response.data?.data?.images?.[0]?.url;
      if (!imageUrl) throw new Error("Failed to get image URL");

      return {
        status: 200,
        success: true,
        owners: "Martin",
        payload: {
          url: imageUrl,
          model: "flux-1-dev",
          prompt,
        },
      };
    } catch (err) {
      return {
        status: 500,
        success: false,
        owners: "DevX",
        message: err.response?.data?.message || err.message,
      };
    }
  },
};


app.get('/api/health', (req, res) => {
  res.json({
    status: 200,
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/endpoints', (req, res) => {
  res.json({
    status: 200,
    success: true,
    data: [
      {
        category: 'AI',
        endpoints: [
          {
            method: 'POST',
            path: '/api/ai/generate-image',
            description: 'Generate AI image using Flux-1-Dev model',
            parameters: [
              {
                name: 'prompt',
                type: 'string',
                required: true,
                description: 'Text prompt for image generation',
              },
            ],
            response: {
              success: true,
              payload: {
                url: 'string',
                model: 'flux-1-dev',
                prompt: 'string',
              },
            },
          },
        ],
      },
      {
        category: 'General',
        endpoints: [
          {
            method: 'GET',
            path: '/api/health',
            description: 'Check API health status',
            parameters: [],
          },
          {
            method: 'GET',
            path: '/api/endpoints',
            description: 'Get all available API endpoints',
            parameters: [],
          },
        ],
      },
    ],
  });
});

app.post('/api/ai/generate-image', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'Prompt is required in request body',
    });
  }

  const result = await DeepImgGenerator.generate(prompt);
  res.status(result.status).json(result);
});

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: 'Endpoint not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    success: false,
    message: 'Internal server error',
  });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
  });
}
