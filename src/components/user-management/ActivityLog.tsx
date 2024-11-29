import React from "react";
import { Search, Filter, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useActivityStore } from "@/lib/store/activityStore";

const filterOptions = [
  { id: "info", label: "Information" },
  { id: "warning", label: "Warnings" },
  { id: "error", label: "Errors" },
  { id: "user", label: "User Actions" },
  { id: "system", label: "System Events" },
];

const severityColors = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
};

const ActivityLog = () => {
  const { activities } = useActivityStore();
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredActivities = React.useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.includes(activity.severity);

      return matchesSearch && matchesFilters;
    });
  }, [activities, searchTerm, selectedFilters]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  const handleExport = () => {
    const csv = [
      ["Timestamp", "Action", "User", "Target", "Details", "Severity"],
      ...filteredActivities.map((entry) => [
        new Date(entry.timestamp).toLocaleString(),
        entry.action,
        entry.user,
        entry.target,
        entry.details,
        entry.severity,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `activity-log-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Activity Log
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitor system and user activities
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <DropdownMenuContent align="end" className="w-48">
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

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead className="w-[150px]">Action</TableHead>
              <TableHead className="w-[120px]">User</TableHead>
              <TableHead className="w-[150px]">Target</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-[100px]">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {new Date(entry.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="font-medium">{entry.action}</TableCell>
                <TableCell>{entry.user}</TableCell>
                <TableCell className="text-muted-foreground">
                  {entry.target}
                </TableCell>
                <TableCell>{entry.details}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={severityColors[entry.severity]}
                  >
                    {entry.severity.charAt(0).toUpperCase() +
                      entry.severity.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ActivityLog;
