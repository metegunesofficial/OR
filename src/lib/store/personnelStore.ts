import { create } from "zustand";

export interface Staff {
  id: string;
  name: string;
  role: "surgeon" | "nurse" | "anesthesiologist" | "staff";
  specialization?: string;
  email: string;
  phone: string;
  status: "active" | "on-leave" | "unavailable";
  department: string;
  skills: string[];
  certifications: {
    name: string;
    validUntil: string;
  }[];
}

export interface Shift {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "morning" | "afternoon" | "night" | "on-call";
  department: string;
  status: "scheduled" | "completed" | "cancelled";
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  type: "annual" | "sick" | "personal" | "medical";
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
  notes?: string;
}

export interface Performance {
  id: string;
  staffId: string;
  evaluatorId: string;
  date: string;
  period: string;
  ratings: {
    category: string;
    score: number;
    comments: string;
  }[];
  overallScore: number;
  strengths: string[];
  improvements: string[];
  goals: string[];
}

interface PersonnelState {
  staff: Staff[];
  shifts: Shift[];
  leaveRequests: LeaveRequest[];
  performances: Performance[];
  addStaff: (staff: Omit<Staff, "id">) => void;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  addShift: (shift: Omit<Shift, "id">) => void;
  updateShift: (id: string, shift: Partial<Shift>) => void;
  deleteShift: (id: string) => void;
  addLeaveRequest: (request: Omit<LeaveRequest, "id">) => void;
  updateLeaveRequest: (id: string, request: Partial<LeaveRequest>) => void;
  addPerformance: (performance: Omit<Performance, "id">) => void;
  updatePerformance: (id: string, performance: Partial<Performance>) => void;
}

export const usePersonnelStore = create<PersonnelState>((set) => ({
  staff: [
    {
      id: "1",
      name: "Dr. John Smith",
      role: "surgeon",
      specialization: "Orthopedic Surgery",
      email: "john.smith@hospital.com",
      phone: "+1234567890",
      status: "active",
      department: "Surgery",
      skills: ["Joint Replacement", "Arthroscopy"],
      certifications: [
        {
          name: "Board Certification in Orthopedic Surgery",
          validUntil: "2025-12-31",
        },
      ],
    },
  ],
  shifts: [
    {
      id: "1",
      staffId: "1",
      date: "2024-02-01",
      startTime: "08:00",
      endTime: "16:00",
      type: "morning",
      department: "Surgery",
      status: "scheduled",
    },
  ],
  leaveRequests: [],
  performances: [],

  addStaff: (newStaff) =>
    set((state) => ({
      staff: [
        ...state.staff,
        { ...newStaff, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateStaff: (id, updatedStaff) =>
    set((state) => ({
      staff: state.staff.map((s) =>
        s.id === id ? { ...s, ...updatedStaff } : s,
      ),
    })),

  deleteStaff: (id) =>
    set((state) => ({
      staff: state.staff.filter((s) => s.id !== id),
    })),

  addShift: (newShift) =>
    set((state) => ({
      shifts: [
        ...state.shifts,
        { ...newShift, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateShift: (id, updatedShift) =>
    set((state) => ({
      shifts: state.shifts.map((s) =>
        s.id === id ? { ...s, ...updatedShift } : s,
      ),
    })),

  deleteShift: (id) =>
    set((state) => ({
      shifts: state.shifts.filter((s) => s.id !== id),
    })),

  addLeaveRequest: (newRequest) =>
    set((state) => ({
      leaveRequests: [
        ...state.leaveRequests,
        { ...newRequest, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateLeaveRequest: (id, updatedRequest) =>
    set((state) => ({
      leaveRequests: state.leaveRequests.map((r) =>
        r.id === id ? { ...r, ...updatedRequest } : r,
      ),
    })),

  addPerformance: (newPerformance) =>
    set((state) => ({
      performances: [
        ...state.performances,
        { ...newPerformance, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updatePerformance: (id, updatedPerformance) =>
    set((state) => ({
      performances: state.performances.map((p) =>
        p.id === id ? { ...p, ...updatedPerformance } : p,
      ),
    })),
}));
