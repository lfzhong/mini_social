import React from 'react';
import { APP_NAME } from '@/utils/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600">
          <p>
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="mt-1">
            A simple social platform for sharing messages with the community.
          </p>
        </div>
      </div>
    </footer>
  );
};

