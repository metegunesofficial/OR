import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Star, TrendingUp, Target } from "lucide-react";
import { usePersonnelStore } from "@/lib/store/personnelStore";

const PerformanceEvaluation = () => {
  const { staff, performances } = usePersonnelStore();

  const getStaffMember = (staffId: string) => {
    return staff.find((s) => s.id === staffId);
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
          <h3 className="text-lg font-semibold">Performance Evaluations</h3>
          <p className="text-sm text-muted-foreground">
            Review and manage staff performance evaluations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Evaluation
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {performances.map((performance) => {
            const staffMember = getStaffMember(performance.staffId);
            const evaluator = getStaffMember(performance.evaluatorId);

            return (
              <Card key={performance.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {staffMember?.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={getScoreColor(performance.overallScore)}
                    >
                      Score: {performance.overallScore.toFixed(1)}/5
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">
                          Evaluation Period
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {performance.period}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Evaluator</div>
                        <div className="text-sm text-muted-foreground">
                          {evaluator?.name}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Key Strengths</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {performance.strengths.map((strength, index) => (
                          <Badge key={index} variant="secondary">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          Areas for Improvement
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {performance.improvements.map((improvement, index) => (
                          <Badge key={index} variant="outline">
                            {improvement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Goals</span>
                      </div>
                      <div className="space-y-1">
                        {performance.goals.map((goal, index) => (
                          <div
                            key={index}
                            className="text-sm text-muted-foreground"
                          >
                            • {goal}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PerformanceEvaluation;
