
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ShowcaseForm from './ShowcaseForm';
import { ShowcaseFormValues } from '@/schemas/showcaseSchema';
import { Showcase } from '@/types/database';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShowcase, updateShowcase } from '@/services/showcaseService';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface ShowcaseFormDialogProps {
  showcase?: Showcase;
  trigger?: React.ReactNode;
}

const ShowcaseFormDialog: React.FC<ShowcaseFormDialogProps> = ({ showcase, trigger }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const createMutation = useMutation({
    mutationFn: createShowcase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showcases'] });
      setOpen(false);
      toast({
        title: "Success!",
        description: "Showcase site has been created successfully.",
      });
    },
    onError: (error) => {
      console.error("Error creating showcase:", error);
      toast({
        title: "Error",
        description: "Failed to create showcase site. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Showcase> }) => 
      updateShowcase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showcases'] });
      setOpen(false);
      toast({
        title: "Success!",
        description: "Showcase site has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating showcase:", error);
      toast({
        title: "Error",
        description: "Failed to update showcase site. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = async (data: ShowcaseFormValues) => {
    console.log("ShowcaseFormDialog - Form data before submitting:", data);
    
    try {
      if (showcase) {
        // For updating, convert form data to Showcase format
        const showcaseData: Partial<Showcase> = {
          client_name: data.client_name,
          description: data.description,
          image_url: data.image_url as string,
          site_url: data.site_url,
          category_id: data.category_id,
          featured: data.featured
        };
        
        console.log("Updating showcase with ID:", showcase.id);
        console.log("Update payload:", showcaseData);
        
        await updateMutation.mutateAsync({ 
          id: showcase.id, 
          data: showcaseData
        });
      } else {
        // For creation, convert form data to expected format
        const newShowcaseData = {
          client_name: data.client_name,
          description: data.description,
          image_url: data.image_url as string,
          site_url: data.site_url,
          category_id: data.category_id,
          featured: data.featured
        };
        
        console.log("Creating new showcase with data:", newShowcaseData);
        
        await createMutation.mutateAsync(newShowcaseData as unknown as Omit<Showcase, 'id' | 'created_at' | 'updated_at'>);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Showcase Site
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={`${isMobile ? 'w-[95vw] p-4' : 'max-w-3xl'} overflow-y-auto max-h-[90vh]`}>
        <DialogHeader>
          <DialogTitle>{showcase ? 'Edit' : 'Add'} Showcase Site</DialogTitle>
          <DialogDescription>
            Fill in the fields below to {showcase ? 'edit' : 'add'} a showcase site.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <ShowcaseForm 
            showcase={showcase}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowcaseFormDialog;
