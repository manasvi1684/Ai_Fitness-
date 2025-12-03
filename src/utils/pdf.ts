import jsPDF from "jspdf";
import { FitnessPlan } from "@/types";

export function exportPlanToPDF(plan: FitnessPlan) {
  const doc = new jsPDF();
  let y = 15;

  // ---------- HEADER ----------
  doc.setFontSize(20);
  doc.text("AI Fitness Plan", 10, y);
  y += 10;

  // ---------- WORKOUT PLAN ----------
  doc.setFontSize(16);
  doc.text("Workout Plan", 10, y);
  y += 8;

  const workout = plan.workoutPlan || [];

  workout.forEach((day, i) => {
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${day.day}`, 10, y);
    y += 6;

    (day.exercises || []).forEach((ex) => {
      let line = `• ${ex.name}`;
      if (ex.sets) line += ` — ${ex.sets} sets`;
      if (ex.reps) line += ` × ${ex.reps}`;
      if (ex.rest) line += ` (Rest: ${ex.rest})`;

      doc.setFontSize(10);
      doc.text(line, 14, y);
      y += 5;

      // Automatic page break
      if (y > 270) {
        doc.addPage();
        y = 15;
      }
    });

    y += 4;
  });

  // ---------- NEW PAGE ----------
  doc.addPage();
  y = 15;

  // ---------- DIET PLAN ----------
  doc.setFontSize(16);
  doc.text("Diet Plan", 10, y);
  y += 8;

  const diet = plan.dietPlan;

  if (diet) {
    (Object.keys(diet) as Array<keyof typeof diet>).forEach((meal) => {
      const mealName = String(meal);
      const pretty = mealName.charAt(0).toUpperCase() + mealName.slice(1);

      doc.setFontSize(13);
      doc.text(pretty, 10, y);
      y += 6;

      (diet[meal] || []).forEach((item) => {
        doc.setFontSize(10);
        doc.text(`• ${item}`, 14, y);
        y += 5;

        if (y > 270) {
          doc.addPage();
          y = 15;
        }
      });

      y += 4;
    });
  }

  // ---------- AI TIPS ----------
  doc.addPage();
  y = 15;

  doc.setFontSize(16);
  doc.text("AI Tips", 10, y);
  y += 8;

  const tips = plan.tips || [];

  tips.forEach((tip) => {
    doc.setFontSize(10);

    // Automatically wrap long text
    let lines = doc.splitTextToSize(`• ${tip}`, 180);
    doc.text(lines, 14, y);
    y += lines.length * 5;

    if (y > 270) {
      doc.addPage();
      y = 15;
    }
  });

  doc.save("ai-fitness-plan.pdf");
}
