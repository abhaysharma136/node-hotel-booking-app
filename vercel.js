{
    "version": 2,
    "name": "Node-Streaming-App",
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/index.js"
      }
    ]
  }
  