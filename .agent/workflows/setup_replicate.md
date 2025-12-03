---
description: How to setup Replicate API keys for image generation
---

# Setting up Replicate for Image Generation

Follow these steps to get your API key and enable image generation in the app.

## 1. Create a Replicate Account
1. Go to [replicate.com](https://replicate.com/).
2. Sign up with your GitHub account.

## 2. Get your API Key
1. Once logged in, click on your profile picture in the top left corner.
2. Select **"API tokens"** from the menu.
3. You will see a default token, or you can create a new one.
4. Click the **Copy** button next to your token (it starts with `r8_...`).

## 3. Add to Environment Variables
1. Open your project in your code editor.
2. Locate the `.env.local` file in the root directory.
3. Add a new line or update the existing one:
   ```bash
   REPLICATE_API_KEY=r8_your_copied_key_here
   ```
4. Save the file.

## 4. Restart the Server
1. If your development server is running, stop it (Ctrl+C).
2. Run `npm run dev` again to load the new environment variables.

## 5. Verify
1. Go to the app in your browser.
2. Create a new plan or regenerate an image.
3. You should now see AI-generated images instead of placeholders!
