import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSurgeryStore } from "@/lib/store/surgeryStore";
import { usePatientStore } from "@/lib/store/patientStore";

const surgeryFormSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  surgeryTypeId: z.string().min(1, "Please select a surgery type"),
  scheduledDate: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  operatingRoom: z.string().min(1, "Operating room is required"),
  surgeons: z.array(z.string()).min(1, "At least one surgeon is required"),
  nurses: z.array(z.string()).min(1, "At least one nurse is required"),
  anesthesiologist: z.string().min(1, "Anesthesiologist is required"),
  notes: z.string().optional(),
});

type SurgeryFormValues = z.infer<typeof surgeryFormSchema>;

interface SurgeryScheduleFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SurgeryScheduleForm = ({
  open = false,
  onOpenChange = () => {},
}: SurgeryScheduleFormProps) => {
  const { surgeryTypes, scheduleSurgery } = useSurgeryStore();
  const { patients } = usePatientStore();

  const form = useForm<SurgeryFormValues>({
    resolver: zodResolver(surgeryFormSchema),
    defaultValues: {
      patientId: "",
      surgeryTypeId: "",
      scheduledDate: "",
      startTime: "",
      endTime: "",
      operatingRoom: "",
      surgeons: [],
      nurses: [],
      anesthesiologist: "",
      notes: "",
    },
  });

  const handleSubmit = (values: SurgeryFormValues) => {
    try {
      scheduleSurgery(values);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      // Handle scheduling conflict
      if (error instanceof Error) {
        form.setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>Schedule Surgery</DialogTitle>
          <DialogDescription>
            Schedule a new surgery. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.firstName} {patient.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surgeryTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surgery Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select surgery type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {surgeryTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="operatingRoom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating Room *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select operating room" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OR-1">OR-1</SelectItem>
                      <SelectItem value="OR-2">OR-2</SelectItem>
                      <SelectItem value="OR-3">OR-3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Additional notes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Schedule Surgery</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SurgeryScheduleForm;
