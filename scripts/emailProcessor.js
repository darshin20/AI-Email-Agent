require("dotenv").config();
const axios = require("axios");

async function summarizeEmail(emailContent) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text:
                  "Summarize this email:\n\n" +
                  emailContent
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0]
      .content.parts[0].text;
  } catch (error) {
    console.log(error.message);
  }
}

async function run() {
  const sampleEmail = `
  Meeting scheduled tomorrow at 10 AM.
  Please prepare the project report.
  `;

  const summary =
    await summarizeEmail(sampleEmail);

  console.log("Summary:");
  console.log(summary);
}

run();