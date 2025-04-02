# YouTube to LinkedIn MCP Server

A Model Context Protocol (MCP) server that automates generating LinkedIn post drafts from YouTube videos. The server extracts transcripts from YouTube videos, summarizes the content, and generates professional LinkedIn post drafts.

## Features

- YouTube transcript extraction
- Content summarization with customizable tone and audience
- LinkedIn post generation with customizable style
- All-in-one workflow from YouTube URL to LinkedIn post

## Setup Instructions

### Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd yt-to-linkedin-mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the server:
   ```
   npm run dev
   ```

4. Test with MCP Inspector:
   ```
   npm run inspect
   ```

### Smithery Deployment

This server is configured for deployment on Smithery using the included `smithery.yaml` file.

## API Keys

This application requires API keys to function. You can provide them in two ways:

1. As environment variables (OPENAI_API_KEY, YOUTUBE_API_KEY)
2. Directly through the MCP interface using the `set_api_keys` tool

## MCP Tools

### Set API Keys
- Tool: `set_api_keys`
- Input: OpenAI API key (required), YouTube API key (optional)
- Output: Confirmation message

### Check API Keys
- Tool: `check_api_keys`
- Input: None
- Output: Status of configured API keys

### Extract Transcript
- Tool: `extract_transcript`
- Input: YouTube video URL
- Output: Extracted transcript text

### Summarize Transcript
- Tool: `summarize_transcript`
- Input: Transcript text, tone, audience, word count
- Output: Concise summary of the video content

### Generate LinkedIn Post
- Tool: `generate_linkedin_post`
- Input: Summary, video title, speaker name, hashtags, tone, call to action flag
- Output: LinkedIn post draft

### All-in-One: YouTube to LinkedIn Post
- Tool: `youtube_to_linkedin_post`
- Input: YouTube URL and post customization options
- Output: Complete workflow result including transcript, summary, and post

## License

[MIT](https://github.com/NvkAnirudh/LinkedIn-Post-Generator/blob/main/LICENSE)
