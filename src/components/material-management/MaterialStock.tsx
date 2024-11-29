import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, AlertTriangle, Package } from "lucide-react";
import { useMaterialStore } from "@/lib/store/materialStore";

const MaterialStock = () => {
  const { materials } = useMaterialStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredMaterials = React.useMemo(() => {
    return materials.filter(
      (material) =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [materials, searchTerm]);

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= minimum) {
      return { color: "destructive", text: "Low Stock" };
    } else if (current <= minimum * 1.5) {
      return { color: "warning", text: "Running Low" };
    }
    return { color: "success", text: "In Stock" };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Material Inventory</h3>
          <p className="text-sm text-muted-foreground">
            Track and manage surgical materials and equipment
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredMaterials.map((material) => {
            const status = getStockStatus(
              material.currentStock,
              material.minimumStock,
            );
            return (
              <Card key={material.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {material.name}
                        <Badge variant="outline">{material.code}</Badge>
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {material.category.charAt(0).toUpperCase() +
                          material.category.slice(1)}
                      </div>
                    </div>
                    <Badge
                      variant={
                        status.color as "default" | "destructive" | "warning"
                      }
                    >
                      {status.text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm font-medium">Current Stock</div>
                      <div className="text-2xl font-bold">
                        {material.currentStock}
                        <span className="text-sm text-muted-foreground ml-1">
                          {material.unit}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Minimum Stock</div>
                      <div className="text-2xl font-bold">
                        {material.minimumStock}
                        <span className="text-sm text-muted-foreground ml-1">
                          {material.unit}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Cost per Unit</div>
                      <div className="text-2xl font-bold">
                        ${material.cost.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Last Restocked</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(material.lastRestocked).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {material.currentStock <= material.minimumStock && (
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

export default MaterialStock;
