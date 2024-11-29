import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Clock, Calendar } from "lucide-react";
import { usePersonnelStore } from "@/lib/store/personnelStore";

const ShiftPlanning = () => {
  const { staff, shifts } = usePersonnelStore();

  const getStaffMember = (staffId: string) => {
    return staff.find((s) => s.id === staffId);
  };

  const getShiftColor = (type: string) => {
    switch (type) {
      case "morning":
        return "bg-blue-100 text-blue-800";
      case "afternoon":
        return "bg-yellow-100 text-yellow-800";
      case "night":
        return "bg-purple-100 text-purple-800";
      case "on-call":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Shift Planning</h3>
          <p className="text-sm text-muted-foreground">
            Manage staff working hours and shifts
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Shift
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {shifts.map((shift) => {
            const staffMember = getStaffMember(shift.staffId);
            return (
              <Card key={shift.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {staffMember?.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={getShiftColor(shift.type)}
                    >
                      {shift.type.charAt(0).toUpperCase() + shift.type.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Date</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(shift.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Time</div>
                          <div className="text-sm text-muted-foreground">
                            {shift.startTime} - {shift.endTime}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Department:</div>
                      <div className="text-sm text-muted-foreground">
                        {shift.department}
                      </div>
                    </div>

                    <Badge
                      variant={
                        shift.status === "scheduled" ? "default" : "secondary"
                      }
                    >
                      {shift.status.charAt(0).toUpperCase() +
                        shift.status.slice(1)}
                    </Badge>
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

export default ShiftPlanning;
