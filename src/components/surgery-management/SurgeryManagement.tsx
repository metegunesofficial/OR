import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ListPlus, Settings, AlertCircle } from "lucide-react";
import SurgeryScheduler from "./SurgeryScheduler";
import SurgeryTypeManager from "./SurgeryTypeManager";
import SurgeryCancellations from "./SurgeryCancellations";

const SurgeryManagement = () => {
  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold tracking-tight">
          Surgery Planning & Management
        </h2>
        <p className="text-sm text-muted-foreground">
          Schedule and manage surgical procedures
        </p>
      </div>

      <Tabs defaultValue="schedule" className="p-6">
        <TabsList>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Surgery Schedule
          </TabsTrigger>
          <TabsTrigger value="types" className="flex items-center gap-2">
            <ListPlus className="h-4 w-4" />
            Surgery Types
          </TabsTrigger>
          <TabsTrigger
            value="cancellations"
            className="flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Cancellations & Updates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-6">
          <SurgeryScheduler />
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <SurgeryTypeManager />
        </TabsContent>

        <TabsContent value="cancellations" className="mt-6">
          <SurgeryCancellations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SurgeryManagement;
