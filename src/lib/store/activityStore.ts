import { create } from "zustand";

export interface ActivityLogEntry {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  details: string;
  severity: "info" | "warning" | "error";
}

interface ActivityState {
  activities: ActivityLogEntry[];
  addActivity: (activity: Omit<ActivityLogEntry, "id" | "timestamp">) => void;
  clearActivities: () => void;
}

const initialActivities: ActivityLogEntry[] = [
  {
    id: "1",
    action: "System Initialized",
    user: "System",
    target: "Application",
    timestamp: new Date().toISOString(),
    details: "Application started successfully",
    severity: "info",
  },
];

export const useActivityStore = create<ActivityState>((set) => ({
  activities: initialActivities,

  addActivity: (newActivity) =>
    set((state) => ({
      activities: [
        {
          ...newActivity,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        },
        ...state.activities,
      ],
    })),

  clearActivities: () => set({ activities: [] }),
}));
