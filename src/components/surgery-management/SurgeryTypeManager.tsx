import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Clock, Users, Stethoscope } from "lucide-react";
import { useSurgeryStore } from "@/lib/store/surgeryStore";
import SurgeryTypeForm from "./SurgeryTypeForm";

const SurgeryTypeManager = () => {
  const [showTypeForm, setShowTypeForm] = React.useState(false);
  const { surgeryTypes } = useSurgeryStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Surgery Types</h3>
          <p className="text-sm text-muted-foreground">
            Manage surgery types and their requirements
          </p>
        </div>
        <Button onClick={() => setShowTypeForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Surgery Type
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {surgeryTypes.map((type) => (
            <Card key={type.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{type.name}</CardTitle>
                  <Badge variant="secondary">
                    {type.estimatedDuration} min
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Required Staff
                        </span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Surgeons: {type.requiredStaff.surgeons}</li>
                        <li>Nurses: {type.requiredStaff.nurses}</li>
                        <li>
                          Anesthesiologists:{" "}
                          {type.requiredStaff.anesthesiologists}
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Required Equipment
                        </span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {type.requiredEquipment.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Requirements
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Pre-op:</span>
                          <ul className="text-sm text-muted-foreground">
                            {type.preOpRequirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Post-op:</span>
                          <ul className="text-sm text-muted-foreground">
                            {type.postOpRequirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <SurgeryTypeForm open={showTypeForm} onOpenChange={setShowTypeForm} />
    </div>
  );
};

export default SurgeryTypeManager;
