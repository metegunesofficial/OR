import { create } from "zustand";

export interface SurgeryType {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number; // in minutes
  requiredEquipment: string[];
  requiredStaff: {
    surgeons: number;
    nurses: number;
    anesthesiologists: number;
  };
  preOpRequirements: string[];
  postOpRequirements: string[];
  sterilizationRequirements: string[];
}

export interface Surgery {
  id: string;
  patientId: string;
  surgeryTypeId: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  operatingRoom: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  surgeons: string[];
  nurses: string[];
  anesthesiologist: string;
  notes?: string;
  cancellationReason?: string;
  updatedAt: string;
  materialRequests: string[];
  sterilizationRequests: string[];
}

interface SurgeryState {
  surgeryTypes: SurgeryType[];
  surgeries: Surgery[];
  addSurgeryType: (surgeryType: Omit<SurgeryType, "id">) => void;
  updateSurgeryType: (id: string, surgeryType: Partial<SurgeryType>) => void;
  deleteSurgeryType: (id: string) => void;
  scheduleSurgery: (surgery: Omit<Surgery, "id" | "updatedAt">) => void;
  updateSurgery: (id: string, surgery: Partial<Surgery>) => void;
  cancelSurgery: (id: string, reason: string) => void;
  checkOverlap: (surgery: Partial<Surgery>) => boolean;
}

export const useSurgeryStore = create<SurgeryState>((set, get) => ({
  surgeryTypes: [
    {
      id: "1",
      name: "Appendectomy",
      description: "Surgical removal of the appendix",
      estimatedDuration: 60,
      requiredEquipment: ["Surgical Kit A", "Laparoscopic Set"],
      requiredStaff: {
        surgeons: 1,
        nurses: 2,
        anesthesiologists: 1,
      },
      preOpRequirements: ["Blood Test", "ECG"],
      postOpRequirements: ["Pain Management", "Wound Care"],
      sterilizationRequirements: ["Standard Sterilization Protocol"],
    },
  ],
  surgeries: [
    {
      id: "1",
      patientId: "1",
      surgeryTypeId: "1",
      scheduledDate: "2024-02-01",
      startTime: "09:00",
      endTime: "10:00",
      operatingRoom: "OR-1",
      status: "scheduled",
      surgeons: ["Dr. Smith"],
      nurses: ["Nurse Johnson", "Nurse Williams"],
      anesthesiologist: "Dr. Brown",
      updatedAt: new Date().toISOString(),
      materialRequests: ["REQ-001"],
      sterilizationRequests: ["STER-001"],
    },
  ],

  addSurgeryType: (surgeryType) =>
    set((state) => ({
      surgeryTypes: [
        ...state.surgeryTypes,
        { ...surgeryType, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateSurgeryType: (id, surgeryType) =>
    set((state) => ({
      surgeryTypes: state.surgeryTypes.map((type) =>
        type.id === id ? { ...type, ...surgeryType } : type,
      ),
    })),

  deleteSurgeryType: (id) =>
    set((state) => ({
      surgeryTypes: state.surgeryTypes.filter((type) => type.id !== id),
    })),

  scheduleSurgery: (surgery) => {
    const state = get();
    if (state.checkOverlap(surgery)) {
      throw new Error("Surgery schedule overlaps with existing surgery");
    }

    set((state) => ({
      surgeries: [
        ...state.surgeries,
        {
          ...surgery,
          id: Math.random().toString(36).substr(2, 9),
          updatedAt: new Date().toISOString(),
        },
      ],
    }));
  },

  updateSurgery: (id, surgery) =>
    set((state) => ({
      surgeries: state.surgeries.map((s) =>
        s.id === id
          ? { ...s, ...surgery, updatedAt: new Date().toISOString() }
          : s,
      ),
    })),

  cancelSurgery: (id, reason) =>
    set((state) => ({
      surgeries: state.surgeries.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "cancelled",
              cancellationReason: reason,
              updatedAt: new Date().toISOString(),
            }
          : s,
      ),
    })),

  checkOverlap: (newSurgery) => {
    const state = get();
    return state.surgeries.some(
      (surgery) =>
        surgery.status !== "cancelled" &&
        surgery.operatingRoom === newSurgery.operatingRoom &&
        surgery.scheduledDate === newSurgery.scheduledDate &&
        ((newSurgery.startTime >= surgery.startTime &&
          newSurgery.startTime < surgery.endTime) ||
          (newSurgery.endTime > surgery.startTime &&
            newSurgery.endTime <= surgery.endTime)),
    );
  },
}));
