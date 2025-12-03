"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";
import AudioPlayer from "./AudioPlayer";
import { exportPlanToPDF } from "../utils/pdf";
import { FitnessPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, RefreshCw, Download, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanDisplayProps {
  plan: FitnessPlan;
  onRegenerate?: () => void;
}

export default function PlanDisplay({ plan, onRegenerate }: PlanDisplayProps) {
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("workout");

  if (!plan) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatPlanForTTS = (plan: FitnessPlan) => {
    const { metadata, workoutPlan, dietPlan, tips } = plan;
    const name = metadata?.userName || "Friend";
    const goal = metadata?.goal || "fitness";

    let script = `Hi ${name}, welcome to your personalized ${goal} plan. \n\n`;

    script += "Let's start with your workout routine. \n";
    // Summarize just the first few days to avoid being too long, or group them
    const uniqueExercises = Array.from(new Set(workoutPlan.flatMap(d => d.exercises.map(e => e.name)))).slice(0, 5);
    script += `Your week focuses on exercises like ${uniqueExercises.join(", ")}, and more. \n`;

    script += "For your nutrition, here is what a typical day looks like: \n";
    script += `Breakfast: ${dietPlan.breakfast.join(" or ")}. \n`;
    script += `Lunch: ${dietPlan.lunch.join(" or ")}. \n`;
    script += `Dinner: ${dietPlan.dinner.join(" or ")}. \n`;

    script += "\nHere are some expert tips for you: \n";
    tips.forEach(tip => script += `${tip} \n`);

    script += "\nYou've got this! Let's get started.";
    return script;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your AI Fitness Plan
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Personalized for {plan.metadata?.userName || "you"} • {plan.metadata?.goal}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <AudioPlayer text={formatPlanForTTS(plan)} />

          <Button variant="outline" onClick={() => exportPlanToPDF(plan)}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>

          {onRegenerate && (
            <Button variant="secondary" onClick={onRegenerate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          )}
        </div>
      </div>

      {/* Workout Section */}
      <Card className="overflow-hidden border-l-4 border-l-blue-500">
        <div
          className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleSection("workout")}
        >
          <CardTitle className="text-xl flex items-center">
            🏋️ Workout Routine
          </CardTitle>
          {expandedSection === "workout" ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedSection === "workout" && (
          <CardContent className="pt-0 pb-6 animate-in slide-in-from-top-2">
            <div className="space-y-6">
              {plan.workoutPlan.map((day, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400 border-b pb-2">
                    {day.day}
                  </h4>
                  <div className="space-y-3">
                    {day.exercises.map((ex, idx) => (
                      <div key={idx} className="flex justify-between items-start group">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {ex.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            <span className="inline-block bg-white dark:bg-gray-800 px-2 py-0.5 rounded border text-xs mr-2">
                              {ex.sets} sets
                            </span>
                            <span className="inline-block bg-white dark:bg-gray-800 px-2 py-0.5 rounded border text-xs mr-2">
                              {ex.reps} reps
                            </span>
                            <span className="inline-block bg-white dark:bg-gray-800 px-2 py-0.5 rounded border text-xs">
                              {ex.rest} rest
                            </span>
                          </div>
                          {ex.notes && (
                            <p className="text-xs text-gray-400 mt-1 italic">
                              Note: {ex.notes}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImagePrompt(`Professional fitness photography of ${ex.name} exercise demonstration, athletic form, modern gym environment with cinematic lighting, 8k resolution, highly detailed, photorealistic`);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Diet Section */}
      <Card className="overflow-hidden border-l-4 border-l-green-500">
        <div
          className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleSection("diet")}
        >
          <CardTitle className="text-xl flex items-center">
            🥗 Nutrition Plan
          </CardTitle>
          {expandedSection === "diet" ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedSection === "diet" && (
          <CardContent className="pt-0 pb-6 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(["breakfast", "lunch", "dinner", "snacks"] as const).map((meal) => (
                <div key={meal} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-bold capitalize text-green-600 dark:text-green-400 mb-3 border-b pb-2">
                    {meal}
                  </h4>
                  <ul className="space-y-2">
                    {plan.dietPlan[meal].map((item, i) => (
                      <li key={i} className="flex justify-between items-center group text-sm">
                        <span>• {item}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setImagePrompt(`Professional food photography of ${item}, gourmet plating, soft natural lighting, fresh ingredients, 8k resolution, highly detailed, appetizing`)}
                        >
                          <ImageIcon className="h-3 w-3 text-green-500" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tips Section */}
      <Card className="overflow-hidden border-l-4 border-l-purple-500">
        <div
          className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleSection("tips")}
        >
          <CardTitle className="text-xl flex items-center">
            💡 Expert Tips
          </CardTitle>
          {expandedSection === "tips" ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedSection === "tips" && (
          <CardContent className="pt-0 pb-6 animate-in slide-in-from-top-2">
            <ul className="space-y-3">
              {plan.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <span className="text-purple-600 font-bold text-lg">#{i + 1}</span>
                  <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* Image Modal */}
      {imagePrompt && (
        <ImageModal prompt={imagePrompt} onClose={() => setImagePrompt(null)} />
      )}
    </div>
  );
}
