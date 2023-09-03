import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";
import "./SiteEntry.css";
import { useApp } from "../Context/AppContext";

function NavBarSE() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(useApp().isLogged());
  const { logout } = useApp();
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <Navbar
      className="navbar"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="bg-blur" />
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="navbarcontent sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">DAILY</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="navbarcontent hidden sm:flex gap-4"
        justify="center"
      >
        <img className="h-8" src="/logo.png" alt="Logo" />
        <NavbarBrand>
          <p className="font-bold text-inherit">DAILY</p>
        </NavbarBrand>
        <NavbarItem>
          <Link href="#">Features</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Integrations</Link>
        </NavbarItem>
      </NavbarContent>

      {isLoggedIn ? (
            <button
              onClick={()=>handleLogout()}
              className="px-2 py-1 justify-end bg-second-t border-second text-white-t font-semibold"
            >
              Log Out
            </button>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="flex ">
            <Link className="text-second" href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className="bg-second-t text-white-t font-semibold border-second"
              href="/signup"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBarSE;
