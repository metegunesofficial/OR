import { create } from "zustand";

export interface SurgeryMetrics {
  id: string;
  surgeryId: string;
  duration: number;
  complications: string[];
  outcome: "successful" | "complications" | "critical";
  recoveryTime: number;
  materialCost: number;
  staffUtilization: number;
  notes?: string;
}

export interface PerformanceMetrics {
  id: string;
  staffId: string;
  period: string;
  surgeryCount: number;
  avgDuration: number;
  successRate: number;
  complicationRate: number;
  teamworkScore: number;
  efficiencyScore: number;
  notes?: string;
}

export interface MaterialMetrics {
  id: string;
  period: string;
  materialId: string;
  consumptionRate: number;
  costPerUse: number;
  wastageRate: number;
  stockoutIncidents: number;
  reorderFrequency: number;
  notes?: string;
}

export interface AnalyticsReport {
  id: string;
  type: "surgery" | "personnel" | "material" | "comprehensive";
  period: string;
  generatedAt: string;
  metrics: Record<string, any>;
  insights: string[];
  recommendations: string[];
}

interface ReportingState {
  surgeryMetrics: SurgeryMetrics[];
  performanceMetrics: PerformanceMetrics[];
  materialMetrics: MaterialMetrics[];
  analyticsReports: AnalyticsReport[];
  addSurgeryMetrics: (metrics: Omit<SurgeryMetrics, "id">) => void;
  addPerformanceMetrics: (metrics: Omit<PerformanceMetrics, "id">) => void;
  addMaterialMetrics: (metrics: Omit<MaterialMetrics, "id">) => void;
  generateReport: (type: AnalyticsReport["type"], period: string) => void;
}

export const useReportingStore = create<ReportingState>((set, get) => ({
  surgeryMetrics: [
    {
      id: "1",
      surgeryId: "SUR001",
      duration: 120,
      complications: [],
      outcome: "successful",
      recoveryTime: 48,
      materialCost: 1500,
      staffUtilization: 0.85,
      notes: "Standard procedure, no complications",
    },
  ],
  performanceMetrics: [
    {
      id: "1",
      staffId: "STF001",
      period: "2024-Q1",
      surgeryCount: 45,
      avgDuration: 115,
      successRate: 0.95,
      complicationRate: 0.05,
      teamworkScore: 4.5,
      efficiencyScore: 4.2,
    },
  ],
  materialMetrics: [
    {
      id: "1",
      period: "2024-Q1",
      materialId: "MAT001",
      consumptionRate: 0.8,
      costPerUse: 25,
      wastageRate: 0.05,
      stockoutIncidents: 0,
      reorderFrequency: 30,
    },
  ],
  analyticsReports: [
    {
      id: "1",
      type: "comprehensive",
      period: "2024-Q1",
      generatedAt: new Date().toISOString(),
      metrics: {
        totalSurgeries: 150,
        successRate: 0.93,
        avgCostPerSurgery: 1800,
        staffUtilization: 0.82,
      },
      insights: [
        "Overall success rate above target",
        "Material costs within budget",
        "Staff utilization could be improved",
      ],
      recommendations: [
        "Implement new staff scheduling system",
        "Review material ordering patterns",
        "Enhance post-surgery documentation",
      ],
    },
  ],

  addSurgeryMetrics: (metrics) =>
    set((state) => ({
      surgeryMetrics: [
        ...state.surgeryMetrics,
        { ...metrics, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  addPerformanceMetrics: (metrics) =>
    set((state) => ({
      performanceMetrics: [
        ...state.performanceMetrics,
        { ...metrics, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  addMaterialMetrics: (metrics) =>
    set((state) => ({
      materialMetrics: [
        ...state.materialMetrics,
        { ...metrics, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  generateReport: (type, period) => {
    const newReport: AnalyticsReport = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      period,
      generatedAt: new Date().toISOString(),
      metrics: {},
      insights: [],
      recommendations: [],
    };

    // Calculate metrics based on type
    switch (type) {
      case "surgery":
        const surgeryMetrics = get().surgeryMetrics.filter(
          (m) => m.outcome === "successful",
        );
        newReport.metrics = {
          totalSurgeries: surgeryMetrics.length,
          avgDuration:
            surgeryMetrics.reduce((acc, m) => acc + m.duration, 0) /
            surgeryMetrics.length,
          successRate: surgeryMetrics.length / get().surgeryMetrics.length,
        };
        break;

      case "personnel":
        const perfMetrics = get().performanceMetrics;
        newReport.metrics = {
          avgSuccessRate:
            perfMetrics.reduce((acc, m) => acc + m.successRate, 0) /
            perfMetrics.length,
          avgEfficiency:
            perfMetrics.reduce((acc, m) => acc + m.efficiencyScore, 0) /
            perfMetrics.length,
        };
        break;

      case "material":
        const matMetrics = get().materialMetrics;
        newReport.metrics = {
          avgConsumption:
            matMetrics.reduce((acc, m) => acc + m.consumptionRate, 0) /
            matMetrics.length,
          totalCost: matMetrics.reduce((acc, m) => acc + m.costPerUse, 0),
        };
        break;

      case "comprehensive":
        // Combine metrics from all areas
        newReport.metrics = {
          surgerySuccess:
            get().surgeryMetrics.filter((m) => m.outcome === "successful")
              .length / get().surgeryMetrics.length,
          staffEfficiency:
            get().performanceMetrics.reduce(
              (acc, m) => acc + m.efficiencyScore,
              0,
            ) / get().performanceMetrics.length,
          materialUtilization:
            1 -
            get().materialMetrics.reduce((acc, m) => acc + m.wastageRate, 0) /
              get().materialMetrics.length,
        };
        break;
    }

    set((state) => ({
      analyticsReports: [...state.analyticsReports, newReport],
    }));
  },
}));
