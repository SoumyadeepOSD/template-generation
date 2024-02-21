import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generateResponse = async()=>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "Write a story about a magic backpack."
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

generateResponse();