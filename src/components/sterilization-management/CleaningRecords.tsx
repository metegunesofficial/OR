import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, User, Clock, CheckCircle2 } from "lucide-react";
import { useSterilizationStore } from "@/lib/store/sterilizationStore";
import { usePersonnelStore } from "@/lib/store/personnelStore";

const CleaningRecords = () => {
  const { cleaningRecords } = useSterilizationStore();
  const { staff } = usePersonnelStore();

  const getStaffName = (staffId: string) => {
    const member = staff.find((s) => s.id === staffId);
    return member ? member.name : "Unknown";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "verified":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            Operating Room Cleaning Records
          </h3>
          <p className="text-sm text-muted-foreground">
            Track and verify operating room cleaning procedures
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {cleaningRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Room #{record.roomId}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={getStatusColor(record.status)}
                  >
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Cleaner</div>
                        <div className="text-sm text-muted-foreground">
                          {getStaffName(record.cleanerId)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Shift</div>
                        <div className="text-sm text-muted-foreground">
                          {record.shift.charAt(0).toUpperCase() +
                            record.shift.slice(1)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Supervisor</div>
                        <div className="text-sm text-muted-foreground">
                          {getStaffName(record.supervisorId)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Checklist</div>
                    <div className="space-y-2">
                      {record.checklist.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2 border rounded"
                        >
                          <Checkbox checked={item.completed} disabled />
                          <div>
                            <div className="text-sm">{item.task}</div>
                            {item.notes && (
                              <div className="text-sm text-muted-foreground">
                                {item.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {record.verifiedBy && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div>Verified by {getStaffName(record.verifiedBy)}</div>
                      <div>
                        at {new Date(record.verifiedAt).toLocaleString()}
                      </div>
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

export default CleaningRecords;
