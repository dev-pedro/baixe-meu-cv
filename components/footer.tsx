import Link from 'next/link';
import React from 'react';
import { footerDetails } from '../app/data/footer';
import { siteDetails } from '../app/data/siteDetails';
import logo from '../public/thumbnail.svg';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="pt-20 text-center text-foreground">
      <div className="w-full mx-auto max-w-7xl">
        <div className="relative flex flex-col items-center ">
          <Link href="/" className="flex items-center h-20 gap-2 mb-0">
            <Image src={logo} alt="logo" fill />
          </Link>
        </div>
        <p className="text-foreground-accent">{footerDetails.subheading}</p>
      </div>
      <div className="px-6 my-2 md:text-center text-foreground-accent">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
