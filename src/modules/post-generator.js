import { OpenAI } from 'openai';

    /**
     * Generate a LinkedIn post from a video summary
     * @param {string} summary - Summary of the video content
     * @param {string} videoTitle - Title of the YouTube video
     * @param {string} speakerName - Name of the speaker (optional)
     * @param {string[]} hashtags - Relevant hashtags (optional)
     * @param {string} tone - Tone for the post (first-person, third-person, thought-leader)
     * @param {boolean} includeCallToAction - Whether to include a call to action
     * @param {string} apiKey - OpenAI API key
     * @returns {Promise<string>} - The generated LinkedIn post
     */
    export async function generateLinkedInPost(
      summary, 
      videoTitle, 
      speakerName = null, 
      hashtags = [], 
      tone = "first-person", 
      includeCallToAction = true,
      apiKey
    ) {
      if (!apiKey) {
        throw new Error("OpenAI API key not provided");
      }
      
      if (!summary || summary.trim().length === 0) {
        throw new Error("Empty summary provided");
      }
      
      console.log(`Generating LinkedIn post with tone: ${tone}`);
      
      try {
        // Initialize OpenAI client with provided API key
        const openai = new OpenAI({
          apiKey: apiKey,
        });
        
        // Prepare hashtag string
        const hashtagString = hashtags && hashtags.length > 0 
          ? hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ')
          : '';
        
        // Prepare speaker reference
        const speakerReference = speakerName ? `by ${speakerName}` : '';
        
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a professional LinkedIn content creator. 
              Create a compelling LinkedIn post in a ${tone} tone based on the provided video summary.
              The post should be between 500-1200 characters (not including hashtags).
              
              Structure the post with:
              1. An attention-grabbing hook
              2. 2-3 key insights from the video
              3. A personal reflection or takeaway
              ${includeCallToAction ? '4. A soft call to action (e.g., asking a question, inviting comments)' : ''}
              
              The post should feel authentic, professional, and valuable to LinkedIn readers.
              Avoid clickbait or overly promotional language.`
            },
            {
              role: "user",
              content: `Create a LinkedIn post based on this YouTube video:
              
              Title: ${videoTitle} ${speakerReference}
              
              Summary:
              ${summary}
              
              ${hashtagString ? `Suggested hashtags: ${hashtagString}` : ''}
              
              Please format the post ready to copy and paste to LinkedIn.`
            }
          ],
          temperature: 0.7,
          max_tokens: 700
        });
        
        if (response.choices && response.choices.length > 0) {
          let post = response.choices[0].message.content.trim();
          
          // Ensure hashtags are at the end if they weren't included
          if (hashtagString && !post.includes(hashtagString)) {
            post += `\n\n${hashtagString}`;
          }
          
          return post;
        } else {
          throw new Error("No post generated");
        }
      } catch (error) {
        console.error("Post generation error:", error);
        throw new Error(`Failed to generate LinkedIn post: ${error.message}`);
      }
    }
