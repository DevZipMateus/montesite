
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  isEdit: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, isEdit }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEdit ? 'Atualizar' : 'Criar'} Template
      </Button>
    </div>
  );
};

export default SubmitButton;
