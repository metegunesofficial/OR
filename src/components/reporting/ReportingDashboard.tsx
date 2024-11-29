import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart2, Users, Package } from "lucide-react";
import SurgeryReports from "./SurgeryReports";
import PersonnelReports from "./PersonnelReports";
import MaterialReports from "./MaterialReports";
import OverallAnalytics from "./OverallAnalytics";

const ReportingDashboard = () => {
  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold tracking-tight">
          Reporting & Analytics
        </h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive analysis and insights across all departments
        </p>
      </div>

      <Tabs defaultValue="overall" className="p-6">
        <TabsList>
          <TabsTrigger value="overall" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Overall Analytics
          </TabsTrigger>
          <TabsTrigger value="surgery" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Surgery Reports
          </TabsTrigger>
          <TabsTrigger value="personnel" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personnel Reports
          </TabsTrigger>
          <TabsTrigger value="material" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Material Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="mt-6">
          <OverallAnalytics />
        </TabsContent>

        <TabsContent value="surgery" className="mt-6">
          <SurgeryReports />
        </TabsContent>

        <TabsContent value="personnel" className="mt-6">
          <PersonnelReports />
        </TabsContent>

        <TabsContent value="material" className="mt-6">
          <MaterialReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportingDashboard;
