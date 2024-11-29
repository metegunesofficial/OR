import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Clock, Users, AlertTriangle, ExternalLink } from "lucide-react";
import { useSurgeryStore } from "@/lib/store/surgeryStore";
import { usePatientStore } from "@/lib/store/patientStore";
import SurgeryScheduleForm from "./SurgeryScheduleForm";

const SurgeryScheduler = () => {
  const [showScheduleForm, setShowScheduleForm] = React.useState(false);
  const { surgeries, surgeryTypes } = useSurgeryStore();
  const { patients } = usePatientStore();

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient
      ? `${patient.firstName} ${patient.lastName}`
      : "Unknown Patient";
  };

  const getSurgeryTypeName = (typeId: string) => {
    const type = surgeryTypes.find((t) => t.id === typeId);
    return type ? type.name : "Unknown Surgery Type";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500";
      case "in-progress":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const openWaitingRoom = () => {
    window.open("/waiting-room", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Scheduled Surgeries</h3>
          <p className="text-sm text-muted-foreground">
            View and manage upcoming surgical procedures
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={openWaitingRoom}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open Waiting Room Display
          </Button>
          <Button onClick={() => setShowScheduleForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Surgery
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {surgeries.map((surgery) => (
            <Card key={surgery.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{getPatientName(surgery.patientId)}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {getSurgeryTypeName(surgery.surgeryTypeId)}
                    </div>
                  </div>
                  <Badge className={getStatusColor(surgery.status)}>
                    {surgery.status.charAt(0).toUpperCase() +
                      surgery.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {new Date(surgery.scheduledDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {surgery.startTime} - {surgery.endTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {surgery.surgeons.join(", ")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {surgery.operatingRoom}
                      </div>
                    </div>
                  </div>
                  {surgery.status === "cancelled" && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <div className="text-sm text-red-500">
                        {surgery.cancellationReason}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <SurgeryScheduleForm
        open={showScheduleForm}
        onOpenChange={setShowScheduleForm}
      />
    </div>
  );
};

export default SurgeryScheduler;
