import React from 'react';
import { UserProvider } from '@site/src/contexts/UserContext';
import LoginGate from '@site/src/components/LoginGate';
import NavbarUserBadge from '@site/src/components/NavbarUserBadge';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <LoginGate>
        <NavbarUserBadgeInjector />
        {children}
      </LoginGate>
    </UserProvider>
  );
}

/**
 * Injects the NavbarUserBadge into the navbar's right side.
 * This runs as a side-effect component on mount (client-side only).
 */
function NavbarUserBadgeInjector(): React.ReactElement | null {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Wait for navbar to render, then find the right-side items container
    const findTarget = () => {
      const navbarRight = document.querySelector('.navbar__items--right');
      if (navbarRight && !document.getElementById('anshin-user-badge-slot')) {
        const slot = document.createElement('div');
        slot.id = 'anshin-user-badge-slot';
        navbarRight.prepend(slot);
        setTarget(slot);
      }
    };

    // Retry a few times in case navbar hasn't mounted yet
    findTarget();
    const timer = setTimeout(findTarget, 500);
    const timer2 = setTimeout(findTarget, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  if (!target) return null;

  // Use a React portal to render into the navbar slot
  const ReactDOM = require('react-dom');
  return ReactDOM.createPortal(<NavbarUserBadge />, target);
}
