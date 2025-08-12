import React from "react";
import "./Footer.css";
import IconButton from "../IconButton";

const Footer = () => {
  return (
    <div>
      <div className="footer w-full px-2 sm:px-5 md:px-14 flex items-center justify-center relative">
        <div className="max_w py-3">
          {/* Footer */}

          <div className="w-full flex flex-col gap-2 items-center justify-center">
            {/* footer top box */}
            <div className="w-full flex items-center justify-center">
              <p className="text-sm text-center">
                © 2024 Aplus Advertising Limited. All rights reserved.
              </p>
            </div>

            {/* footer solcial icon */}
            <div className="w-full flex items-center justify-center">
              <IconButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
