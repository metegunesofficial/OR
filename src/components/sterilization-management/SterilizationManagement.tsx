import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Microscope,
  ClipboardCheck,
  FileSpreadsheet,
  Trash2,
} from "lucide-react";
import SterilizationRecords from "./SterilizationRecords";
import ProcessMonitoring from "./ProcessMonitoring";
import HygieneReports from "./HygieneReports";
import CleaningRecords from "./CleaningRecords";

const SterilizationManagement = () => {
  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold tracking-tight">
          Sterilization & Hygiene Management
        </h2>
        <p className="text-sm text-muted-foreground">
          Monitor sterilization processes and maintain hygiene standards
        </p>
      </div>

      <Tabs defaultValue="records" className="p-6">
        <TabsList>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Sterilization Records
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Microscope className="h-4 w-4" />
            Process Monitoring
          </TabsTrigger>
          <TabsTrigger value="hygiene" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Hygiene Reports
          </TabsTrigger>
          <TabsTrigger value="cleaning" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Cleaning Records
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-6">
          <SterilizationRecords />
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <ProcessMonitoring />
        </TabsContent>

        <TabsContent value="hygiene" className="mt-6">
          <HygieneReports />
        </TabsContent>

        <TabsContent value="cleaning" className="mt-6">
          <CleaningRecords />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SterilizationManagement;
