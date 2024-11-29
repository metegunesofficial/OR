import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSessionStore } from "@/lib/store/sessionStore";

const SessionTimeout = () => {
  const { currentSession, sessionTimeout, updateLastActivity } =
    useSessionStore();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!currentSession || currentSession.status !== "active") return;

    const checkTimeout = () => {
      const lastActivity = new Date(currentSession.lastActivity);
      const now = new Date();
      const diffMinutes =
        (now.getTime() - lastActivity.getTime()) / (1000 * 60);
      const warningThreshold = 2; // Show warning 2 minutes before timeout

      if (diffMinutes > sessionTimeout - warningThreshold) {
        setShowWarning(true);
        setTimeLeft(
          Math.max(0, Math.floor(sessionTimeout * 60 - diffMinutes * 60)),
        );
      } else {
        setShowWarning(false);
      }
    };

    const interval = setInterval(checkTimeout, 1000);
    return () => clearInterval(interval);
  }, [currentSession, sessionTimeout]);

  const handleContinue = () => {
    updateLastActivity();
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Timeout Warning</AlertDialogTitle>
          <AlertDialogDescription>
            Your session will expire in {Math.floor(timeLeft / 60)} minutes and{" "}
            {timeLeft % 60} seconds. Would you like to continue your session?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleContinue}>
            Continue Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionTimeout;
