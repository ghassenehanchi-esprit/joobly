'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
  }

  return pathname !== '/main' ? (
    <footer className="min-h-[101px] py-10 bg-dark text-light">
      <div className="container flex flex-col-reverse items-center gap-10 text-center md:flex-row md:justify-start md:gap-10">
        <p className="text-sm font-normal leading-5">
          © {getCurrentYear()} <b>Joobly.cz</b>. All rights reserved
        </p>
        <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
          <Link href="/" className="text-sm font-normal text-light">
            Home
          </Link>
          <Link href="/jobs" className="text-sm font-normal text-light">
            Find a job
          </Link>
          <Link href="/Post-job-info" className="text-sm font-normal text-light">
            Post a job
          </Link>
          <Link href="/packages" className="text-sm font-normal text-light">
            Packages
          </Link>
          <Link href="/contact" className="text-sm font-normal text-light">
            Contact
          </Link>
        </div>
        <div className="flex justify-center w-full md:w-auto md:ml-auto">
          <Link
            target={'_blank'}
            href="https://praguemorning.cz/privacy-policy/"
            className="text-sm font-normal leading-5 text-light">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;