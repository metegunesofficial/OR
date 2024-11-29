import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, AlertTriangle, Activity, Heart } from "lucide-react";
import { useReportingStore } from "@/lib/store/reportingStore";

const SurgeryReports = () => {
  const { surgeryMetrics } = useReportingStore();

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "complications":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Surgery Performance Reports</h3>
          <p className="text-sm text-muted-foreground">
            Detailed analysis of surgical procedures and outcomes
          </p>
        </div>
        <Button>
          <Activity className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                (surgeryMetrics.filter((m) => m.outcome === "successful")
                  .length /
                  surgeryMetrics.length) *
                100
              ).toFixed(1)}
              %
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                surgeryMetrics.reduce((acc, m) => acc + m.duration, 0) /
                surgeryMetrics.length
              ).toFixed(0)}{" "}
              min
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Complication Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                (surgeryMetrics.filter((m) => m.complications.length > 0)
                  .length /
                  surgeryMetrics.length) *
                100
              ).toFixed(1)}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Surgeries</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {surgeryMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">
                      Surgery #{metric.surgeryId}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration: {metric.duration} min | Recovery:{" "}
                      {metric.recoveryTime}h
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Cost: ${metric.materialCost}
                    </div>
                    <Badge
                      variant="secondary"
                      className={getOutcomeColor(metric.outcome)}
                    >
                      {metric.outcome.charAt(0).toUpperCase() +
                        metric.outcome.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurgeryReports;
