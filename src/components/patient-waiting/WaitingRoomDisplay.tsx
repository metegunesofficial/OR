import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Calendar, Timer, AlertCircle, RefreshCw } from "lucide-react";
import { useSurgeryStore } from "@/lib/store/surgeryStore";
import { usePatientStore } from "@/lib/store/patientStore";

const WaitingRoomDisplay = () => {
  const { surgeries } = useSurgeryStore();
  const { patients } = usePatientStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-refresh data every minute
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      // In a real app, you would fetch new data here
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(refreshTimer);
  }, []);

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient
      ? `${patient.firstName} ${patient.lastName}`
      : "Unknown Patient";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = (startTime: string, endTime: string) => {
    if (startTime && endTime) {
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      const now = currentTime.getTime();
      const progress = ((now - start) / (end - start)) * 100;
      return Math.min(Math.max(progress, 0), 100);
    }
    return 0;
  };

  const getEstimatedTimeRemaining = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = currentTime.getTime();
    const diff = end - now;
    const minutes = Math.max(0, Math.floor(diff / (1000 * 60)));
    const hours = Math.floor(minutes / 60);
    return hours > 0
      ? `${hours}h ${minutes % 60}m remaining`
      : `${minutes}m remaining`;
  };

  const todaysSurgeries = surgeries
    .filter(
      (surgery) =>
        new Date(surgery.scheduledDate).toDateString() ===
        currentTime.toDateString(),
    )
    .sort((a, b) => {
      // Sort by status (in-progress first, then scheduled, then completed)
      const statusOrder = { "in-progress": 0, scheduled: 1, completed: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      // Then sort by start time
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Surgery Status Board</h1>
            <p className="text-muted-foreground">
              Real-time updates on today's surgeries
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-xl font-semibold">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Surgeries ({todaysSurgeries.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-6">
                {todaysSurgeries.map((surgery) => (
                  <Card key={surgery.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {getPatientName(surgery.patientId)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {surgery.operatingRoom}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(surgery.status)}
                          >
                            {surgery.status.charAt(0).toUpperCase() +
                              surgery.status.slice(1)}
                          </Badge>
                        </div>

                        {surgery.status === "in-progress" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>
                                {Math.round(
                                  calculateProgress(
                                    surgery.startTime,
                                    surgery.endTime,
                                  ),
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={calculateProgress(
                                surgery.startTime,
                                surgery.endTime,
                              )}
                            />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Timer className="h-4 w-4" />
                              {getEstimatedTimeRemaining(surgery.endTime)}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {surgery.startTime} - {surgery.endTime}
                            </span>
                          </div>
                          {surgery.status === "scheduled" && (
                            <div className="flex items-center gap-2 text-yellow-600">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm">
                                Estimated start in{" "}
                                {Math.round(
                                  (new Date(surgery.startTime).getTime() -
                                    currentTime.getTime()) /
                                    (1000 * 60),
                                )}{" "}
                                minutes
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {todaysSurgeries.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No surgeries scheduled for today
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaitingRoomDisplay;
