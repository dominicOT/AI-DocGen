// Ensure Node.js version is >= 18
// Install the required package with: npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-002";
// const API_KEY = "";

async function generateComprehensiveDocumentation(prompt) {
  const genAI = new GoogleGenerativeAI(`${import.meta.env.GEM_API}`);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Fine-tuned generation configuration for comprehensive and precise output
  const generationConfig = {
    temperature: 0.7, // Lowered for more deterministic results
    topK: 10,         // Consider top 10 tokens for diversity without randomness
    topP: 0.8,        // Narrowing probability for better focus
    maxOutputTokens: 3000, // Increased for more detailed documentation
  };

  // Safety settings to filter harmful or irrelevant content
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [], // Start with a blank chat history
  });

  // Adding specific instructions to guide the AI
  const refinedPrompt = `
    Write a comprehensive and easy-to-read code documentation based on the following:
    
    ${prompt}
    
    Guidelines:
    1. Clearly describe the purpose of the code.
    2. Use consistent formatting for headers, code snippets, and examples.
    3. Highlight any limitations.
    4. Avoid redundant information while maintaining clarity.
    
    Provide the output in a structured format.
  `;

  try {
    const result = await chat.sendMessage(refinedPrompt);
    const response = result.response?.text();

    if (!response) {
      throw new Error("No response received from the model.");
    }

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error generating documentation:", error.message);
    return "An error occurred while generating the documentation.";
  }
}

export default generateComprehensiveDocumentation;
