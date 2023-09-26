import icono from "./assets/favicon.ico"
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs"
import { Menus } from "./assets/Menus"
import { RiDashboardFill } from "react-icons/ri"
import React, { useState } from 'react';


export default function Sidebar({open, setOpen, submenuOpen, setSubmenuOpen}){
  const [iconsVisible, setIconsVisible] = useState(true);
    return(
        <div
        className={`sidebar bg-amber-300 sm:bg-dark-purple h-screen p-5 pt-8 ${
          open  ? "w-72 h-screen bg-dark-purple  " : "w-20 h-20 sm:h-screen "
        } duration-300  relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl 
          rounded-full absolute -right-3 top-20 border
          border-dark-purple cursor-pointer md:block hidden ${!open && "rotate-180"}`}
          onClick={() => 
            {setOpen(!open);
            } }
        />

        <div className="inline-flex">
        <button
          className={`bg-amber-300 p-1 rounded block float-left -my-2 mr-2 duration-700 w-10 h-10 ${
            open ? "rotate-[360deg]" : ""
          }`}
          onClick={() => {
            setOpen(!open);
            setIconsVisible(!iconsVisible);
            
            // Agrega aquí la función que quieres que se ejecute al hacer clic en el botón
          }}
        >
          <img
            src={icono}
            alt="icono"
            style={{ height: "30px" }}
            className="w-7 h-4" // Ajusta el tamaño de la imagen como desees
          />
        </button>
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            SmartCity
          </h1>
        </div>

        <ul className={`pt-2 md:block ${iconsVisible ? "hidden" : ""}`}>
          {Menus.map((menu, index) => {
            return (
              <>
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md 
                  ${menu.spacing ? "mt-9" : "mt-2"}`}
                >
                  <span className="text-2xl block float-left">
                    <a href={menu.link}>{menu.icon ? menu.icon : <RiDashboardFill />}</a>
                  </span>
                  <span
                    className={`text-base font-medium flex-1 ${
                      !open && "hidden"
                    }`}
                    onClick={() => setSubmenuOpen(index)}
                  >
                    {menu.submenu ? (
                      menu.title
                    ) : (
                      <a
                        href={menu.link}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {menu.title}
                      </a>
                    )}
                  </span>
                  {menu.submenu && open && (
                    <BsChevronDown
                      className={`${submenuOpen === index && "rotate-180"}`}
                      onClick={() => setSubmenuOpen(index)}
                    />
                  )}
                </li>
                {menu.submenu && submenuOpen === index && open && (
                  <ul>
                    {menu.submenuItems.map((submenuItem, index) => {
                      return (
                        <li
                          key={index}
                          className="text-gray-300 text-sm flex items-center gap-x-4
                      cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                        >
                          <a
                            href={submenuItem.link}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            {submenuItem.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            );
          })}
        </ul>
      </div>
    )
}