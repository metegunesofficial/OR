import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PermissionCardProps {
  id?: string;
  name?: string;
  description?: string;
  type?: "read" | "write" | "admin";
  enabled?: boolean;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

const typeIcons = {
  read: Eye,
  write: Lock,
  admin: Shield,
  disabled: EyeOff,
};

const typeColors = {
  read: "bg-blue-100 text-blue-700",
  write: "bg-green-100 text-green-700",
  admin: "bg-purple-100 text-purple-700",
  disabled: "bg-gray-100 text-gray-700",
};

const PermissionCard = ({
  id = "permission-1",
  name = "View Users",
  description = "Can view user list and details",
  type = "read",
  enabled = true,
  className = "",
  draggable = true,
  onDragStart = () => {},
  onDragEnd = () => {},
}: PermissionCardProps) => {
  const Icon = enabled ? typeIcons[type] : typeIcons.disabled;
  const colorClass = enabled ? typeColors[type] : typeColors.disabled;

  return (
    <Card
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={cn(
        "w-[200px] p-4 cursor-move hover:shadow-md transition-shadow bg-background",
        enabled ? "" : "opacity-60",
        className,
      )}
      data-permission-id={id}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className={cn("font-medium", colorClass)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="mt-2">
          <h4 className="font-semibold text-sm">{name}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default PermissionCard;
