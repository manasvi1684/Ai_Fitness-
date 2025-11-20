
# AI Fitness Coach – Personalized Workout & Diet Generator

This project is a full-stack AI-powered fitness planning application built with Next.js.
It generates a complete workout plan, diet plan, and fitness tips using Gemini AI, supports,text-to-speech audio playback, and provides a PDF export feature.

---

## Features

### 1. AI-Generated Fitness Plan

The application uses Google’s **Gemini 2.0 Flash** model to generate a structured fitness plan.
The backend applies a normalization layer to ensure the output follows a consistent schema, even if the AI response varies.

### 2. Workout Plan

A 7-day training schedule with exercises, sets, reps and optional rest guidance.

### 3. Diet Plan

Structured meal plan that includes:

* Breakfast
* Lunch
* Dinner
* Snacks

### 4. AI Tips

Additional guidance such as recovery, nutrition and performance suggestions.

### 5. Text-to-Speech (TTS)

The plan can be read aloud using the OpenAI TTS API.
(Requires an OpenAI API key with available quota.)

### 6. PDF Export

All generated plans can be exported as a clean, single-page PDF using jsPDF.

### 7. Image Modal

Exercises and meals can optionally display AI-generated reference images.

### 8. Responsive UI

Built with React and Tailwind CSS for a clean and mobile-friendly design.

---

## Tech Stack

**Frontend**

* Next.js (App Router)
* React
* Tailwind CSS
* jsPDF

**Backend**

* Next.js API Routes
* Google Gemini API
* OpenAI Audio TTS (optional)

**Deployment**

* Vercel (recommended)

---

## Project Structure

```
ai-fitness-app/
 ├─ src/
 │   ├─ app/
 │   │   ├─ page.js
 │   │   ├─ api/
 │   │   │   ├─ generate/route.js   # Fitness plan generation
 │   │   │   └─ tts/route.js        # Text-to-speech
 │   ├─ components/
 │   │   ├─ UserForm.jsx
 │   │   ├─ PlanDisplay.jsx
 │   │   ├─ AudioPlayer.jsx
 │   │   └─ ImageModal.jsx
 │   ├─ utils/
 │       └─ pdf.js
 ├─ .env.local
 ├─ package.json
 └─ README.md
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

Both keys are required if you want TTS functionality.
The app still works without OpenAI (TTS will be disabled).

---

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Deploying to Vercel

1. Push your project to GitHub.
2. Go to [https://vercel.com](https://vercel.com)
3. Create a new project and import your repository.
4. Add the environment variables in Vercel:

   * `GEMINI_API_KEY`
   * `OPENAI_API_KEY`
5. Click **Deploy**.

Vercel will build the Next.js app and give you a live URL.

---

## Notes

* OpenAI TTS requires a paid account or remaining credit.
* Gemini API usage depends on Google’s quota policies.
* All AI output is normalized in the backend to ensure consistent rendering.

---

## License

This project is provided under the MIT License.

---

If you want, I can also:

* Add a section for screenshots
* Add API examples
* Add badges for GitHub and Vercel
* Write a "How It Works" section for recruiters

Just tell me.
