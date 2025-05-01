
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const HeaderAdminLink: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the admin is logged in
    const checkLoginStatus = () => {
      const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      setIsLoggedIn(adminLoggedIn);
    };

    // Check initially
    checkLoginStatus();

    // Listen for storage events (if user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Only show admin link if user is authenticated
  if (!isLoggedIn) return null;

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
