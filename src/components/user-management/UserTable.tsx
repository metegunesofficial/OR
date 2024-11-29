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

const UserTable = () => {
  const { users, deleteUser } = useUserStore();
  const { addActivity } = useActivityStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const handleDelete = (user: any) => {
    deleteUser(user.id);
    addActivity({
      action: "User Deleted",
      user: "Admin",
      target: user.email,
      details: `User account ${user.email} was deleted`,
      severity: "warning",
    });
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
              return user.role.toLowerCase() === "admin";
            case "staff":
              return user.role.toLowerCase() === "staff";
            default:
              return true;
          }
        });

      return matchesSearch && matchesFilters;
    });
  }, [users, searchTerm, activeFilters]);

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <UserTableToolbar onSearch={setSearchTerm} onFilter={setActiveFilters} />

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
            {filteredUsers.map((user) => (
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
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className={`font-medium ${user.status === "active" ? "bg-green-500" : ""}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
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
                      <DropdownMenuItem className="flex items-center gap-2">
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
