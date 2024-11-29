import React from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserTableToolbar from "./UserTableToolbar";
import { useUserStore } from "@/lib/store/userStore";
import { useActivityStore } from "@/lib/store/activityStore";
import CreateUserDialog from "./CreateUserDialog";
import { useRoleStore } from "@/lib/store/roleStore";
import * as XLSX from "xlsx";

const UserTable = () => {
  const { users, deleteUser } = useUserStore();
  const { addActivity } = useActivityStore();
  const { roles } = useRoleStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : roleId;
  };

  const handleDelete = (user: any) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUser(user.id);
      addActivity({
        action: "User Deleted",
        user: "Admin",
        target: user.email,
        details: `User account ${user.email} was deleted`,
        severity: "warning",
      });
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  const handleExport = () => {
    try {
      const exportData = users.map((user) => ({
        Name: user.name,
        Email: user.email,
        Role: getRoleName(user.role),
        Status: user.status,
        "Last Active": new Date(user.lastActive).toLocaleString(),
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Users");
      XLSX.writeFile(wb, "users.xlsx");

      addActivity({
        action: "Users Exported",
        user: "Admin",
        target: "System",
        details: `User list exported to Excel`,
        severity: "info",
      });
    } catch (error) {
      console.error("Error exporting users:", error);
      alert("Failed to export users. Please try again.");
    }
  };

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.some((filter) => {
          switch (filter) {
            case "active":
              return user.status === "active";
            case "inactive":
              return user.status === "inactive";
            case "admin":
              return user.role === "admin";
            case "staff":
              return user.role === "staff";
            default:
              return true;
          }
        });

      return matchesSearch && matchesFilters;
    });
  }, [users, searchTerm, activeFilters]);

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <UserTableToolbar
        onSearch={setSearchTerm}
        onFilter={setActiveFilters}
        onCreateNew={() => setShowCreateDialog(true)}
        onExport={handleExport}
      />

      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium">
                      {getRoleName(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                      className={`font-medium ${user.status === "active" ? "bg-green-500" : ""}`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(user)}
                          className="flex items-center gap-2"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user)}
                          className="flex items-center gap-2 text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CreateUserDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        mode="create"
      />

      <CreateUserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        mode="edit"
        userId={selectedUser?.id}
        defaultValues={{
          name: selectedUser?.name || "",
          email: selectedUser?.email || "",
          role: selectedUser?.role || "",
        }}
      />
    </div>
  );
};

export default UserTable;
