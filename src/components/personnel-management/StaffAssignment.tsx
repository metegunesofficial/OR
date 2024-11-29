import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Calendar, Users, Stethoscope } from "lucide-react";
import { usePersonnelStore } from "@/lib/store/personnelStore";
import { useSurgeryStore } from "@/lib/store/surgeryStore";

const StaffAssignment = () => {
  const { staff } = usePersonnelStore();
  const { surgeries } = useSurgeryStore();

  const upcomingSurgeries = surgeries.filter(
    (surgery) => surgery.status === "scheduled",
  );

  const getStaffName = (staffId: string) => {
    const member = staff.find((s) => s.id === staffId);
    return member ? member.name : "Unassigned";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Staff Assignments</h3>
          <p className="text-sm text-muted-foreground">
            Manage staff assignments for upcoming surgeries
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Assign Staff
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {upcomingSurgeries.map((surgery) => (
            <Card key={surgery.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Surgery #{surgery.id}
                  </CardTitle>
                  <Badge variant="outline">{surgery.operatingRoom}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(surgery.scheduledDate).toLocaleDateString()} |
                      {surgery.startTime} - {surgery.endTime}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Surgeons</span>
                      </div>
                      <div className="space-y-1">
                        {surgery.surgeons.map((surgeonId) => (
                          <div
                            key={surgeonId}
                            className="text-sm text-muted-foreground"
                          >
                            {getStaffName(surgeonId)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Nurses</span>
                      </div>
                      <div className="space-y-1">
                        {surgery.nurses.map((nurseId) => (
                          <div
                            key={nurseId}
                            className="text-sm text-muted-foreground"
                          >
                            {getStaffName(nurseId)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Anesthesiologist</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getStaffName(surgery.anesthesiologist)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StaffAssignment;
