import { FitnessPlan, UserFormData } from "@/types";

const EXERCISES = {
    "Weight Loss": [
        { name: "Burpees", sets: 3, reps: "15", rest: "60s", notes: "Explosive movement" },
        { name: "Jump Squats", sets: 3, reps: "20", rest: "60s", notes: "Land softly" },
        { name: "Mountain Climbers", sets: 3, reps: "40s", rest: "45s", notes: "Keep pace up" },
        { name: "High Knees", sets: 3, reps: "45s", rest: "45s", notes: "Drive knees high" },
    ],
    "Muscle Gain": [
        { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s", notes: "Focus on chest" },
        { name: "Deadlifts", sets: 3, reps: "5", rest: "120s", notes: "Keep back straight" },
        { name: "Pull-ups", sets: 3, reps: "Max", rest: "90s", notes: "Full range of motion" },
        { name: "Overhead Press", sets: 3, reps: "8-12", rest: "90s", notes: "Core tight" },
    ],
    "General Health": [
        { name: "Push-ups", sets: 3, reps: "12", rest: "60s", notes: "Keep body aligned" },
        { name: "Bodyweight Squats", sets: 3, reps: "15", rest: "60s", notes: "Deep squat" },
        { name: "Lunges", sets: 3, reps: "12/leg", rest: "60s", notes: "Knee shouldn't pass toe" },
        { name: "Plank", sets: 3, reps: "45s", rest: "45s", notes: "Engage core" },
    ]
};

const MEALS: Record<string, { breakfast: string[], lunch: string[], dinner: string[], snacks: string[] }> = {
    "Veg": {
        breakfast: ["Oatmeal with berries", "Greek Yogurt Parfait", "Avocado Toast", "Smoothie Bowl", "Pancakes"],
        lunch: ["Quinoa Bowl", "Lentil Soup", "Caprese Salad", "Veggie Wrap", "Chickpea Curry"],
        dinner: ["Stir-fry Tofu", "Vegetable Pasta", "Stuffed Bell Peppers", "Mushroom Risotto", "Dal Tadka"],
        snacks: ["Almonds", "Apple slices", "Carrot sticks", "Cottage Cheese", "Fruit Salad"]
    },
    "Non-Veg": {
        breakfast: ["Scrambled Eggs & Toast", "Omelette", "Chicken Sausage", "Bacon & Eggs", "Protein Smoothie"],
        lunch: ["Grilled Chicken Salad", "Turkey Wrap", "Tuna Sandwich", "Chicken Burrito", "Beef Stir-fry"],
        dinner: ["Steamed Fish & Veggies", "Grilled Salmon", "Baked Chicken Breast", "Lean Steak with Salad", "Shrimp Pasta"],
        snacks: ["Protein Bar", "Jerky", "Boiled Eggs", "Greek Yogurt", "String Cheese"]
    },
    "Vegan": {
        breakfast: ["Oatmeal with Almond Milk", "Tofu Scramble", "Chia Pudding", "Fruit Smoothie", "Avocado Toast"],
        lunch: ["Buddha Bowl", "Vegan Burrito", "Falafel Wrap", "Lentil Soup", "Chickpea Salad"],
        dinner: ["Lentil Curry", "Vegan Chili", "Zucchini Noodles", "Stir-fry Vegetables", "Black Bean Burger"],
        snacks: ["Nuts", "Fruit", "Hummus & Veggies", "Rice Cakes", "Dark Chocolate"]
    },
    "Keto": {
        breakfast: ["Bacon & Eggs", "Omelette with Cheese", "Avocado & Salmon", "Keto Coffee", "Chia Pudding"],
        lunch: ["Chicken Caesar Salad (No Croutons)", "Tuna Salad Lettuce Wraps", "Burger Patty with Cheese", "Cobb Salad", "Zucchini Noodles with Pesto"],
        dinner: ["Grilled Salmon with Asparagus", "Steak with Broccoli", "Baked Chicken Thighs", "Pork Chops with Cauliflower Mash", "Shrimp Scampi"],
        snacks: ["Cheese Slices", "Macadamia Nuts", "Pork Rinds", "Hard Boiled Eggs", "Avocado"]
    },
    "Paleo": {
        breakfast: ["Scrambled Eggs with Spinach", "Sweet Potato Hash", "Fruit Salad", "Paleo Pancakes", "Smoked Salmon"],
        lunch: ["Grilled Chicken Salad", "Turkey Lettuce Wraps", "Butternut Squash Soup", "Beef & Veggie Stir-fry", "Salmon Salad"],
        dinner: ["Roast Chicken with Root Veggies", "Grilled Steak with Sweet Potato", "Baked Fish with Lemon", "Zucchini Noodles with Meatballs", "Shepherd's Pie (Sweet Potato Top)"],
        snacks: ["Almonds", "Fruit", "Jerky", "Hard Boiled Eggs", "Apple slices with Almond Butter"]
    }
};

const TIPS = [
    "Stay hydrated throughout the day.",
    "Consistency is key to seeing results.",
    "Get at least 7-8 hours of sleep.",
    "Don't skip your warm-up routine.",
    "Listen to your body and rest when needed.",
    "Track your progress weekly.",
    "Focus on form over weight."
];

function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export function generateStubPlan(user: UserFormData): FitnessPlan {
    // Select exercises based on goal, fallback to General Health
    const goalKey = (user.goal === "Weight Loss" || user.goal === "Muscle Gain") ? user.goal : "General Health";
    const exercisePool = EXERCISES[goalKey];

    // Select meals based on diet, fallback to Veg if undefined or not found
    // Note: The form sends "Veg", "Non-Veg", "Vegan", "Keto", "Paleo"
    const dietKey = user.diet || "Veg";
    const mealPool = MEALS[dietKey] || MEALS["Veg"];

    return {
        metadata: {
            userName: user.name,
            goal: user.goal,
            generatedAt: new Date().toISOString(),
        },
        workoutPlan: Array.from({ length: 7 }).map((_, i) => ({
            day: `Day ${i + 1}`,
            exercises: getRandomItems(exercisePool, 3), // Pick 3 random exercises per day
        })),
        dietPlan: {
            breakfast: getRandomItems(mealPool.breakfast, 2),
            lunch: getRandomItems(mealPool.lunch, 2),
            dinner: getRandomItems(mealPool.dinner, 2),
            snacks: getRandomItems(mealPool.snacks, 2),
        },
        tips: getRandomItems(TIPS, 3),
    };
}
