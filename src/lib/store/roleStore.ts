import { create } from "zustand";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface RoleState {
  roles: Role[];
  addRole: (role: Omit<Role, "id">) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
}

const initialRoles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access",
    permissions: ["all"],
  },
  {
    id: "doctor",
    name: "Doctor",
    description: "Medical staff access",
    permissions: [
      "view_patients",
      "edit_patients",
      "view_surgeries",
      "edit_surgeries",
    ],
  },
  {
    id: "nurse",
    name: "Nurse",
    description: "Nursing staff access",
    permissions: ["view_patients", "edit_patients", "view_surgeries"],
  },
  {
    id: "staff",
    name: "Staff",
    description: "General staff access",
    permissions: ["view_patients", "view_surgeries"],
  },
];

export const useRoleStore = create<RoleState>((set) => ({
  roles: initialRoles,

  addRole: (newRole) =>
    set((state) => ({
      roles: [
        ...state.roles,
        { ...newRole, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateRole: (id, updatedRole) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role,
      ),
    })),

  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));
