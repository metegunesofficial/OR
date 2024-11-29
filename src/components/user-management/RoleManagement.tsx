import React from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PermissionCard from "./PermissionCard";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  type: "read" | "write" | "admin";
  enabled: boolean;
}

interface RoleManagementProps {
  roles?: Role[];
  availablePermissions?: Permission[];
  onUpdateRole?: (roleId: string, permissions: Permission[]) => void;
  onCreateRole?: (role: Omit<Role, "id">) => void;
}

const defaultRoles: Role[] = [
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
    id: "staff",
    name: "Staff Member",
    description: "Limited system access",
    permissions: [
      {
        id: "users-read",
        name: "View Users",
        description: "Can view user list and details",
        type: "read",
        enabled: true,
      },
    ],
  },
];

const defaultPermissions: Permission[] = [
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
  {
    id: "roles-admin",
    name: "Manage Roles",
    description: "Can modify role permissions",
    type: "admin",
    enabled: true,
  },
];

const RoleManagement = ({
  roles = defaultRoles,
  availablePermissions = defaultPermissions,
  onUpdateRole = () => {},
  onCreateRole = () => {},
}: RoleManagementProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<string>(roles[0]?.id);

  const handleDragStart = (e: React.DragEvent, permission: Permission) => {
    e.dataTransfer.setData("permission", JSON.stringify(permission));
  };

  const handleDrop = (e: React.DragEvent, roleId: string) => {
    e.preventDefault();
    const permission = JSON.parse(
      e.dataTransfer.getData("permission"),
    ) as Permission;
    const role = roles.find((r) => r.id === roleId);
    if (role && !role.permissions.find((p) => p.id === permission.id)) {
      onUpdateRole(roleId, [...role.permissions, permission]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full bg-background p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Role Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure roles and permissions
          </p>
        </div>
        <Button
          onClick={() =>
            onCreateRole({ name: "", description: "", permissions: [] })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <Tabs value={selectedRole} onValueChange={setSelectedRole}>
            <TabsList className="w-full justify-start">
              {roles.map((role) => (
                <TabsTrigger key={role.id} value={role.id} className="flex-1">
                  {role.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {roles.map((role) => (
              <TabsContent
                key={role.id}
                value={role.id}
                className="mt-6"
                onDrop={(e) => handleDrop(e, role.id)}
                onDragOver={handleDragOver}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {role.description}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {role.permissions.map((permission) => (
                        <PermissionCard
                          key={permission.id}
                          {...permission}
                          draggable={false}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-lg">Available Permissions</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search permissions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {availablePermissions
                  .filter((permission) =>
                    permission.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )
                  .map((permission) => (
                    <PermissionCard
                      key={permission.id}
                      {...permission}
                      onDragStart={(e) => handleDragStart(e, permission)}
                    />
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleManagement;
