import React from "react";
import { cn } from "@/lib/utils";
import {
  Users,
  Shield,
  ScrollText,
  Key,
  Settings,
  UserRound,
  Calendar,
  Package,
  UserCog,
  Microscope,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SideNavProps {
  className?: string;
  activeItem?: string;
  onTabChange?: (tab: string) => void;
}

const navItems = [
  {
    title: "Users",
    icon: Users,
    id: "users",
    description: "Manage user accounts",
  },
  {
    title: "Personnel",
    icon: UserCog,
    id: "personnel",
    description: "Staff management & scheduling",
  },
  {
    title: "Patients",
    icon: UserRound,
    id: "patients",
    description: "Manage patient records",
  },
  {
    title: "Surgeries",
    icon: Calendar,
    id: "surgeries",
    description: "Schedule and manage surgeries",
  },
  {
    title: "Materials & Drugs",
    icon: Package,
    id: "materials",
    description: "Manage inventory and supplies",
  },
  {
    title: "Sterilization & Hygiene",
    icon: Microscope,
    id: "sterilization",
    description: "Monitor sterilization and hygiene",
  },
  {
    title: "Reports & Analytics",
    icon: BarChart2,
    id: "reports",
    description: "View reports and analytics",
  },
  {
    title: "Roles & Permissions",
    icon: Shield,
    id: "roles",
    description: "Configure access control",
  },
  {
    title: "Activity Log",
    icon: ScrollText,
    id: "activity",
    description: "View system activities",
  },
  {
    title: "Password Policy",
    icon: Key,
    id: "password-policy",
    description: "Security settings",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
    description: "System configuration",
  },
];

const SideNav = ({
  className = "",
  activeItem = "users",
  onTabChange = () => {},
}: SideNavProps) => {
  return (
    <nav
      className={cn(
        "w-[280px] h-full bg-background border-r px-4 py-6 flex flex-col gap-2",
        className,
      )}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Operating Room System
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage users, patients, and operations
        </p>
      </div>

      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start px-4 py-6 rounded-lg text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              activeItem === item.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
            )}
            onClick={() => onTabChange(item.id)}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground">Logged in as Admin</p>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
