import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SideNav from "./user-management/SideNav";
import UserTable from "./user-management/UserTable";
import RoleManagement from "./user-management/RoleManagement";
import ActivityLog from "./user-management/ActivityLog";
import PasswordManagement from "./user-management/PasswordManagement";
import PatientManagement from "./patient-management/PatientManagement";
import SurgeryManagement from "./surgery-management/SurgeryManagement";
import MaterialManagement from "./material-management/MaterialManagement";
import PersonnelManagement from "./personnel-management/PersonnelManagement";
import SterilizationManagement from "./sterilization-management/SterilizationManagement";
import ReportingDashboard from "./reporting/ReportingDashboard";

const Home = () => {
  const [activeTab, setActiveTab] = React.useState("users");

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      <SideNav activeItem={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="users" className="h-full mt-0 border-none">
            <UserTable />
          </TabsContent>

          <TabsContent value="personnel" className="h-full mt-0 border-none">
            <PersonnelManagement />
          </TabsContent>

          <TabsContent value="patients" className="h-full mt-0 border-none">
            <PatientManagement />
          </TabsContent>

          <TabsContent value="surgeries" className="h-full mt-0 border-none">
            <SurgeryManagement />
          </TabsContent>

          <TabsContent value="materials" className="h-full mt-0 border-none">
            <MaterialManagement />
          </TabsContent>

          <TabsContent
            value="sterilization"
            className="h-full mt-0 border-none"
          >
            <SterilizationManagement />
          </TabsContent>

          <TabsContent value="reports" className="h-full mt-0 border-none">
            <ReportingDashboard />
          </TabsContent>

          <TabsContent value="roles" className="h-full mt-0 border-none">
            <RoleManagement />
          </TabsContent>

          <TabsContent value="activity" className="h-full mt-0 border-none">
            <ActivityLog />
          </TabsContent>

          <TabsContent
            value="password-policy"
            className="h-full mt-0 border-none"
          >
            <PasswordManagement />
          </TabsContent>

          <TabsContent value="settings" className="h-full mt-0 border-none">
            <div className="p-4">
              <h2 className="text-2xl font-semibold">Settings</h2>
              <p className="text-muted-foreground">
                System settings coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
