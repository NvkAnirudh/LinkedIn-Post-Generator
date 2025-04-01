import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { z } from 'zod';
    import { extractTranscript } from './modules/transcript-extractor.js';
    import { summarizeTranscript } from './modules/transcript-summarizer.js';
    import { generateLinkedInPost } from './modules/post-generator.js';
    import { ApiKeyManager } from './modules/api-key-manager.js';

    // Create API key manager
    const apiKeyManager = new ApiKeyManager();

    // Create an MCP server for LinkedIn post generation
    const server = new McpServer({
      name: "LinkedIn Post Generator",
      version: "1.0.0",
      description: "Generate LinkedIn post drafts from YouTube videos"
    });

    // Set API keys tool
    server.tool(
      "set_api_keys",
      { 
        openaiApiKey: z.string().min(1).describe("Your OpenAI API key"),
        youtubeApiKey: z.string().optional().describe("Your YouTube API key (optional)")
      },
      async ({ openaiApiKey, youtubeApiKey }) => {
        try {
          apiKeyManager.setOpenAIKey(openaiApiKey);
          if (youtubeApiKey) {
            apiKeyManager.setYouTubeKey(youtubeApiKey);
          }
          
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: true,
                message: "API keys set successfully. You can now use the other tools."
              }, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: false,
                error: error.message
              }, null, 2)
            }],
            isError: true
          };
        }
      },
      { description: "Set your API keys for OpenAI and YouTube (optional)" }
    );

    // Check API keys status
    server.tool(
      "check_api_keys",
      {},
      async () => {
        const status = apiKeyManager.getStatus();
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(status, null, 2)
          }]
        };
      },
      { description: "Check the status of your API keys" }
    );

    // Extract transcript tool
    server.tool(
      "extract_transcript",
      { 
        youtubeUrl: z.string().url().describe("YouTube video URL")
      },
      async ({ youtubeUrl }) => {
        try {
          // Check if YouTube API key is set (if needed)
          if (!apiKeyManager.hasYouTubeKey()) {
            console.log("No YouTube API key set, will try without it");
          }
          
          const transcript = await extractTranscript(youtubeUrl, apiKeyManager.getYouTubeKey());
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: true,
                transcript
              }, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: false,
                error: error.message
              }, null, 2)
            }],
            isError: true
          };
        }
      },
      { description: "Extract transcript from a YouTube video" }
    );

    // Summarize transcript tool
    server.tool(
      "summarize_transcript",
      { 
        transcript: z.string().describe("Video transcript text"),
        tone: z.enum(["educational", "inspirational", "professional", "conversational"])
          .default("professional")
          .describe("Tone of the summary"),
        audience: z.enum(["general", "technical", "business", "academic"])
          .default("general")
          .describe("Target audience for the summary"),
        wordCount: z.number().min(100).max(300).default(200)
          .describe("Approximate word count for the summary")
      },
      async ({ transcript, tone, audience, wordCount }) => {
        try {
          // Check if OpenAI API key is set
          if (!apiKeyManager.hasOpenAIKey()) {
            throw new Error("OpenAI API key not set. Please use the set_api_keys tool first.");
          }
          
          const summary = await summarizeTranscript(
            transcript, 
            tone, 
            audience, 
            wordCount, 
            apiKeyManager.getOpenAIKey()
          );
          
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: true,
                summary
              }, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: false,
                error: error.message
              }, null, 2)
            }],
            isError: true
          };
        }
      },
      { description: "Summarize a video transcript" }
    );

    // Generate LinkedIn post tool
    server.tool(
      "generate_linkedin_post",
      { 
        summary: z.string().describe("Summary of the video content"),
        videoTitle: z.string().describe("Title of the YouTube video"),
        speakerName: z.string().optional().describe("Name of the speaker in the video (optional)"),
        hashtags: z.array(z.string()).optional().describe("Relevant hashtags (optional)"),
        tone: z.enum(["first-person", "third-person", "thought-leader"])
          .default("first-person")
          .describe("Tone of the LinkedIn post"),
        includeCallToAction: z.boolean().default(true)
          .describe("Whether to include a call to action")
      },
      async ({ summary, videoTitle, speakerName, hashtags, tone, includeCallToAction }) => {
        try {
          // Check if OpenAI API key is set
          if (!apiKeyManager.hasOpenAIKey()) {
            throw new Error("OpenAI API key not set. Please use the set_api_keys tool first.");
          }
          
          const post = await generateLinkedInPost(
            summary, 
            videoTitle, 
            speakerName, 
            hashtags, 
            tone, 
            includeCallToAction,
            apiKeyManager.getOpenAIKey()
          );
          
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: true,
                post
              }, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: false,
                error: error.message
              }, null, 2)
            }],
            isError: true
          };
        }
      },
      { description: "Generate a LinkedIn post draft from a video summary" }
    );

    // All-in-one tool: YouTube URL to LinkedIn post
    server.tool(
      "youtube_to_linkedin_post",
      { 
        youtubeUrl: z.string().url().describe("YouTube video URL"),
        tone: z.enum(["first-person", "third-person", "thought-leader"])
          .default("first-person")
          .describe("Tone of the LinkedIn post"),
        summaryTone: z.enum(["educational", "inspirational", "professional", "conversational"])
          .default("professional")
          .describe("Tone of the summary"),
        audience: z.enum(["general", "technical", "business", "academic"])
          .default("general")
          .describe("Target audience"),
        hashtags: z.array(z.string()).optional().describe("Relevant hashtags (optional)"),
        includeCallToAction: z.boolean().default(true)
          .describe("Whether to include a call to action")
      },
      async ({ youtubeUrl, tone, summaryTone, audience, hashtags, includeCallToAction }) => {
        try {
          // Check if API keys are set
          if (!apiKeyManager.hasOpenAIKey()) {
            throw new Error("OpenAI API key not set. Please use the set_api_keys tool first.");
          }
          
          // Step 1: Extract transcript
          const transcript = await extractTranscript(youtubeUrl, apiKeyManager.getYouTubeKey());
          
          // Step 2: Get video metadata (title, etc.)
          const videoTitle = await getVideoTitle(youtubeUrl);
          
          // Step 3: Summarize transcript
          const summary = await summarizeTranscript(
            transcript, 
            summaryTone, 
            audience, 
            200, 
            apiKeyManager.getOpenAIKey()
          );
          
          // Step 4: Generate LinkedIn post
          const post = await generateLinkedInPost(
            summary, 
            videoTitle, 
            undefined, // speaker name not available without additional API calls
            hashtags, 
            tone, 
            includeCallToAction,
            apiKeyManager.getOpenAIKey()
          );
          
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: true,
                videoTitle,
                transcript: transcript.substring(0, 300) + "...", // Preview only
                summary,
                post
              }, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                success: false,
                error: error.message
              }, null, 2)
            }],
            isError: true
          };
        }
      },
      { description: "Generate a LinkedIn post draft directly from a YouTube video URL" }
    );

    // Helper function to extract video title from URL
    async function getVideoTitle(youtubeUrl) {
      try {
        // Extract video ID from URL
        const videoId = new URL(youtubeUrl).searchParams.get('v');
        if (!videoId) {
          throw new Error("Could not extract video ID from URL");
        }
        
        // For now, return a placeholder. In a production environment,
        // you would use the YouTube API to get the actual title
        return `YouTube Video (${videoId})`;
      } catch (error) {
        console.error("Error getting video title:", error);
        return "YouTube Video";
      }
    }

    export { server };
