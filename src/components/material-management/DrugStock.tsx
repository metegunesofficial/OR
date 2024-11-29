import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, AlertTriangle, Thermometer } from "lucide-react";
import { useMaterialStore } from "@/lib/store/materialStore";

const DrugStock = () => {
  const { drugs } = useMaterialStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDrugs = React.useMemo(() => {
    return drugs.filter(
      (drug) =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [drugs, searchTerm]);

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= minimum) {
      return { color: "destructive", text: "Low Stock" };
    } else if (current <= minimum * 1.5) {
      return { color: "warning", text: "Running Low" };
    }
    return { color: "success", text: "In Stock" };
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsUntilExpiry =
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

    if (monthsUntilExpiry <= 0) {
      return { color: "destructive", text: "Expired" };
    } else if (monthsUntilExpiry <= 3) {
      return { color: "warning", text: "Expiring Soon" };
    }
    return { color: "success", text: "Valid" };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Drug Inventory</h3>
          <p className="text-sm text-muted-foreground">
            Track and manage medication inventory
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Drug
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredDrugs.map((drug) => {
            const stockStatus = getStockStatus(
              drug.currentStock,
              drug.minimumStock,
            );
            const expiryStatus = getExpiryStatus(drug.expiryDate);
            return (
              <Card key={drug.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {drug.name}
                        <Badge variant="outline">{drug.code}</Badge>
                        {drug.controlled && (
                          <Badge variant="secondary">Controlled</Badge>
                        )}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {drug.type}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          stockStatus.color as
                            | "default"
                            | "destructive"
                            | "warning"
                        }
                      >
                        {stockStatus.text}
                      </Badge>
                      <Badge
                        variant={
                          expiryStatus.color as
                            | "default"
                            | "destructive"
                            | "warning"
                        }
                      >
                        {expiryStatus.text}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm font-medium">Current Stock</div>
                      <div className="text-2xl font-bold">
                        {drug.currentStock}
                        <span className="text-sm text-muted-foreground ml-1">
                          {drug.unit}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Batch Number</div>
                      <div className="text-sm">{drug.batchNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        Expires:{" "}
                        {new Date(drug.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Cost per Unit</div>
                      <div className="text-2xl font-bold">
                        ${drug.cost.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Storage</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Thermometer className="h-4 w-4" />
                        {drug.storageConditions}
                      </div>
                    </div>
                  </div>

                  {drug.currentStock <= drug.minimumStock && (
                    <div className="flex items-center gap-2 mt-4 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">
                        Stock level is below minimum threshold
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DrugStock;
