"use client";

import { useState } from "react";

export default function UserForm({ setPlan, setLoading }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Female",
    height: "",
    weight: "",
    goal: "Weight Loss",
    level: "Beginner",
    location: "Home",
    diet: "Veg",
    extras: ""
  });

  function update(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setPlan(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert("Failed to generate plan");
        return;
      }

      setPlan(data);

      // Save to localStorage
      localStorage.setItem(
        "fitnessPlan",
        JSON.stringify({ form, plan: data, createdAt: new Date() })
      );

    } catch (err) {
      setLoading(false);
      alert("Error generating plan");
    }
  }

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          name="name"
          placeholder="Name"
          onChange={update}
          className="p-2 border rounded"
        />

        <input
          name="age"
          placeholder="Age"
          onChange={update}
          className="p-2 border rounded"
        />

        <select name="gender" onChange={update} className="p-2 border rounded">
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
        </select>

        <input
          name="height"
          placeholder="Height (cm)"
          onChange={update}
          className="p-2 border rounded"
        />

        <input
          name="weight"
          placeholder="Weight (kg)"
          onChange={update}
          className="p-2 border rounded"
        />

        <select name="goal" onChange={update} className="p-2 border rounded">
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Body Recomposition</option>
        </select>

        <select name="level" onChange={update} className="p-2 border rounded">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select name="location" onChange={update} className="p-2 border rounded">
          <option>Home</option>
          <option>Gym</option>
          <option>Outdoor</option>
        </select>

        <select name="diet" onChange={update} className="p-2 border rounded">
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>

        <input
          name="extras"
          placeholder="Medical history / Notes"
          onChange={update}
          className="p-2 border rounded col-span-2"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
      >
        Generate AI Plan
      </button>
    </form>
  );
}
