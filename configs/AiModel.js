const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script  to generate 30 second video on the topic: interesting historical stories along with a AI image prompt in realistic format for each scene and give me result in JSON format with image prompt and contentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene_number\": 1,\n      \"duration\": 5,\n      \"contentText\": \"Did you know that a group of pigeons helped break a key code in World War I?\",\n      \"imagePrompt\": \"A realistic, close-up shot of a carrier pigeon with a small message tube attached to its leg, flying against a backdrop of a WWI trench. Soldiers in uniform can be seen in the background, blurry and out of focus. The lighting is slightly dim, with overcast skies.\"\n    },\n    {\n      \"scene_number\": 2,\n        \"duration\": 5,\n      \"contentText\": \"These feathered spies delivered crucial messages, helping the Allies gain an advantage.\",\n        \"imagePrompt\": \"A realistic, medium shot showing a flock of carrier pigeons taking off from a trench during WWI. The sky above is overcast, and soldiers can be seen in the background observing the birds.\"\n    },\n    {\n      \"scene_number\": 3,\n       \"duration\": 5,\n      \"contentText\": \"Another fascinating story: the Great Emu War of 1932 in Australia.\",\n       \"imagePrompt\":\"A realistic, slightly humorous, wide shot of several emus scattered across an Australian plain. A single vintage-looking machine gun, operated by uniformed personnel, is in the foreground. The scene should feel a bit comical.\"\n    },\n     {\n      \"scene_number\": 4,\n       \"duration\": 5,\n      \"contentText\": \"The Australian army actually declared war on emus... and lost!\",\n        \"imagePrompt\":\"A realistic, close-up shot of emus running amok, with military personnel looking frustrated and confused in the background. The backdrop should be an Australian landscape.\"\n    },\n     {\n      \"scene_number\": 5,\n      \"duration\": 5,\n      \"contentText\": \"The emus proved too fast and elusive, a rather unusual military defeat.\",\n       \"imagePrompt\":\"A realistic, medium shot showing several emus running through tall grass, with the sun setting in the background. The scene should be visually appealing and capture the movement of the emus.\"\n    },\n    {\n      \"scene_number\": 6,\n        \"duration\": 5,\n      \"contentText\":\"History is full of such unexpected and fascinating stories, isn't it?\",\n       \"imagePrompt\": \"A realistic, montage shot showing a collage of historical elements -  a carrier pigeon, an emu, a vintage map, and a quill and ink pot - all arranged aesthetically. The background should have a parchment-like texture.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    