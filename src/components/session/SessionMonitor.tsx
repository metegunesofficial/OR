import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Monitor, Clock, X, RefreshCcw } from "lucide-react";
import { useSessionStore } from "@/lib/store/sessionStore";

const SessionMonitor = () => {
  const { activeSessions, terminateSession, updateLastActivity } =
    useSessionStore();

  // Update current session activity every minute
  useEffect(() => {
    const interval = setInterval(() => {
      updateLastActivity();
    }, 60000);

    return () => clearInterval(interval);
  }, [updateLastActivity]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "expired":
        return "bg-yellow-500";
      case "terminated":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDuration = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          <CardTitle>Active Sessions</CardTitle>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateLastActivity()}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{session.userName}</span>
                    <Badge variant="secondary">{session.userRole}</Badge>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(session.status)}
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-4">
                      <span>{session.ipAddress}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(session.startTime)}
                      </div>
                    </div>
                  </div>
                </div>
                {session.status === "active" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => terminateSession(session.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SessionMonitor;
