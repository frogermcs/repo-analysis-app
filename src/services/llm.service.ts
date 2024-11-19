import { GoogleGenerativeAI } from "@google/generative-ai";

export class LLMService {
    private model: GoogleGenerativeAI

    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not defined");
        }
        this.model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }

    async generateAudit(prompts: string[]): Promise<string> {
        try {
            const generativeModel = this.model.getGenerativeModel({ model: "gemini-1.5-flash" })
            if (prompts.length < 1) {
                throw new Error("Prompt or Repository not found");
            }
            const result = await generativeModel.generateContent(prompts);
            return result.response.text()
          } catch (error) {
            console.error('Gemini Error:', error);
            throw new Error("Error generating audit")
          }
    }
}