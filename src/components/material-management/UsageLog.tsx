import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Package, Pill } from "lucide-react";
import { useMaterialStore } from "@/lib/store/materialStore";
import { useSurgeryStore } from "@/lib/store/surgeryStore";

const UsageLog = () => {
  const { usageLogs, materials, drugs } = useMaterialStore();
  const { surgeries } = useSurgeryStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const getItemName = (itemId: string, type: "material" | "drug") => {
    if (type === "material") {
      const material = materials.find((m) => m.id === itemId);
      return material ? material.name : "Unknown Material";
    } else {
      const drug = drugs.find((d) => d.id === itemId);
      return drug ? drug.name : "Unknown Drug";
    }
  };

  const getSurgeryDetails = (surgeryId: string) => {
    const surgery = surgeries.find((s) => s.id === surgeryId);
    return surgery
      ? `${surgery.operatingRoom} - ${new Date(surgery.scheduledDate).toLocaleDateString()}`
      : "Unknown Surgery";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Usage Logs</h3>
          <p className="text-sm text-muted-foreground">
            Track material and drug usage per surgery
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Log Usage
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {usageLogs.map((log) => (
            <Card key={log.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{getSurgeryDetails(log.surgeryId)}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Recorded by: {log.recordedBy}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    Total Cost: ${log.totalCost.toFixed(2)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {log.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        {item.itemType === "material" ? (
                          <Package className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Pill className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-medium">
                            {getItemName(item.itemId, item.itemType)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${item.cost.toFixed(2)}
                        </div>
                        {item.notes && (
                          <div className="text-sm text-muted-foreground">
                            {item.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UsageLog;
