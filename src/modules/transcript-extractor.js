import { YoutubeTranscript } from 'youtube-transcript';
    import fetch from 'node-fetch';

    /**
     * Extract transcript from a YouTube video
     * @param {string} youtubeUrl - The YouTube video URL
     * @param {string} youtubeApiKey - Optional YouTube API key
     * @returns {Promise<string>} - The extracted transcript text
     */
    export async function extractTranscript(youtubeUrl, youtubeApiKey = null) {
      try {
        console.log(`Extracting transcript from: ${youtubeUrl}`);
        
        // Extract video ID from URL
        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) {
          throw new Error("Invalid YouTube URL. Could not extract video ID.");
        }
        
        // Try to get transcript using youtube-transcript package
        try {
          const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
          if (!transcriptItems || transcriptItems.length === 0) {
            throw new Error("No transcript available");
          }
          
          // Combine transcript segments into a single text
          const fullTranscript = transcriptItems
            .map(item => item.text)
            .join(' ')
            .replace(/\s+/g, ' '); // Clean up extra spaces
          
          return fullTranscript;
        } catch (error) {
          console.error("Error with primary transcript method:", error);
          
          // Fallback to YouTube API if available
          if (youtubeApiKey) {
            return await fetchTranscriptWithYouTubeAPI(videoId, youtubeApiKey);
          } else {
            throw new Error("Failed to extract transcript: " + error.message);
          }
        }
      } catch (error) {
        console.error("Transcript extraction error:", error);
        throw new Error(`Failed to extract transcript: ${error.message}`);
      }
    }

    /**
     * Extract video ID from YouTube URL
     * @param {string} url - YouTube URL
     * @returns {string|null} - Video ID or null if not found
     */
    function extractVideoId(url) {
      try {
        const urlObj = new URL(url);
        
        // Standard YouTube URL (youtube.com/watch?v=VIDEO_ID)
        if (urlObj.hostname.includes('youtube.com')) {
          return urlObj.searchParams.get('v');
        }
        
        // Short YouTube URL (youtu.be/VIDEO_ID)
        if (urlObj.hostname === 'youtu.be') {
          return urlObj.pathname.substring(1);
        }
        
        return null;
      } catch (error) {
        console.error("Error extracting video ID:", error);
        return null;
      }
    }

    /**
     * Fallback method to fetch transcript using YouTube API
     * @param {string} videoId - YouTube video ID
     * @param {string} apiKey - YouTube API key
     * @returns {Promise<string>} - Transcript text
     */
    async function fetchTranscriptWithYouTubeAPI(videoId, apiKey) {
      if (!apiKey) {
        throw new Error("YouTube API key not provided");
      }
      
      // First, get the caption track
      const captionUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`;
      
      const response = await fetch(captionUrl);
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error("No captions available for this video");
      }
      
      // Note: Actually downloading the caption track requires OAuth2 authentication
      // which is beyond the scope of this example
      throw new Error("YouTube API fallback requires OAuth2 authentication");
    }
