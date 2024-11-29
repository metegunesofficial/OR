import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Thermometer, Gauge, User } from "lucide-react";
import { useSterilizationStore } from "@/lib/store/sterilizationStore";
import { usePersonnelStore } from "@/lib/store/personnelStore";

const SterilizationRecords = () => {
  const { sterilizationRecords } = useSterilizationStore();
  const { staff } = usePersonnelStore();

  const getStaffName = (staffId: string) => {
    const member = staff.find((s) => s.id === staffId);
    return member ? member.name : "Unknown";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            Equipment Sterilization Records
          </h3>
          <p className="text-sm text-muted-foreground">
            Track and manage equipment sterilization processes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {sterilizationRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Equipment #{record.equipmentId}
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
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Temperature</div>
                        <div className="text-sm text-muted-foreground">
                          {record.temperature}°C
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Pressure</div>
                        <div className="text-sm text-muted-foreground">
                          {record.pressure} PSI
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Operator</div>
                        <div className="text-sm text-muted-foreground">
                          {getStaffName(record.operatorId)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Start Time</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(record.startTime).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">End Time</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(record.endTime).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {record.notes && (
                    <div>
                      <div className="text-sm font-medium">Notes</div>
                      <div className="text-sm text-muted-foreground">
                        {record.notes}
                      </div>
                    </div>
                  )}

                  {record.validatedBy && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div>Validated by {getStaffName(record.validatedBy)}</div>
                      <div>
                        at {new Date(record.validatedAt).toLocaleString()}
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

export default SterilizationRecords;
