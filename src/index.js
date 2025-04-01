#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server } from './server.js';
import dotenv from 'dotenv';

// Load environment variables (but they're now optional)
dotenv.config();

console.log('Starting LinkedIn Post Generator MCP server...');
console.log('Note: You will need to set your API keys using the set_api_keys tool before using other functionality.');

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

// Keep the process alive
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});
