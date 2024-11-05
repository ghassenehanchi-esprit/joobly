'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './footer.scss';

const Footer = () => {
  const pathname = usePathname();

  function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
    
  }

  return pathname !== '/main' ? (
    <footer>
      <div className="container">
        <p className="copyright">
          © {getCurrentYear()} <b>Joobly.cz</b>. All rights reserved
        </p>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/jobs" className="nav-link">
            Find a job
          </Link>
          <Link href="/Post-job-info" className="nav-link">
            Post a job
          </Link>
          <Link href="/packages" className="nav-link">
            Packages
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </div>
        <div className="nav-policy">
          <Link
            target={'_blank'}
            href="https://praguemorning.cz/privacy-policy/"
            className="nav-link">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
