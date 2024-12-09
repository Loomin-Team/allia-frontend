"use client";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";

interface HeaderProps {
  setSidebarVisible: (visible: boolean) => void;
  sidebarVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({
  setSidebarVisible,
  sidebarVisible,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const userName = useAuthStore((state) => state.user?.fullname);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1024;
      setIsSmallScreen(isSmall);
      setSidebarVisible(!isSmall);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarVisible]);

  const toggleSidebar = () => {
    if (isSmallScreen) {
      setSidebarVisible(!sidebarVisible);
    }
  };

  return (
    <div className="flex justify-between items-center text-white lg:ml-64">
      <div className="flex-shrink-0">
        <img src="/icons/BrandingLogo.svg" alt="Logo" width={80} height={80} />
      </div>

      <div className="flex gap-2 items-center">
        <ProfileDropdownMenu />

        {/* Menu toggle for small screens */}
        {isSmallScreen && (
          <div
            onClick={toggleSidebar}
            className="block lg:hidden cursor-pointer"
          >
            {sidebarVisible ? <BiX size={30} /> : <BiMenu size={30} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
