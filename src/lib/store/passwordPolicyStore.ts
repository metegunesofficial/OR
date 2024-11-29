import { create } from "zustand";

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiration: number;
  maxAttempts: number;
}

interface PasswordPolicyState {
  policy: PasswordPolicy;
  updatePolicy: (newPolicy: Partial<PasswordPolicy>) => void;
}

export const usePasswordPolicyStore = create<PasswordPolicyState>((set) => ({
  policy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    passwordExpiration: 90,
    maxAttempts: 3,
  },
  updatePolicy: (newPolicy) =>
    set((state) => ({
      policy: { ...state.policy, ...newPolicy },
    })),
}));
