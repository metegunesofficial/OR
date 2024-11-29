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
import { useSurgeryStore } from "@/lib/store/surgeryStore";

const surgeryTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  estimatedDuration: z.number().min(1, "Duration must be at least 1 minute"),
  requiredEquipment: z
    .array(z.string())
    .min(1, "At least one equipment item is required"),
  requiredStaff: z.object({
    surgeons: z.number().min(1),
    nurses: z.number().min(1),
    anesthesiologists: z.number().min(1),
  }),
  preOpRequirements: z.array(z.string()),
  postOpRequirements: z.array(z.string()),
  sterilizationRequirements: z.array(z.string()),
});

type SurgeryTypeFormValues = z.infer<typeof surgeryTypeSchema>;

interface SurgeryTypeFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SurgeryTypeForm = ({
  open = false,
  onOpenChange = () => {},
}: SurgeryTypeFormProps) => {
  const { addSurgeryType } = useSurgeryStore();

  const form = useForm<SurgeryTypeFormValues>({
    resolver: zodResolver(surgeryTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      estimatedDuration: 60,
      requiredEquipment: [],
      requiredStaff: {
        surgeons: 1,
        nurses: 2,
        anesthesiologists: 1,
      },
      preOpRequirements: [],
      postOpRequirements: [],
      sterilizationRequirements: [],
    },
  });

  const handleSubmit = (values: SurgeryTypeFormValues) => {
    addSurgeryType(values);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>Add Surgery Type</DialogTitle>
          <DialogDescription>
            Define a new type of surgery and its requirements.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgery Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Appendectomy" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Brief description of the surgery"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="requiredStaff.surgeons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Surgeons</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiredStaff.nurses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Nurses</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiredStaff.anesthesiologists"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Anesthesiologists</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Surgery Type</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SurgeryTypeForm;
