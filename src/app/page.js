"use client";

import { useState } from "react";
import UserForm from "../components/UserForm";
import PlanDisplay from "../components/PlanDisplay";

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          AI Fitness Coach 💪
        </h1>

        <UserForm setPlan={setPlan} setLoading={setLoading} />

        {loading && (
          <p className="mt-4 text-center text-lg">Generating your plan…</p>
        )}

        {plan && (
          <div className="mt-8">
            <PlanDisplay plan={plan} />
          </div>
        )}
      </div>
    </main>
  );
}
