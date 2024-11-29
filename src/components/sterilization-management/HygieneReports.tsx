import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Star, AlertTriangle, Calendar } from "lucide-react";
import { useSterilizationStore } from "@/lib/store/sterilizationStore";
import { usePersonnelStore } from "@/lib/store/personnelStore";

const HygieneReports = () => {
  const { hygieneAudits } = useSterilizationStore();
  const { staff } = usePersonnelStore();

  const getStaffName = (staffId: string) => {
    const member = staff.find((s) => s.id === staffId);
    return member ? member.name : "Unknown";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Hygiene Audit Reports</h3>
          <p className="text-sm text-muted-foreground">
            Review hygiene audit findings and recommendations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Audit
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {hygieneAudits.map((audit) => (
            <Card key={audit.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{audit.area}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getScoreColor(audit.score)}
                    >
                      Score: {audit.score}%
                    </Badge>
                    <Badge
                      variant={
                        audit.status === "closed" ? "secondary" : "default"
                      }
                    >
                      {audit.status.charAt(0).toUpperCase() +
                        audit.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Auditor</div>
                        <div className="text-sm text-muted-foreground">
                          {getStaffName(audit.auditorId)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Audit Date</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(audit.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {audit.findings.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Findings</div>
                      <div className="space-y-2">
                        {audit.findings.map((finding, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-2 border rounded"
                          >
                            <AlertTriangle
                              className={`h-4 w-4 mt-0.5 ${getSeverityColor(
                                finding.severity,
                              )}`}
                            />
                            <div>
                              <div className="font-medium">
                                {finding.category}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {finding.observation}
                              </div>
                              {finding.action && (
                                <div className="text-sm text-blue-600 mt-1">
                                  Action: {finding.action}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {audit.recommendations.length > 0 && (
                    <div className="space-y-2 border-t pt-4">
                      <div className="text-sm font-medium">Recommendations</div>
                      <div className="space-y-1">
                        {audit.recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="text-sm text-muted-foreground"
                          >
                            • {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {audit.followUpDate && (
                    <div className="text-sm text-blue-600">
                      Follow-up scheduled for{" "}
                      {new Date(audit.followUpDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HygieneReports;
