# LinkedIn Post Generator MCP Server

    An MCP server that automates generating LinkedIn post drafts from YouTube videos. The server extracts transcripts from YouTube videos, summarizes the content, and generates professional LinkedIn post drafts.

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
       cd linkedin-post-generator
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

    ### Docker Deployment

    1. Build the Docker image:
       ```
       docker build -t linkedin-post-generator .
       ```

    2. Run the container:
       ```
       docker run -p 8000:8000 linkedin-post-generator
       ```

    ## API Keys

    This application requires API keys to function. Instead of setting them as environment variables, you can provide them directly through the MCP interface:

    1. First, use the `set_api_keys` tool to provide your API keys:
       - `openaiApiKey`: Your OpenAI API key (required)
       - `youtubeApiKey`: Your YouTube API key (optional)

    2. You can check the status of your API keys using the `check_api_keys` tool.

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

    ## Deployment on Smithery and Glama

    This server is designed to be deployed on both Smithery and Glama platforms:

    ### Smithery Deployment
    Use the included `smithery.yaml` configuration file for deployment.

    ### Glama Deployment
    Follow the standard Glama deployment process using the provided Dockerfile.

    ## License

    MIT
