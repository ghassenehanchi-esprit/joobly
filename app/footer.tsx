'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './footer.scss';

const Footer = () => {
  const pathname = usePathname();

  return pathname !== '/main' ? (
    <footer>
      <div className="container">
        <p className="copyright">
          © 2023 <b>Joobly.cz</b>. All rights reserved
        </p>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            About
          </Link>
          <Link href="/" className="nav-link">
            Privacy
          </Link>
          <Link href="/" className="nav-link">
            Terms
          </Link>
          <Link href="/" className="nav-link">
            Blog
          </Link>
          <Link href="/" className="nav-link">
            Partners
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
