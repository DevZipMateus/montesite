
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const HeaderAdminLink: React.FC = () => {
  // In a real application, this would check if the user is authenticated and has admin rights
  return (
    <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
      <Link to="/admin" className="flex items-center gap-1">
        <Shield className="h-4 w-4" />
        <span>Admin</span>
      </Link>
    </Button>
  );
};

export default HeaderAdminLink;
