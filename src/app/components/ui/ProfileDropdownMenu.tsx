"use client";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";

export const ProfileDropdownMenu = () => {
  const user = useAuthStore((state) => state.user)!;
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Menu>
      <div className="relative">
        <MenuButton className="flex justify-center items-center text-primary p-2 gap-2">
          <div className="bg-accent p-1 rounded-full flex items-center justify-center text-white text-lg font-bold w-10 h-10">
            {user?.fullname?.charAt(0).toUpperCase() || "?"}
          </div>
          <span className="hidden md:block text-white">
            {user?.fullname || "Guest"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="white"
            className="size-4 duration-200 hidden md:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </MenuButton>
        <MenuItems className="absolute right-0 bg-tertiary rounded-lg divide-y divide-gray-200 shadow-lg focus:outline-none z-50">
          <MenuItem>
            <button
              onClick={handleLogout}
              className="flex items-center whitespace-nowrap text-white p-2 gap-1 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#FFFFFF"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Log Out
            </button>
          </MenuItem>
        </MenuItems>
      </div>
    </Menu>
  );
};
