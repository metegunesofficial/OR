import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, ClipboardCheck, Clock } from "lucide-react";
import StaffAssignment from "./StaffAssignment";
import ShiftPlanning from "./ShiftPlanning";
import PerformanceEvaluation from "./PerformanceEvaluation";
import LeaveManagement from "./LeaveManagement";

const PersonnelManagement = () => {
  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold tracking-tight">
          Personnel Management
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage staff assignments, shifts, evaluations, and leave requests
        </p>
      </div>

      <Tabs defaultValue="assignments" className="p-6">
        <TabsList>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Staff Assignments
          </TabsTrigger>
          <TabsTrigger value="shifts" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Shift Planning
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="leave" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Leave Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="mt-6">
          <StaffAssignment />
        </TabsContent>

        <TabsContent value="shifts" className="mt-6">
          <ShiftPlanning />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceEvaluation />
        </TabsContent>

        <TabsContent value="leave" className="mt-6">
          <LeaveManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonnelManagement;
