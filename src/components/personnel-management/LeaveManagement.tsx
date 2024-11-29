import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Calendar, Clock, FileText } from "lucide-react";
import { usePersonnelStore } from "@/lib/store/personnelStore";

const LeaveManagement = () => {
  const { staff, leaveRequests } = usePersonnelStore();

  const getStaffMember = (staffId: string) => {
    return staff.find((s) => s.id === staffId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "annual":
        return "bg-blue-100 text-blue-800";
      case "sick":
        return "bg-red-100 text-red-800";
      case "personal":
        return "bg-purple-100 text-purple-800";
      case "medical":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Leave Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage staff leave requests and approvals
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Leave Request
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {leaveRequests.map((request) => {
            const staffMember = getStaffMember(request.staffId);

            return (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {staffMember?.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className={getLeaveTypeColor(request.type)}
                      >
                        {request.type.charAt(0).toUpperCase() +
                          request.type.slice(1)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getStatusColor(request.status)}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Start Date</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(request.startDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">End Date</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(request.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Reason</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {request.reason}
                      </p>
                    </div>

                    {request.notes && (
                      <div className="text-sm text-muted-foreground border-t pt-2">
                        <span className="font-medium">Additional Notes:</span>
                        <p>{request.notes}</p>
                      </div>
                    )}

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="w-full text-green-600 hover:text-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeaveManagement;
