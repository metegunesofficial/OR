import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, AlertTriangle, History } from "lucide-react";
import { useSurgeryStore } from "@/lib/store/surgeryStore";
import { usePatientStore } from "@/lib/store/patientStore";

const SurgeryCancellations = () => {
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

  const cancelledSurgeries = surgeries.filter(
    (surgery) => surgery.status === "cancelled",
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Cancelled Surgeries</h3>
        <p className="text-sm text-muted-foreground">
          View cancelled surgeries and their reasons
        </p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {cancelledSurgeries.map((surgery) => (
            <Card key={surgery.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{getPatientName(surgery.patientId)}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {getSurgeryTypeName(surgery.surgeryTypeId)}
                    </div>
                  </div>
                  <Badge variant="destructive">Cancelled</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">
                          Originally Scheduled For
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(surgery.scheduledDate).toLocaleDateString()}{" "}
                          {surgery.startTime} - {surgery.endTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Last Updated</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(surgery.updatedAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-red-50 p-4 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-700">
                        Cancellation Reason
                      </div>
                      <p className="text-sm text-red-600">
                        {surgery.cancellationReason}
                      </p>
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

export default SurgeryCancellations;
