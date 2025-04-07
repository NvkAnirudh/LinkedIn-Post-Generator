# LinkedIn Post Generator

[![smithery badge](https://smithery.ai/badge/@NvkAnirudh/linkedin-post-generator)](https://smithery.ai/server/@NvkAnirudh/linkedin-post-generator)

A Model Context Protocol (MCP) server that automates generating professional LinkedIn post drafts from YouTube videos. This tool streamlines content repurposing by extracting transcripts from YouTube videos, summarizing the content, and generating engaging LinkedIn posts tailored to your preferences.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
  - [Local Development](#local-development)
  - [Using with Claude Desktop](#using-with-claude-desktop)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Available Tools](#available-tools)
  - [Workflow Example](#workflow-example)
- [Deployment](#deployment)
- [License](#license)

## Features

- **YouTube Transcript Extraction**: Automatically extract transcripts from any YouTube video
- **Content Summarization**: Generate concise summaries with customizable tone and target audience
- **LinkedIn Post Generation**: Create professional LinkedIn posts with customizable style and tone
- **All-in-One Workflow**: Go from YouTube URL to LinkedIn post in a single operation
- **Customization Options**: Adjust tone, audience, word count, and more to match your personal brand
- **MCP Integration**: Works seamlessly with AI assistants that support the Model Context Protocol

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/NvkAnirudh/LinkedIn-Post-Generator.git
   cd LinkedIn-Post-Generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

4. Add your API keys to the `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   ```

5. Run the server:
   ```bash
   npm run dev
   ```

6. Test with MCP Inspector:
   ```bash
   npm run inspect
   ```

### Using with Claude Desktop

This MCP server is designed to work with Claude Desktop and other AI assistants that support the Model Context Protocol. To use it with Claude Desktop:

1. Install the LinkedIn Post Generator MCP server from [Smithery](https://smithery.ai/server/@NvkAnirudh/linkedin-post-generator):
   ```bash
   npx -y @smithery/cli install yt-to-linkedin-mcp --client claude
   ```

2. Restart Claude Desktop

3. In Claude Desktop, you can now access the LinkedIn Post Generator tools

## Configuration

The application requires API keys to function properly:

1. **OpenAI API Key** (required): Used for content summarization and post generation
2. **YouTube API Key** (optional): Enhances YouTube metadata retrieval

You can provide these keys in two ways:
- As environment variables in a `.env` file
- Directly through the MCP interface using the `set_api_keys` tool

## Usage

### Available Tools

#### Set API Keys
- Tool: `set_api_keys`
- Purpose: Configure your API keys
- Parameters:
  - `openaiApiKey`: Your OpenAI API key (required)
  - `youtubeApiKey`: Your YouTube API key (optional)

#### Check API Keys
- Tool: `check_api_keys`
- Purpose: Verify your API key configuration status

#### Extract Transcript
- Tool: `extract_transcript`
- Purpose: Get the transcript from a YouTube video
- Parameters:
  - `youtubeUrl`: URL of the YouTube video

#### Summarize Transcript
- Tool: `summarize_transcript`
- Purpose: Create a concise summary of the video content
- Parameters:
  - `transcript`: The video transcript text
  - `tone`: Educational, inspirational, professional, or conversational
  - `audience`: General, technical, business, or academic
  - `wordCount`: Approximate word count for the summary (100-300)

#### Generate LinkedIn Post
- Tool: `generate_linkedin_post`
- Purpose: Create a LinkedIn post from a summary
- Parameters:
  - `summary`: Summary of the video content
  - `videoTitle`: Title of the YouTube video
  - `speakerName`: Name of the speaker (optional)
  - `hashtags`: Relevant hashtags (optional)
  - `tone`: First-person, third-person, or thought-leader
  - `includeCallToAction`: Whether to include a call to action

#### All-in-One: YouTube to LinkedIn Post
- Tool: `youtube_to_linkedin_post`
- Purpose: Complete workflow from YouTube URL to LinkedIn post
- Parameters:
  - `youtubeUrl`: YouTube video URL
  - `tone`: Desired tone for the post
  - Plus additional customization options

### Workflow Example

1. Set your API keys using the `set_api_keys` tool
2. Use the `youtube_to_linkedin_post` tool with a YouTube URL
3. Receive a complete LinkedIn post draft ready to publish

## Deployment

This server is deployed on [Smithery](https://smithery.ai), a platform for hosting and sharing MCP servers. The deployment configuration is defined in the `smithery.yaml` file.

To deploy your own instance:

1. Create an account on Smithery
2. Install the Smithery CLI:
   ```bash
   npm install -g @smithery/cli
   ```
3. Deploy the server:
   ```bash
   smithery deploy
   ```

## Contributing

Contributions are welcome and appreciated! Here's how you can contribute to the LinkedIn Post Generator:

### Reporting Issues

- Use the [GitHub issue tracker](https://github.com/NvkAnirudh/LinkedIn-Post-Generator/issues) to report bugs or suggest features
- Please provide detailed information about the issue, including steps to reproduce, expected behavior, and actual behavior
- Include your environment details (OS, Node.js version, etc.) when reporting bugs

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, commented code
- Include tests for new features
- Update documentation to reflect your changes

### Feature Suggestions

If you have ideas for new features or improvements:

1. Check existing issues to see if your suggestion has already been proposed
2. If not, open a new issue with the label 'enhancement'
3. Clearly describe the feature and its potential benefits

### Documentation

Improvements to documentation are always welcome:

- Fix typos or clarify existing documentation
- Add examples or use cases
- Improve the structure or organization of the documentation

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.

## License

[MIT](https://github.com/NvkAnirudh/LinkedIn-Post-Generator/blob/main/LICENSE)
