"use client";

import { Sidebar } from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./index.css";
import menuItems from "./menu-items";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../Context";

const SidebarComponent = ({ tab, setTab, setDropPosition, dropPosition }) => {
  const { setNodeIdx, nodes } = useContext(MyContext);
  const [{ left, top }, setPosition] = useState({ left: 0, top: 0 });
  const [{ clientX, clientY }, setClient] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ dropPosition:", dropPosition);
  }, [dropPosition]);
  const dragEnd = (e) => {
    e.preventDefault();
    setDropPosition({ x: e.clientX, y: e.clientY });

    // console.log("🚀 ~ SidebarComponent ~ clientX:", e.clientX);
    // console.log("🚀 ~ SidebarComponent ~ clientY:", e.clientY);
    // setDropPosition({ x: e.clientX - 160, y: e.clientY - 160 });
    setTab(e.target.innerText);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <Sidebar aria-label="Default sidebar example" className="sidebar">
      <Sidebar.Logo
        className="logo"
        href="#"
        img="logo.svg"
        imgAlt="Calculator Logo"
      >
        <h3>DnD-Calculator</h3>
      </Sidebar.Logo>

      <Sidebar.Items
        className="items"
        onClick={(e) => {
          setTab(e.target.innerText);
          setNodeIdx(nodes.length + 1);
        }}
        onDragOver={dragOver}
      >
        <Sidebar.ItemGroup className="item-group" onDragOver={dragOver}>
          {menuItems.map((item, index) => (
            <Sidebar.Item
              icon={item.icon}
              className="item box"
              key={index}
              draggable="true"
              // onDragStart={dragStart}
              onDrag={(e) => {
                console.log("🚀 ~ SidebarComponent ~ clientX:", e.clientX);
                console.log("🚀 ~ SidebarComponent ~ clientY:", e.clientY);
                // setDropPosition({ x: e.clientX, y: e.clientY });
              }}
              onDragOver={(e) => {
                setClient({ clientX: e.clientX, clientY: e.clientY });
              }}
              // onDragEnd={dragEnd}

              onDragStart={(e) => {
                setClient({ clientX: e.clientX, clientY: e.clientY });
              }}
              onDragEnd={
                dragEnd
                //   (e) => {
                //   const clientRect = e.currentTarget.getBoundingClientRect();
                //   console.log("🚀 ~ SidebarComponent ~ clientX:", clientX);
                //   console.log("🚀 ~ SidebarComponent ~ clientY:", clientY);
                //   e.preventDefault();
                //   setDropPosition({
                //     x: e.clientX,
                //     y: e.clientY,
                //   });
                //   setTab(e.target.innerText);

                //   setPosition({
                //     left: clientRect.left + e.clientX - clientX,
                //     top: clientRect.top + e.clientY - clientY,
                //   });
                // }
              }
            >
              <div className="item-content">
                {item.label}
                <RxHamburgerMenu className="hamburger-icon" />
              </div>
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarComponent;
