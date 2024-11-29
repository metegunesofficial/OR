import { create } from "zustand";

export interface SterilizationRecord {
  id: string;
  equipmentId: string;
  processType: "autoclave" | "chemical" | "plasma" | "uv";
  startTime: string;
  endTime: string;
  temperature?: number;
  pressure?: number;
  operatorId: string;
  status: "in-progress" | "completed" | "failed";
  validatedBy?: string;
  validatedAt?: string;
  notes?: string;
  parameters: Record<string, any>;
}

export interface CleaningRecord {
  id: string;
  roomId: string;
  date: string;
  shift: "morning" | "afternoon" | "night";
  cleanerId: string;
  supervisorId: string;
  checklist: {
    task: string;
    completed: boolean;
    notes?: string;
  }[];
  status: "pending" | "completed" | "verified";
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface HygieneAudit {
  id: string;
  date: string;
  auditorId: string;
  area: string;
  score: number;
  findings: {
    category: string;
    observation: string;
    severity: "low" | "medium" | "high";
    action?: string;
  }[];
  recommendations: string[];
  followUpDate?: string;
  status: "open" | "in-progress" | "closed";
}

interface SterilizationState {
  sterilizationRecords: SterilizationRecord[];
  cleaningRecords: CleaningRecord[];
  hygieneAudits: HygieneAudit[];
  addSterilizationRecord: (record: Omit<SterilizationRecord, "id">) => void;
  updateSterilizationRecord: (
    id: string,
    record: Partial<SterilizationRecord>,
  ) => void;
  addCleaningRecord: (record: Omit<CleaningRecord, "id">) => void;
  updateCleaningRecord: (id: string, record: Partial<CleaningRecord>) => void;
  addHygieneAudit: (audit: Omit<HygieneAudit, "id">) => void;
  updateHygieneAudit: (id: string, audit: Partial<HygieneAudit>) => void;
}

export const useSterilizationStore = create<SterilizationState>((set) => ({
  sterilizationRecords: [
    {
      id: "1",
      equipmentId: "EQ001",
      processType: "autoclave",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      temperature: 121,
      pressure: 15,
      operatorId: "OP001",
      status: "completed",
      parameters: {
        cycleNumber: 1,
        holdTime: 15,
      },
    },
  ],
  cleaningRecords: [
    {
      id: "1",
      roomId: "OR001",
      date: new Date().toISOString(),
      shift: "morning",
      cleanerId: "CL001",
      supervisorId: "SV001",
      checklist: [
        { task: "Floor cleaning", completed: true },
        { task: "Surface disinfection", completed: true },
        { task: "Waste disposal", completed: true },
      ],
      status: "completed",
    },
  ],
  hygieneAudits: [
    {
      id: "1",
      date: new Date().toISOString(),
      auditorId: "AU001",
      area: "Operating Room 1",
      score: 95,
      findings: [
        {
          category: "Surface Cleanliness",
          observation: "All surfaces properly disinfected",
          severity: "low",
        },
      ],
      recommendations: ["Maintain current cleaning protocols"],
      status: "closed",
    },
  ],

  addSterilizationRecord: (record) =>
    set((state) => ({
      sterilizationRecords: [
        ...state.sterilizationRecords,
        { ...record, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateSterilizationRecord: (id, record) =>
    set((state) => ({
      sterilizationRecords: state.sterilizationRecords.map((r) =>
        r.id === id ? { ...r, ...record } : r,
      ),
    })),

  addCleaningRecord: (record) =>
    set((state) => ({
      cleaningRecords: [
        ...state.cleaningRecords,
        { ...record, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateCleaningRecord: (id, record) =>
    set((state) => ({
      cleaningRecords: state.cleaningRecords.map((r) =>
        r.id === id ? { ...r, ...record } : r,
      ),
    })),

  addHygieneAudit: (audit) =>
    set((state) => ({
      hygieneAudits: [
        ...state.hygieneAudits,
        { ...audit, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateHygieneAudit: (id, audit) =>
    set((state) => ({
      hygieneAudits: state.hygieneAudits.map((a) =>
        a.id === id ? { ...a, ...audit } : a,
      ),
    })),
}));
