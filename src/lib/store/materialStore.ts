import { create } from "zustand";

export interface Material {
  id: string;
  code: string;
  name: string;
  category: "surgical" | "equipment" | "disposable";
  currentStock: number;
  minimumStock: number;
  unit: string;
  cost: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  notes?: string;
}

export interface Drug {
  id: string;
  code: string;
  name: string;
  type: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  cost: number;
  expiryDate: string;
  batchNumber: string;
  supplier: string;
  storageConditions: string;
  controlled: boolean;
}

export interface UsageLog {
  id: string;
  surgeryId: string;
  date: string;
  items: {
    itemId: string;
    itemType: "material" | "drug";
    quantity: number;
    cost: number;
    notes?: string;
  }[];
  totalCost: number;
  recordedBy: string;
}

interface MaterialState {
  materials: Material[];
  drugs: Drug[];
  usageLogs: UsageLog[];
  addMaterial: (material: Omit<Material, "id">) => void;
  updateMaterial: (id: string, material: Partial<Material>) => void;
  deleteMaterial: (id: string) => void;
  addDrug: (drug: Omit<Drug, "id">) => void;
  updateDrug: (id: string, drug: Partial<Drug>) => void;
  deleteDrug: (id: string) => void;
  logUsage: (log: Omit<UsageLog, "id">) => void;
  updateStock: (
    itemId: string,
    type: "material" | "drug",
    quantity: number,
  ) => void;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  materials: [
    {
      id: "1",
      code: "SRG-001",
      name: "Surgical Gloves",
      category: "disposable",
      currentStock: 1000,
      minimumStock: 200,
      unit: "pairs",
      cost: 0.5,
      supplier: "Medical Supplies Co",
      location: "Storage A",
      lastRestocked: new Date().toISOString(),
    },
  ],
  drugs: [
    {
      id: "1",
      code: "DRG-001",
      name: "Anesthetic A",
      type: "Anesthetic",
      currentStock: 50,
      minimumStock: 10,
      unit: "vials",
      cost: 25,
      expiryDate: "2024-12-31",
      batchNumber: "BAT001",
      supplier: "Pharma Inc",
      storageConditions: "Store between 2-8°C",
      controlled: true,
    },
  ],
  usageLogs: [],

  addMaterial: (material) =>
    set((state) => ({
      materials: [
        ...state.materials,
        { ...material, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateMaterial: (id, material) =>
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === id ? { ...m, ...material } : m,
      ),
    })),

  deleteMaterial: (id) =>
    set((state) => ({
      materials: state.materials.filter((m) => m.id !== id),
    })),

  addDrug: (drug) =>
    set((state) => ({
      drugs: [
        ...state.drugs,
        { ...drug, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateDrug: (id, drug) =>
    set((state) => ({
      drugs: state.drugs.map((d) => (d.id === id ? { ...d, ...drug } : d)),
    })),

  deleteDrug: (id) =>
    set((state) => ({
      drugs: state.drugs.filter((d) => d.id !== id),
    })),

  logUsage: (log) =>
    set((state) => ({
      usageLogs: [
        ...state.usageLogs,
        { ...log, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateStock: (itemId, type, quantity) =>
    set((state) => {
      if (type === "material") {
        return {
          materials: state.materials.map((m) =>
            m.id === itemId
              ? { ...m, currentStock: m.currentStock + quantity }
              : m,
          ),
        };
      } else {
        return {
          drugs: state.drugs.map((d) =>
            d.id === itemId
              ? { ...d, currentStock: d.currentStock + quantity }
              : d,
          ),
        };
      }
    }),
}));
