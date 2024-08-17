import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut, MenuIcon } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
      <nav className="py-4 px-20 bg-white mb-6 flex justify-between items-center rounded-full border-2 border-emerald-500">
        <Link to="/">
          <div>
            <img src={logo} alt="logo" className="w-40" />
          </div>
        </Link>
        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}> Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex  w-30">
                <div className="flex pr-3 rounded-full flex-row items-center bg-emerald-500">
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      className="object-cover"
                    />
                    <AvatarFallback>EA</AvatarFallback>
                  </Avatar>
                  <MenuIcon />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NavLink to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
