"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";
import AudioPlayer from "./AudioPlayer";
import { exportPlanToPDF } from "../utils/pdf";

export default function PlanDisplay({ plan }) {
  const [imagePrompt, setImagePrompt] = useState(null);

  if (!plan) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your AI Fitness Plan</h2>

        <div className="flex gap-3">
          <AudioPlayer text={JSON.stringify(plan)} />
          <button
            onClick={() => exportPlanToPDF(plan)}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Workout Section */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Workout Plan</h3>

        {plan.workoutPlan.map((day, i) => (
          <div key={i} className="border-t pt-3 mt-3">
            <h4 className="font-bold">{day.day}</h4>

            {day.exercises.map((ex, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b"
              >
                <div>
                  <div className="font-medium">{ex.name}</div>
                  <div className="text-sm text-gray-500">
                    {ex.sets} sets • {ex.reps} reps • Rest {ex.rest}
                  </div>
                </div>

                <button
                  onClick={() => setImagePrompt(ex.name)}
                  className="px-3 py-1 text-sm border rounded"
                >
                  Image
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Diet Section */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Diet Plan</h3>

        {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
          <div key={meal} className="border-t pt-3 mt-3">
            <h4 className="font-bold capitalize">{meal}</h4>

            {plan.dietPlan[meal].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                </div>

                <button
                  onClick={() => setImagePrompt(item.name)}
                  className="px-3 py-1 text-sm border rounded"
                >
                  Image
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">AI Tips</h3>

        <ul className="list-disc pl-5">
          {plan.tips.map((tip, i) => (
            <li key={i} className="mb-1">
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Image Modal */}
      {imagePrompt && (
        <ImageModal prompt={imagePrompt} onClose={() => setImagePrompt(null)} />
      )}
    </div>
  );
}
