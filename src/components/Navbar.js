import React from "react";
import logo from "../images/logo.png";
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Gözleg",
      href: "/gozleg",
    },
    {
      name: "Administrator",
      href: "/admin/ulanyjylar",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center bg-blue-800 h-[75px] px-[50px] sticky top-[0]">
        <div className="flex gap-[10px] items-center">
          <img className="h-[70px] cursor-pointer" src={logo} alt="Logo" />
          <h2 className="text-white text-[18px] uppercase tracking-[0.7px]">
            Türkmenistanyň Oguz han adyndaky Inžener-tehnologiýalar uniwersiteti
          </h2>
        </div>
        <div className="flex gap-[20px] text-white text-[18px] tracking-[0.7px]">
          {navItems.map((item, index) => (
            <p
              className=" border-b-white cursor-pointer"
              onClick={() => navigate(item.href)}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
