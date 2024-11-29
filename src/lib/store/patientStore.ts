import { create } from "zustand";

export interface SurgicalHistory {
  id: string;
  date: string;
  procedure: string;
  surgeon: string;
  notes: string;
  complications?: string;
}

export interface SpecialCondition {
  id: string;
  condition: string;
  severity: "low" | "medium" | "high";
  notes: string;
  dateIdentified: string;
}

export interface PreopTask {
  id: string;
  task: string;
  completed: boolean;
  required: boolean;
  notes?: string;
  dueDate?: string;
}

export interface ConsentForm {
  id: string;
  type: string;
  signedDate: string;
  expiryDate?: string;
  documentUrl: string;
  status: "valid" | "expired" | "pending";
}

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  contactNumber: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  surgicalHistory: SurgicalHistory[];
  specialConditions: SpecialCondition[];
  preopTasks: PreopTask[];
  consentForms: ConsentForm[];
  status: "active" | "scheduled" | "completed" | "cancelled";
  upcomingSurgeryId?: string;
}

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  addPatient: (patient: Omit<Patient, "id">) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  setSelectedPatient: (patient: Patient | null) => void;
  addSurgicalHistory: (
    patientId: string,
    history: Omit<SurgicalHistory, "id">,
  ) => void;
  addSpecialCondition: (
    patientId: string,
    condition: Omit<SpecialCondition, "id">,
  ) => void;
  updatePreopTask: (
    patientId: string,
    taskId: string,
    completed: boolean,
  ) => void;
  addConsentForm: (patientId: string, form: Omit<ConsentForm, "id">) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [
    {
      id: "1",
      mrn: "MRN001",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1980-01-01",
      gender: "male",
      contactNumber: "+1234567890",
      email: "john.doe@email.com",
      address: "123 Main St, City, Country",
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "+1987654321",
      },
      surgicalHistory: [
        {
          id: "1",
          date: "2023-01-15",
          procedure: "Appendectomy",
          surgeon: "Dr. Smith",
          notes: "Successful procedure with no complications",
        },
      ],
      specialConditions: [
        {
          id: "1",
          condition: "Diabetes Type 2",
          severity: "medium",
          notes: "Well controlled with medication",
          dateIdentified: "2022-03-10",
        },
      ],
      preopTasks: [
        {
          id: "1",
          task: "Blood Work",
          completed: true,
          required: true,
          dueDate: "2024-02-01",
        },
      ],
      consentForms: [
        {
          id: "1",
          type: "General Surgery Consent",
          signedDate: "2024-01-15",
          documentUrl: "/documents/consent-1.pdf",
          status: "valid",
        },
      ],
      status: "scheduled",
    },
  ],
  selectedPatient: null,
  addPatient: (newPatient) =>
    set((state) => ({
      patients: [
        ...state.patients,
        { ...newPatient, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  updatePatient: (id, updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id ? { ...patient, ...updatedPatient } : patient,
      ),
    })),
  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    })),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  addSurgicalHistory: (patientId, history) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              surgicalHistory: [
                ...patient.surgicalHistory,
                { ...history, id: Math.random().toString(36).substr(2, 9) },
              ],
            }
          : patient,
      ),
    })),
  addSpecialCondition: (patientId, condition) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              specialConditions: [
                ...patient.specialConditions,
                { ...condition, id: Math.random().toString(36).substr(2, 9) },
              ],
            }
          : patient,
      ),
    })),
  updatePreopTask: (patientId, taskId, completed) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              preopTasks: patient.preopTasks.map((task) =>
                task.id === taskId ? { ...task, completed } : task,
              ),
            }
          : patient,
      ),
    })),
  addConsentForm: (patientId, form) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              consentForms: [
                ...patient.consentForms,
                { ...form, id: Math.random().toString(36).substr(2, 9) },
              ],
            }
          : patient,
      ),
    })),
}));
