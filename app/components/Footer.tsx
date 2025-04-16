import Link from 'next/link';
import React from 'react';
import { FaFingerprint } from 'react-icons/fa';

import { footerDetails } from '../data/footer';
import { getPlatformIconByName } from '../utils/utils';
import { siteDetails } from '../data/siteDetails';

const Footer: React.FC = () => {
  return (
    <footer className="text-foreground pt-10 text-center">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-1">
            <siteDetails.siteIcon className="min-w-fit w-5 h-5 md:w-7 md:h-7" />
            <h3 className="manrope text-xl md:text-3xl font-semibold cursor-pointer">{siteDetails.siteName}</h3>
          </Link>
          <p className="text-foreground-accent">{footerDetails.subheading}</p>
        </div>

        {/* <div>
          <h4 className="text-lg font-semibold mb-4">Contato</h4>

          {footerDetails.email && (
            <a
              href={`mailto:${footerDetails.email}`}
              className="block text-foreground-accent hover:text-foreground">
              Email: {footerDetails.email}
            </a>
          )}

          {footerDetails.telephone && (
            <a
              href={`tel:${footerDetails.telephone}`}
              className="block text-foreground-accent hover:text-foreground">
              Phone: {footerDetails.telephone}
            </a>
          )}

          {footerDetails.socials && (
            <div className="mt-5 flex items-center gap-5 flex-wrap">
              {Object.keys(footerDetails.socials).map((platformName) => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]}
                      key={platformName}
                      aria-label={platformName}>
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div> */}
      </div>
      <div className="my-2 md:text-center text-foreground-accent px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.
        </p>
        {/* <p className="text-sm mt-2 text-gray-500">Made with &hearts; by <a href="https://nexilaunch.com" target="_blank">Nexi Launch</a></p>
                <p className="text-sm mt-2 text-gray-500">UI kit by <a href="https://ui8.net/youthmind/products/fintech-finance-mobile-app-ui-kit" target="_blank">Youthmind</a></p> */}
      </div>
    </footer>
  );
};

export default Footer;
