
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = "AIzaSyBtr2OX4OOWYNADeFKX7-NoDbl-UhxL9ng";
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ai = new GoogleGenAI({ apiKey });

export const simulateAnalysis = async (url: string): Promise<AnalysisResult> => {
  const prompt = `Act as the Google PageSpeed Insights API. Analyze the performance of the URL: ${url}. 
  Provide realistic but simulated performance metrics for a college project report.
  
  Format the response as a JSON object with:
  - performanceScore (0-100)
  - fcp (First Contentful Paint in ms, e.g. "1200ms")
  - lcp (Largest Contentful Paint in ms, e.g. "2500ms")
  - tbt (Total Blocking Time in ms, e.g. "150ms")
  - speedIndex (ms, e.g. "1800ms")
  - advice (Short, specific, and actionable technical advice for optimization, similar to Lighthouse audit recommendations like "Minimize main-thread work by deferring non-critical JavaScript")`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            performanceScore: { type: Type.NUMBER },
            fcp: { type: Type.STRING },
            lcp: { type: Type.STRING },
            tbt: { type: Type.STRING },
            speedIndex: { type: Type.STRING },
            advice: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      ...result,
      url,
      timestamp: new Date().toLocaleString()
    };
  } catch (error) {
    console.error("Simulation error:", error);
    // Fallback data matching user screenshot requirement
    return {
      performanceScore: 82,
      fcp: "1.4s",
      lcp: "2.8s",
      tbt: "210ms",
      speedIndex: "1.9s",
      timestamp: new Date().toLocaleString(),
      url,
      advice: "Minimize main-thread work by deferring non-critical JavaScript and optimizing image assets for the initial viewport."
    };
  }
};

export const getMentorAdvice = async (topic: string): Promise<string> => {
  const prompt = `You are a senior Python software engineer mentoring a student on a project called "Website Performance Analyzer". 
  The student is asking about: "${topic}". Give a helpful, professional, and technical answer suitable for a college student. Keep it under 150 words.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text || "Keep learning! Python is a powerful tool for performance analysis.";
  } catch (error) {
    return "Ensure you have all dependencies installed and use standard libraries where possible for better portability.";
  }
};
