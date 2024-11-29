import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, DollarSign, BarChart2, AlertTriangle } from "lucide-react";
import { useReportingStore } from "@/lib/store/reportingStore";
import { useMaterialStore } from "@/lib/store/materialStore";

const MaterialReports = () => {
  const { materialMetrics } = useReportingStore();
  const { materials } = useMaterialStore();

  const getMaterialName = (materialId: string) => {
    const material = materials.find((m) => m.id === materialId);
    return material ? material.name : "Unknown Material";
  };

  const getUtilizationColor = (rate: number) => {
    if (rate >= 0.9) return "bg-green-100 text-green-800";
    if (rate >= 0.7) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Material Usage Reports</h3>
          <p className="text-sm text-muted-foreground">
            Analysis of material consumption and costs
          </p>
        </div>
        <Button>
          <BarChart2 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Avg Consumption Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                (materialMetrics.reduce(
                  (acc, m) => acc + m.consumptionRate,
                  0,
                ) /
                  materialMetrics.length) *
                100
              ).toFixed(1)}
              %
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Avg Cost Per Use
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(
                materialMetrics.reduce((acc, m) => acc + m.costPerUse, 0) /
                materialMetrics.length
              ).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Stockout Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {materialMetrics.reduce((acc, m) => acc + m.stockoutIncidents, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Material Usage Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {materialMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">
                      {getMaterialName(metric.materialId)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Period: {metric.period} | Reorder Frequency:{" "}
                      {metric.reorderFrequency} days
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="secondary"
                      className={getUtilizationColor(metric.consumptionRate)}
                    >
                      Utilization: {(metric.consumptionRate * 100).toFixed(1)}%
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Cost/Use: ${metric.costPerUse.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialReports;
