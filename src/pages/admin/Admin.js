import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { GoLaw, GoPeople } from "react-icons/go";
import { FaExclamation } from "react-icons/fa";

const Admin = (props) => {
  const navigate = useNavigate();
  const sideBarItems = [
    {
      id: 3,
      name: "Ulanyjylar",
      href: "/admin/ulanyjylar",
      icon: <GoPeople />,
    },
    {
      id: 1,
      name: "Kanunlar",
      href: "/admin/kanunlar",
      icon: <GoLaw />,
    },
    {
      id: 2,
      name: "Jenaýatçylar",
      href: "/admin/jenayatcylar",
      icon: <FaExclamation />,
    },
  ];

  const handleClick = (item) => {
    navigate(item.href);
  };

  return (
    <div className="flex mt-[15px] gap-[15px] px-[50px] text-[#141446]">
      <div className="flex  flex-col gap-[5px]">
        {sideBarItems.map((item, index) => (
          <p
            className={`${
              item?.href == window.location.pathname && "bg-blue-800 text-white"
            } select-none flex gap-[10px] items-center  px-[20px] py-[7px] text-[18px] cursor-pointer rounded-md hover:bg-blue-800 hover:text-white`}
            onClick={() => handleClick(item)}
          >
            {item.icon}
            {item.name}
          </p>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Admin;
