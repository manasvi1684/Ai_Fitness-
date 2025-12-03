export interface Exercise {
    name: string;
    sets: number | string;
    reps: string;
    rest: string;
    notes?: string;
}

export interface WorkoutDay {
    day: string;
    exercises: Exercise[];
}

export interface DietPlan {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
}

export interface FitnessPlan {
    metadata?: {
        userName?: string;
        goal?: string;
        generatedAt?: string;
    };
    workoutPlan: WorkoutDay[];
    dietPlan: DietPlan;
    tips: string[];
}

export interface UserFormData {
    name: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
    goal: string;
    level: string;
    location: string;
    diet: string;
    extras: string;
}
