import React from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePatientStore } from "@/lib/store/patientStore";

interface PatientTableProps {
  onEdit?: (patient: any) => void;
  onView?: (patient: any) => void;
  onDelete?: (patient: any) => void;
  onCreateNew?: () => void;
}

const PatientTable = ({
  onEdit = () => {},
  onView = () => {},
  onDelete = () => {},
  onCreateNew = () => {},
}: PatientTableProps) => {
  const { patients } = usePatientStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredPatients = React.useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [patients, searchTerm]);

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Patients</h2>
            <p className="text-sm text-muted-foreground">
              Manage and view patient records
            </p>
          </div>
          <Button onClick={onCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Patient
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>MRN</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Special Conditions</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.mrn}</TableCell>
                <TableCell>
                  {patient.firstName} {patient.lastName}
                </TableCell>
                <TableCell>
                  {new Date(patient.dateOfBirth).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      patient.status === "scheduled" ? "default" : "secondary"
                    }
                  >
                    {patient.status.charAt(0).toUpperCase() +
                      patient.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {patient.specialConditions.map((condition) => (
                      <Badge
                        key={condition.id}
                        variant="outline"
                        className={
                          {
                            "bg-red-100 text-red-800":
                              condition.severity === "high",
                            "bg-yellow-100 text-yellow-800":
                              condition.severity === "medium",
                            "bg-blue-100 text-blue-800":
                              condition.severity === "low",
                          }[condition.severity]
                        }
                      >
                        {condition.condition}
                      </Badge>
                    ))}
                  </div>
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
                        onClick={() => onView(patient)}
                        className="flex items-center gap-2"
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit(patient)}
                        className="flex items-center gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(patient)}
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

export default PatientTable;
