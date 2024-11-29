import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientTable from "./PatientTable";
import PatientDetails from "./PatientDetails";
import PatientForm from "./PatientForm";
import { usePatientStore } from "@/lib/store/patientStore";

const PatientManagement = () => {
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [selectedPatientId, setSelectedPatientId] = React.useState<
    string | null
  >(null);
  const { addPatient, deletePatient } = usePatientStore();

  const handleCreatePatient = (data: any) => {
    addPatient({
      ...data,
      mrn: `MRN${Math.floor(Math.random() * 10000)}`,
      surgicalHistory: [],
      specialConditions: [],
      preopTasks: [],
      consentForms: [],
      status: "active",
    });
    setShowCreateDialog(false);
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatientId(patient.id);
  };

  return (
    <div className="h-full">
      {selectedPatientId ? (
        <div className="h-full">
          <PatientDetails
            patientId={selectedPatientId}
            onBack={() => setSelectedPatientId(null)}
          />
        </div>
      ) : (
        <>
          <PatientTable
            onCreateNew={() => setShowCreateDialog(true)}
            onDelete={deletePatient}
            onView={handleViewPatient}
          />
          <PatientForm
            open={showCreateDialog}
            onOpenChange={setShowCreateDialog}
            onSubmit={handleCreatePatient}
          />
        </>
      )}
    </div>
  );
};

export default PatientManagement;
