#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server } from './server.js';
import dotenv from 'dotenv';

// Load environment variables (but they're now optional)
dotenv.config();

// Check for Smithery configuration
const args = process.argv;
let smitheryConfig = null;

// Look for --config argument
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--config' && i + 1 < args.length) {
    try {
      smitheryConfig = JSON.parse(args[i + 1]);
      console.log('Smithery configuration detected');
      
      // Set environment variables from Smithery config
      if (smitheryConfig.OPENAI_API_KEY) {
        process.env.OPENAI_API_KEY = smitheryConfig.OPENAI_API_KEY;
        console.log('OpenAI API key set from Smithery config');
      }
      
      if (smitheryConfig.YOUTUBE_API_KEY) {
        process.env.YOUTUBE_API_KEY = smitheryConfig.YOUTUBE_API_KEY;
        console.log('YouTube API key set from Smithery config');
      }
      
      break;
    } catch (error) {
      console.error('Error parsing Smithery config:', error.message);
    }
  }
}

console.log('Starting LinkedIn Post Generator MCP server...');
if (!process.env.OPENAI_API_KEY) {
  console.log('Note: You will need to set your API keys using the set_api_keys tool before using other functionality.');
}

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

// Keep the process alive
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});
