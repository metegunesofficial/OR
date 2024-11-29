import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Session {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  startTime: string;
  lastActivity: string;
  ipAddress: string;
  deviceInfo: string;
  status: "active" | "expired" | "terminated";
}

interface SessionState {
  currentSession: Session | null;
  activeSessions: Session[];
  sessionTimeout: number; // in minutes
  initializeSession: (userData: {
    id: string;
    name: string;
    role: string;
  }) => void;
  updateLastActivity: () => void;
  terminateSession: (sessionId: string) => void;
  clearSession: () => void;
  setSessionTimeout: (minutes: number) => void;
}

export const useSessionStore = create<SessionState>(
  persist(
    (set, get) => ({
      currentSession: null,
      activeSessions: [],
      sessionTimeout: 30, // 30 minutes default

      initializeSession: (userData) => {
        const newSession: Session = {
          id: Math.random().toString(36).substr(2, 9),
          userId: userData.id,
          userName: userData.name,
          userRole: userData.role,
          startTime: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          ipAddress: "127.0.0.1", // In a real app, get from the server
          deviceInfo: navigator.userAgent,
          status: "active",
        };

        set((state) => ({
          currentSession: newSession,
          activeSessions: [...state.activeSessions, newSession],
        }));
      },

      updateLastActivity: () => {
        const currentSession = get().currentSession;
        if (currentSession) {
          const updatedSession = {
            ...currentSession,
            lastActivity: new Date().toISOString(),
          };

          set((state) => ({
            currentSession: updatedSession,
            activeSessions: state.activeSessions.map((session) =>
              session.id === currentSession.id ? updatedSession : session,
            ),
          }));
        }
      },

      terminateSession: (sessionId) => {
        set((state) => ({
          activeSessions: state.activeSessions.map((session) =>
            session.id === sessionId
              ? { ...session, status: "terminated" as const }
              : session,
          ),
          currentSession:
            state.currentSession?.id === sessionId
              ? { ...state.currentSession, status: "terminated" as const }
              : state.currentSession,
        }));
      },

      clearSession: () => {
        set({ currentSession: null });
      },

      setSessionTimeout: (minutes) => {
        set({ sessionTimeout: minutes });
      },
    }),
    {
      name: "session-storage",
      partialize: (state) => ({
        sessionTimeout: state.sessionTimeout,
        activeSessions: state.activeSessions,
      }),
    },
  ),
);

// Session activity tracker
setInterval(() => {
  const { currentSession, sessionTimeout, terminateSession } =
    useSessionStore.getState();

  if (currentSession && currentSession.status === "active") {
    const lastActivity = new Date(currentSession.lastActivity);
    const now = new Date();
    const diffMinutes = (now.getTime() - lastActivity.getTime()) / (1000 * 60);

    if (diffMinutes > sessionTimeout) {
      terminateSession(currentSession.id);
    }
  }
}, 60000); // Check every minute
