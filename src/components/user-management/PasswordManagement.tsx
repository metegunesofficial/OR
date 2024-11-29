import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCog, Key, Lock, Shield } from "lucide-react";
import PasswordPolicyForm from "./PasswordPolicyForm";
import { useUserStore } from "@/lib/store/userStore";
import { useActivityStore } from "@/lib/store/activityStore";
import { usePasswordPolicyStore } from "@/lib/store/passwordPolicyStore";

const PasswordManagement = () => {
  const { users } = useUserStore();
  const { addActivity } = useActivityStore();
  const { policy, updatePolicy } = usePasswordPolicyStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handlePolicyUpdate = (newPolicy: any) => {
    updatePolicy(newPolicy);
    addActivity({
      action: "Password Policy Updated",
      user: "Admin",
      target: "System",
      details: "Password policy settings were updated",
      severity: "info",
    });
  };

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Password Management
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage password policies and user password settings
            </p>
          </div>
        </div>

        <Tabs defaultValue="policy" className="space-y-4">
          <TabsList>
            <TabsTrigger value="policy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Password Policy
            </TabsTrigger>
            <TabsTrigger value="reset" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Password Reset
            </TabsTrigger>
          </TabsList>

          <TabsContent value="policy" className="space-y-4">
            <PasswordPolicyForm
              defaultValues={policy}
              onSubmit={handlePolicyUpdate}
            />
          </TabsContent>

          <TabsContent value="reset" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  User Password Management
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          addActivity({
                            action: "Password Reset Initiated",
                            user: "Admin",
                            target: user.email,
                            details: `Password reset initiated for ${user.name}`,
                            severity: "warning",
                          });
                        }}
                      >
                        Reset Password
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PasswordManagement;
