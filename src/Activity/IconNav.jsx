import React from "react";
import {HiSquares2X2} from 'react-icons/hi2'
import {IoCalendarOutline,IoSettingsOutline} from 'react-icons/io5'
import {IoIosArrowRoundForward} from 'react-icons/io'
import { useApp } from "../Context/AppContext";
import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";

function IconNav() {
  const navigate = useNavigate();
  const [setIsLoggedIn] = React.useState(useApp().isLogged());
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    console.log("logot")
    navigate('/login')
  };

    const icons = [
        {
            logo: HiSquares2X2,
            link: "#",
        },
        {
            logo: IoCalendarOutline,
            link: "#",
        },
        {
            logo: IoSettingsOutline,
            link: "#",
        },
        {
          logo: BiLogOut,
          link: "/login",
          action: handleLogout,
        }
    ]

  return (
    <div className="activitypanel h-screen">
      <div className="panel-icons py-10 flex flex-col gap-10 justify-center items-center">
      <IoIosArrowRoundForward
          className="border-2 border-white rounded-full cursor-pointer"
          color="white"
          size={32}
        />
        <a href="#">
          <img
            className="w-8 rounded-full"
            src="/MLogo.jpg"
            alt="Logo"
          />
        </a>
        {icons.map((icon, index) => (
          <button
            className="transition ease-in-out hover:bg-blue-500 rounded-xl p-1"
            key={index}
            onClick={icon.action ? icon.action : ""}

          >
            <icon.logo color="white" size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default IconNav;
