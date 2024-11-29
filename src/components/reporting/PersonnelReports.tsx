import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, TrendingUp, Users, Award } from "lucide-react";
import { useReportingStore } from "@/lib/store/reportingStore";
import { usePersonnelStore } from "@/lib/store/personnelStore";

const PersonnelReports = () => {
  const { performanceMetrics } = useReportingStore();
  const { staff } = usePersonnelStore();

  const getStaffName = (staffId: string) => {
    const member = staff.find((s) => s.id === staffId);
    return member ? member.name : "Unknown";
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return "bg-green-100 text-green-800";
    if (score >= 3) return "bg-blue-100 text-blue-800";
    if (score >= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            Personnel Performance Reports
          </h3>
          <p className="text-sm text-muted-foreground">
            Staff performance analysis and metrics
          </p>
        </div>
        <Button>
          <TrendingUp className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              Avg Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                (performanceMetrics.reduce((acc, m) => acc + m.successRate, 0) /
                  performanceMetrics.length) *
                100
              ).toFixed(1)}
              %
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                performanceMetrics.reduce(
                  (acc, m) => acc + m.teamworkScore,
                  0,
                ) / performanceMetrics.length
              ).toFixed(1)}
              /5
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4" />
              Efficiency Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                performanceMetrics.reduce(
                  (acc, m) => acc + m.efficiencyScore,
                  0,
                ) / performanceMetrics.length
              ).toFixed(1)}
              /5
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">
                      {getStaffName(metric.staffId)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Period: {metric.period} | Surgeries: {metric.surgeryCount}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="secondary"
                      className={getScoreColor(metric.efficiencyScore)}
                    >
                      Efficiency: {metric.efficiencyScore}/5
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={getScoreColor(metric.teamworkScore)}
                    >
                      Teamwork: {metric.teamworkScore}/5
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

export default PersonnelReports;
