/**
     * Manages API keys for the application
     */
    export class ApiKeyManager {
      constructor() {
        // Initialize API keys from environment variables
        this.openaiApiKey = process.env.OPENAI_API_KEY || null;
        this.youtubeApiKey = process.env.YOUTUBE_API_KEY || null;
        
        // Log initialization status
        if (this.openaiApiKey) {
          console.log('OpenAI API key initialized from environment');
        }
        if (this.youtubeApiKey) {
          console.log('YouTube API key initialized from environment');
        }
      }
      
      /**
       * Set the OpenAI API key
       * @param {string} key - The OpenAI API key
       */
      setOpenAIKey(key) {
        if (!key || typeof key !== 'string' || key.trim() === '') {
          throw new Error("Invalid OpenAI API key");
        }
        this.openaiApiKey = key.trim();
        console.log("OpenAI API key set successfully");
      }
      
      /**
       * Set the YouTube API key
       * @param {string} key - The YouTube API key
       */
      setYouTubeKey(key) {
        if (!key || typeof key !== 'string' || key.trim() === '') {
          throw new Error("Invalid YouTube API key");
        }
        this.youtubeApiKey = key.trim();
        console.log("YouTube API key set successfully");
      }
      
      /**
       * Get the OpenAI API key
       * @returns {string|null} - The OpenAI API key or null if not set
       */
      getOpenAIKey() {
        return this.openaiApiKey;
      }
      
      /**
       * Get the YouTube API key
       * @returns {string|null} - The YouTube API key or null if not set
       */
      getYouTubeKey() {
        return this.youtubeApiKey;
      }
      
      /**
       * Check if OpenAI API key is set
       * @returns {boolean} - True if the key is set
       */
      hasOpenAIKey() {
        return !!this.openaiApiKey;
      }
      
      /**
       * Check if YouTube API key is set
       * @returns {boolean} - True if the key is set
       */
      hasYouTubeKey() {
        return !!this.youtubeApiKey;
      }
      
      /**
       * Get the status of API keys
       * @returns {Object} - Status object with key information
       */
      getStatus() {
        return {
          openai: {
            set: this.hasOpenAIKey(),
            key: this.hasOpenAIKey() ? "********" + this.openaiApiKey.slice(-4) : null
          },
          youtube: {
            set: this.hasYouTubeKey(),
            key: this.hasYouTubeKey() ? "********" + this.youtubeApiKey.slice(-4) : null
          }
        };
      }
    }
