import { create } from "zustand";

export interface Permission {
  id: string;
  name: string;
  description: string;
  type: "read" | "write" | "admin";
  enabled: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface RoleState {
  roles: Role[];
  addRole: (role: Omit<Role, "id">) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  updateRolePermissions: (roleId: string, permissions: Permission[]) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  roles: [
    {
      id: "admin",
      name: "Administrator",
      description: "Full system access",
      permissions: [
        {
          id: "users-read",
          name: "View Users",
          description: "Can view user list and details",
          type: "read",
          enabled: true,
        },
        {
          id: "users-write",
          name: "Manage Users",
          description: "Can create and modify users",
          type: "write",
          enabled: true,
        },
      ],
    },
    {
      id: "surgeon",
      name: "Surgeon",
      description: "Operating room access",
      permissions: [
        {
          id: "surgery-read",
          name: "View Surgeries",
          description: "Can view surgery schedules",
          type: "read",
          enabled: true,
        },
        {
          id: "surgery-write",
          name: "Manage Surgeries",
          description: "Can schedule and modify surgeries",
          type: "write",
          enabled: true,
        },
      ],
    },
  ],
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
  updateRolePermissions: (roleId, permissions) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === roleId ? { ...role, permissions } : role,
      ),
    })),
}));
