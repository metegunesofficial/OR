import React from "react";
import { Search, Filter, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserTableToolbarProps {
  onSearch?: (value: string) => void;
  onFilter?: (filters: string[]) => void;
  onCreateUser?: () => void;
  onExport?: () => void;
  className?: string;
}

const filterOptions = [
  { id: "active", label: "Active Users" },
  { id: "inactive", label: "Inactive Users" },
  { id: "admin", label: "Administrators" },
  { id: "staff", label: "Staff Members" },
];

const UserTableToolbar = ({
  onSearch = () => {},
  onFilter = () => {},
  onCreateUser = () => {},
  onExport = () => {},
  className = "",
}: UserTableToolbarProps) => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  const handleFilterChange = (filterId: string) => {
    const updatedFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((id) => id !== filterId)
      : [...selectedFilters, filterId];

    setSelectedFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 bg-background border-b ${className}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {filterOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={selectedFilters.includes(option.id)}
                onCheckedChange={() => handleFilterChange(option.id)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={onCreateUser}
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UserTableToolbar;
