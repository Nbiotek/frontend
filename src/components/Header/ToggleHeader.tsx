'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from './DesktopHeader';
import MobileHeader from './MobileHeader';

const ToggleHeader: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [showMobileHeader, setShowMobileHeader] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setMounted(true);

    const checkMobile = window.innerWidth <= 768;
    setShowMobileHeader(checkMobile);

    if (mounted) {
      setShowMobileHeader(isMobile);
    }
  }, [isMobile, mounted]);

  if (!mounted) {
    return (
      <>
        <div className="block md:block lg:block">
          <Header />
        </div>
        <div className="hidden">
          <MobileHeader />
        </div>
      </>
    );
  }

  return showMobileHeader ? <MobileHeader /> : <Header />;
};

export default ToggleHeader;
