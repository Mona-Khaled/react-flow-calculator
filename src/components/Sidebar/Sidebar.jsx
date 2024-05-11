"use client";

import { Sidebar } from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./index.css";
import menuItems from "./menu-items";
import { useContext, useState } from "react";
import MyContext from "../../Context";
import { BsTextIndentRight, BsTextIndentLeft } from "react-icons/bs";

const SidebarComponent = ({ tab, setTab, setDropPosition, dropPosition }) => {
  const { setNodeIdx, nodes } = useContext(MyContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dragEnd = (e) => {
    e.preventDefault();
    setDropPosition({ x: e.clientX, y: e.clientY });
    setTab(e.target.innerText);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      <Sidebar
        aria-label="Default sidebar example"
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      >
        {!isCollapsed ? (
          <div
            style={{
              display: "flex",
              height: "50px",
              borderBottomColor: "#F3F4F6",
            }}
          >
            <div
              style={{
                width: "300px",
                backgroundColor: "#F3F4F6",
              }}
            >
              <img src="logo.svg" alt="logo" height="90%" />
            </div>
            <button
              onClick={toggleCollapse}
              style={{
                border: "none",
                backgroundColor: "#F3F4F6",
                width: "10%",
                cursor: "pointer",
                fontSize: "24px",
              }}
            >
              <BsTextIndentRight />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleCollapse}
            style={{
              border: "none",
              backgroundColor: "#1E272E",
              color: "#F3F4F6",
              cursor: "pointer",
              fontSize: "24px",
            }}
          >
            <BsTextIndentLeft />
          </button>
        )}

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
                  // setDropPosition({ x: e.clientX, y: e.clientY });
                }}
                onDragEnd={dragEnd}
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
    </>
  );
};

export default SidebarComponent;
