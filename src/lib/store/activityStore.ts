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

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [
    {
      id: "1",
      action: "User Created",
      user: "Admin",
      target: "john@hospital.com",
      timestamp: new Date().toISOString(),
      details: "New surgeon account created",
      severity: "info",
    },
    {
      id: "2",
      action: "Surgery Scheduled",
      user: "Dr. Smith",
      target: "OR-1",
      timestamp: new Date().toISOString(),
      details: "Scheduled appendectomy for tomorrow",
      severity: "info",
    },
  ],
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
