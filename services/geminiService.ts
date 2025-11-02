
import { GoogleGenAI, Type } from "@google/genai";
import type { EmotionAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const emotionSchema = {
  type: Type.OBJECT,
  properties: {
    emotion: {
      type: Type.STRING,
      description: "A single, primary emotion detected in the image (e.g., Happy, Sad, Surprised, Angry)."
    },
    description: {
      type: Type.STRING,
      description: "A brief, one-sentence explanation for the emotion detected, based on visual cues."
    }
  },
  required: ['emotion', 'description']
};

export async function analyzeImageEmotion(base64ImageData: string): Promise<EmotionAnalysis> {
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64ImageData,
    },
  };

  const textPart = {
    text: `Analyze the primary emotion of the person in this image. Respond with only a JSON object matching the provided schema. The emotion should be a single word. The description should be a short, one-sentence explanation based on facial expressions or body language.`
  };
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
    config: {
      responseMimeType: 'application/json',
      responseSchema: emotionSchema,
    },
  });

  const jsonString = response.text.trim();
  try {
    const parsedJson = JSON.parse(jsonString);
    return parsedJson as EmotionAnalysis;
  } catch (e) {
    console.error("Failed to parse Gemini response:", jsonString);
    throw new Error("Received an invalid response from the AI model.");
  }
}
