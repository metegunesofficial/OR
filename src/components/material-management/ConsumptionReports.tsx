import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, TrendingUp, DollarSign, Package, Pill } from "lucide-react";
import { useMaterialStore } from "@/lib/store/materialStore";

const ConsumptionReports = () => {
  const { materials, drugs, usageLogs } = useMaterialStore();

  // Calculate consumption statistics
  const calculateStats = () => {
    const materialStats = new Map();
    const drugStats = new Map();
    let totalCost = 0;

    usageLogs.forEach((log) => {
      totalCost += log.totalCost;
      log.items.forEach((item) => {
        const stats = item.itemType === "material" ? materialStats : drugStats;
        const current = stats.get(item.itemId) || { quantity: 0, cost: 0 };
        stats.set(item.itemId, {
          quantity: current.quantity + item.quantity,
          cost: current.cost + item.cost,
        });
      });
    });

    return {
      materialStats,
      drugStats,
      totalCost,
    };
  };

  const stats = calculateStats();

  const getMostUsedItems = (type: "material" | "drug") => {
    const items = type === "material" ? materials : drugs;
    const itemStats =
      type === "material" ? stats.materialStats : stats.drugStats;

    return Array.from(itemStats.entries())
      .map(([id, data]) => ({
        item: items.find((i) => i.id === id),
        ...data,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Consumption Reports</h3>
          <p className="text-sm text-muted-foreground">
            Analyze material and drug usage patterns
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usageLogs.length} surgeries
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalCost.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Most Used Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {getMostUsedItems("material").map((data, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border rounded"
                  >
                    <div>
                      <div className="font-medium">{data.item?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {data.quantity} {data.item?.unit}
                      </div>
                    </div>
                    <Badge variant="secondary">${data.cost.toFixed(2)}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Most Used Drugs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {getMostUsedItems("drug").map((data, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border rounded"
                  >
                    <div>
                      <div className="font-medium">{data.item?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {data.quantity} {data.item?.unit}
                      </div>
                    </div>
                    <Badge variant="secondary">${data.cost.toFixed(2)}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumptionReports;
