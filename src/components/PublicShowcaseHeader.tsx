
import React from 'react';

const PublicShowcaseHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass py-4 px-8 md:px-14 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-2xl font-bold text-primary tracking-tight">
          Monte<span className="text-foreground">Site</span>
        </div>
      </div>
    </header>
  );
};

export default PublicShowcaseHeader;
