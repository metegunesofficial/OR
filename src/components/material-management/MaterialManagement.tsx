import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Pill, ClipboardList, BarChart3 } from "lucide-react";
import MaterialStock from "./MaterialStock";
import DrugStock from "./DrugStock";
import UsageLog from "./UsageLog";
import ConsumptionReports from "./ConsumptionReports";

const MaterialManagement = () => {
  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold tracking-tight">
          Material & Drug Management
        </h2>
        <p className="text-sm text-muted-foreground">
          Track inventory, manage drugs, and monitor usage
        </p>
      </div>

      <Tabs defaultValue="materials" className="p-6">
        <TabsList>
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Material Stock
          </TabsTrigger>
          <TabsTrigger value="drugs" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Drug Stock
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Usage Logs
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="mt-6">
          <MaterialStock />
        </TabsContent>

        <TabsContent value="drugs" className="mt-6">
          <DrugStock />
        </TabsContent>

        <TabsContent value="usage" className="mt-6">
          <UsageLog />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <ConsumptionReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialManagement;
