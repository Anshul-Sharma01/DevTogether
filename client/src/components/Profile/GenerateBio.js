import axios from 'axios';

const generateBio = async (studentInput) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;  // Ensure your API key is in .env
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const prompt = createBioPrompt(studentInput);

    try {
        const generatedBio = await fetchGeneratedBio(url, prompt);
        return generatedBio;
    } catch (error) {
        console.error("❌ Error generating bio via Gemini:", error.message);
        return null;
    }
};

// Function to create the prompt with student's unstructured input
const createBioPrompt = (studentInput) => {
    return `
        You are a creative writer tasked with crafting a **fun, funky, and engaging bio** for a student based on their personal interests and hobbies. The bio should highlight their personality in a quirky, humorous, and memorable way.

        Below is some information about the student:
        ${studentInput}

        ⚠️ Your task is to create a **one-paragraph bio** that:
        - Sounds fun, clever, and easy to remember
        - Reflects the student's interests and quirks
        - Could be used for a personal website or social media profile
        - Avoids being overly formal or professional, but still reflects the student's uniqueness

        🎯 Output: Just the bio, with no extra text or explanations.

        Make it quirky. Make it fun. Make it unforgettable and return the bio so that we can use it as it is in our project ( don't return the name of the student in the first text only)
    `;
};

// Function to fetch the generated bio from the API
const fetchGeneratedBio = async (url, prompt) => {
    const response = await axios.post(
        url,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } }
    );

    const modelOutput = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No bio generated.";
    return modelOutput.trim();
};

export default generateBio;
