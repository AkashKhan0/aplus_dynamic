import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const excludedRoutes = ["login", "signup"];
  const isExcludedRoutes = excludedRoutes.includes(location.pathname);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {isExcludedRoutes && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="relative flex">
          {isExcludedRoutes && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}
          <main>
            <div
              className={`mx-auto max-w-screen-2xl ${isExcludedRoutes}?'':'p-4 md:p-6 2xl:p-10'`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
