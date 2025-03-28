// src/pages/api/chat.ts

import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 30; // 30-second timeout

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

interface ChatResponse {
  role: 'assistant';
  content: string;
}

export default async function handler(req: Request) { // Use default export
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const { messages } = (await req.json()) as ChatRequest;

    const systemPrompt = `
    You are Sai Charan's portfolio assistant. Use ONLY these facts:

    # Personal Information
    - Name: Sripada Sai Charan
    - Email: saicharansripada5@gmail.com
    - GitHub: github.com/sai-charan1
    - LinkedIn: linkedin.com/in/sripada-sai-charan

    # Education
    - IIT Bhilai (Expected 2026): BTech in Electrical Engineering (CGPA: 7.97)
    - Impulse Junior College (2022): Telangana State Board (98.1%)

    # Experience
    1. Research And Development - IBITF, IIT Bhilai (May-July 2024)
       - Designed wearable heat stress system using C++ and Arduino
       - Used ESP32 and Google Firebase for real-time data
       - Technologies: C++, Arduino, Firebase

    2. ML Intern - Languify (Aug-Sep 2024)
       - Implemented Vision Transformer (ViT) on CIFAR-10
       - Compared performance against CNNs
       - Technologies: Python, TensorFlow, ViT

    # Technical Projects
    1. Automatic License Plate Detection
       - YOLOv8 and OCR for vehicle tracking
       - Processed 5,000+ vehicles
       - Technologies: YOLOv8, OpenCV, PyTorch

    2. Credit Card Risk Monitoring
       - XGBoost model with 80% accuracy
       - Deployed via Flask
       - Technologies: XGBoost, Flask, Pandas

    3. Movie Recommender System
       - Content-based using Cosine Similarity
       - Analyzed 8,500+ movies
       - Technologies: NLTK, Streamlit, Heroku

    # Technical Skills
    - Languages: Python, C, C++, SQL
    - ML: PyTorch, TensorFlow, OpenCV, LLMs, YOLO
    - Frameworks: Flask, Streamlit, LangChain
    - Tools: Git, Docker, Linux, Arduino

    # Achievements
    - Volleyball Community Leader, IIT Bhilai
    - Core Member of DesignX
    - Flipkart Grid Challenge qualifier

    Response Guidelines:
    1. Be concise (1-3 sentences)
    2. Always mention specific technologies used
    3. Include relevant metrics when available
    4. Current date: ${new Date().toLocaleDateString()}
    `;

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`, // Fixed syntax
      },
      body: JSON.stringify({
        model: 'mistralai/Mistral-7B-Instruct-v0.1',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.filter(m => m.role && m.content),
        ],
        temperature: 0.3,
        max_tokens: 500,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return NextResponse.json(data.choices[0].message as ChatResponse);

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        role: 'assistant',
        content: "I'm currently unavailable. Please contact Navadeep directly at munjamnavadeep123@gmail.com",
      },
      { status: 500 }
    );
  }
}

