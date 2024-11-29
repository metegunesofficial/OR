import React, { useEffect } from "react";
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
import SessionMonitor from "./session/SessionMonitor";
import SessionTimeout from "./session/SessionTimeout";
import CreateUserDialog from "./user-management/CreateUserDialog";
import DeleteConfirmDialog from "./user-management/DeleteConfirmDialog";
import { useSessionStore } from "@/lib/store/sessionStore";

const Home = () => {
  const [activeTab, setActiveTab] = React.useState("users");
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const { initializeSession, updateLastActivity } = useSessionStore();

  useEffect(() => {
    initializeSession({
      id: "1",
      name: "Admin",
      role: "Administrator",
    });
  }, [initializeSession]);

  useEffect(() => {
    const handleActivity = () => {
      updateLastActivity();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [updateLastActivity]);

  const handleCreateUser = (data) => {
    console.log("Create user:", data);
    setShowCreateDialog(false);
  };

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log("Delete user:", selectedUser);
    setShowDeleteDialog(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      <SideNav activeItem={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="users" className="h-full mt-0 border-none">
            <UserTable
              onCreateUser={() => setShowCreateDialog(true)}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
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

          <TabsContent value="sessions" className="h-full mt-0 border-none">
            <SessionMonitor />
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

      <CreateUserDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateUser}
      />

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        itemName={selectedUser?.name}
      />

      <SessionTimeout />
    </div>
  );
};

export default Home;
