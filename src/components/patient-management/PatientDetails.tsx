import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  AlertTriangle,
  Clock,
  ClipboardCheck,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { usePatientStore } from "@/lib/store/patientStore";

interface PatientDetailsProps {
  patientId: string;
  onBack?: () => void;
}

const PatientDetails = ({
  patientId,
  onBack = () => {},
}: PatientDetailsProps) => {
  const { patients, updatePreopTask } = usePatientStore();
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) return null;

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">
              MRN: {patient.mrn} | DOB:{" "}
              {new Date(patient.dateOfBirth).toLocaleDateString()}
            </p>
          </div>
          <Badge
            variant={patient.status === "scheduled" ? "default" : "secondary"}
            className="text-sm"
          >
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="history" className="p-6">
        <TabsList>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Surgical History
          </TabsTrigger>
          <TabsTrigger value="conditions" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Special Conditions
          </TabsTrigger>
          <TabsTrigger value="preop" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Preop Tasks
          </TabsTrigger>
          <TabsTrigger value="consent" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Consent Forms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Surgical History</h3>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Procedure
            </Button>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {patient.surgicalHistory.map((surgery) => (
                <Card key={surgery.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      {surgery.procedure}
                      <span className="text-sm text-muted-foreground">
                        {new Date(surgery.date).toLocaleDateString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Surgeon: {surgery.surgeon}
                    </p>
                    <p className="text-sm">{surgery.notes}</p>
                    {surgery.complications && (
                      <p className="text-sm text-red-500 mt-2">
                        Complications: {surgery.complications}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="conditions" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Special Conditions</h3>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Condition
            </Button>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {patient.specialConditions.map((condition) => (
                <Card key={condition.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {condition.condition}
                        <Badge
                          variant="outline"
                          className={
                            {
                              "bg-red-100 text-red-800":
                                condition.severity === "high",
                              "bg-yellow-100 text-yellow-800":
                                condition.severity === "medium",
                              "bg-blue-100 text-blue-800":
                                condition.severity === "low",
                            }[condition.severity]
                          }
                        >
                          {condition.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Identified:{" "}
                        {new Date(
                          condition.dateIdentified,
                        ).toLocaleDateString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{condition.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="preop" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Preoperative Tasks</h3>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Task
            </Button>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {patient.preopTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) =>
                          updatePreopTask(
                            patient.id,
                            task.id,
                            checked as boolean,
                          )
                        }
                      />
                      <div>
                        <p className="font-medium">{task.task}</p>
                        {task.notes && (
                          <p className="text-sm text-muted-foreground">
                            {task.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="consent" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Consent Forms</h3>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Upload Form
            </Button>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {patient.consentForms.map((form) => (
                <Card key={form.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{form.type}</p>
                      <p className="text-sm text-muted-foreground">
                        Signed: {new Date(form.signedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          {
                            valid: "default",
                            expired: "destructive",
                            pending: "secondary",
                          }[form.status]
                        }
                      >
                        {form.status.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetails;
