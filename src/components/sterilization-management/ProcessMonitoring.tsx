import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Thermometer, Timer, AlertTriangle } from "lucide-react";
import { useSterilizationStore } from "@/lib/store/sterilizationStore";

const ProcessMonitoring = () => {
  const { sterilizationRecords } = useSterilizationStore();
  const activeProcesses = sterilizationRecords.filter(
    (record) => record.status === "in-progress",
  );

  const calculateProgress = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = Date.now();
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          Active Sterilization Processes
        </h3>
        <p className="text-sm text-muted-foreground">
          Monitor ongoing sterilization processes in real-time
        </p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {activeProcesses.map((process) => (
            <Card key={process.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Equipment #{process.equipmentId}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {process.processType.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {Math.round(
                          calculateProgress(process.startTime, process.endTime),
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={calculateProgress(
                        process.startTime,
                        process.endTime,
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">
                          Remaining Time
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round(
                            (new Date(process.endTime).getTime() - Date.now()) /
                              60000,
                          )}{" "}
                          minutes
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Temperature</div>
                        <div className="text-sm text-muted-foreground">
                          {process.temperature}°C
                        </div>
                      </div>
                    </div>

                    {process.parameters.alerts?.length > 0 && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle className="h-4 w-4" />
                        <div className="text-sm">
                          {process.parameters.alerts.length} Alerts
                        </div>
                      </div>
                    )}
                  </div>

                  {process.parameters.alerts?.length > 0 && (
                    <div className="space-y-2 border-t pt-4">
                      <div className="text-sm font-medium">Active Alerts</div>
                      <div className="space-y-1">
                        {process.parameters.alerts.map((alert, index) => (
                          <div key={index} className="text-sm text-yellow-600">
                            • {alert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {activeProcesses.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No active sterilization processes
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProcessMonitoring;
