import Link from 'next/link';
import React from 'react';
import { footerDetails } from '../app/data/footer';
import { siteDetails } from '../app/data/siteDetails';
import logo from '../public/thumbnail.svg';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="text-foreground pt-20 text-center">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-0">
            <Image
              src={logo}
              alt="logo"
              width={40} // em pixels
              height={40}
              className="w-36 h-auto"
            />
          </Link>
          <p className="text-foreground-accent">{footerDetails.subheading}</p>
        </div>
      </div>
      <div className="my-2 md:text-center text-foreground-accent px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
