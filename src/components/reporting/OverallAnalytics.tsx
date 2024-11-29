import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Download,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import { useReportingStore } from "@/lib/store/reportingStore";

const OverallAnalytics = () => {
  const { analyticsReports } = useReportingStore();
  const latestReport = analyticsReports[analyticsReports.length - 1];

  const getMetricColor = (value: number, threshold: number) => {
    return value >= threshold
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getMetricIcon = (value: number, threshold: number) => {
    return value >= threshold ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            Overall Performance Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive analysis across all departments
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Surgery Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {(latestReport?.metrics?.surgerySuccess * 100).toFixed(1)}%
              </div>
              <Badge
                variant="secondary"
                className={getMetricColor(
                  latestReport?.metrics?.surgerySuccess || 0,
                  0.9,
                )}
              >
                {getMetricIcon(latestReport?.metrics?.surgerySuccess || 0, 0.9)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Staff Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {(latestReport?.metrics?.staffEfficiency * 100).toFixed(1)}%
              </div>
              <Badge
                variant="secondary"
                className={getMetricColor(
                  latestReport?.metrics?.staffEfficiency || 0,
                  0.85,
                )}
              >
                {getMetricIcon(
                  latestReport?.metrics?.staffEfficiency || 0,
                  0.85,
                )}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Material Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {(latestReport?.metrics?.materialUtilization * 100).toFixed(1)}%
              </div>
              <Badge
                variant="secondary"
                className={getMetricColor(
                  latestReport?.metrics?.materialUtilization || 0,
                  0.8,
                )}
              >
                {getMetricIcon(
                  latestReport?.metrics?.materialUtilization || 0,
                  0.8,
                )}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Insights</h4>
              <div className="space-y-2">
                {latestReport?.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <TrendingUp className="h-4 w-4 mt-0.5" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recommendations</h4>
              <div className="space-y-2">
                {latestReport?.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    <span>{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverallAnalytics;
