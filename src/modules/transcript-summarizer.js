import { OpenAI } from 'openai';

    /**
     * Summarize a transcript using OpenAI
     * @param {string} transcript - The transcript text to summarize
     * @param {string} tone - Desired tone (educational, inspirational, etc.)
     * @param {string} audience - Target audience (general, technical, etc.)
     * @param {number} wordCount - Approximate word count for summary
     * @param {string} apiKey - OpenAI API key
     * @returns {Promise<string>} - The summarized text
     */
    export async function summarizeTranscript(transcript, tone, audience, wordCount, apiKey) {
      if (!apiKey) {
        throw new Error("OpenAI API key not provided");
      }
      
      if (!transcript || transcript.trim().length === 0) {
        throw new Error("Empty transcript provided");
      }
      
      console.log(`Summarizing transcript (${transcript.length} chars) with tone: ${tone}, audience: ${audience}`);
      
      try {
        // Initialize OpenAI client with provided API key
        const openai = new OpenAI({
          apiKey: apiKey,
        });
        
        // Truncate transcript if it's too long (to fit within token limits)
        const truncatedTranscript = truncateText(transcript, 15000);
        
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a professional content summarizer. Summarize the provided transcript in a ${tone} tone for a ${audience} audience. 
              The summary should be approximately ${wordCount} words and capture the key points, insights, and valuable information from the transcript.
              Focus on making the summary concise, informative, and engaging.`
            },
            {
              role: "user",
              content: `Please summarize the following video transcript:\n\n${truncatedTranscript}`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        });
        
        if (response.choices && response.choices.length > 0) {
          return response.choices[0].message.content.trim();
        } else {
          throw new Error("No summary generated");
        }
      } catch (error) {
        console.error("Summarization error:", error);
        throw new Error(`Failed to summarize transcript: ${error.message}`);
      }
    }

    /**
     * Truncate text to a maximum character length
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length in characters
     * @returns {string} - Truncated text
     */
    function truncateText(text, maxLength) {
      if (text.length <= maxLength) return text;
      
      // Try to truncate at a sentence boundary
      const truncated = text.substring(0, maxLength);
      const lastPeriod = truncated.lastIndexOf('.');
      
      if (lastPeriod > maxLength * 0.8) {
        return truncated.substring(0, lastPeriod + 1);
      }
      
      return truncated + "...";
    }
