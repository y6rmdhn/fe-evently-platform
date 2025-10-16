import PageHead from "@/components/commons/PageHead";
import React, { ReactNode, useState } from "react";
import DasboardLayoutSidebar from "./DasboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DasboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropsType {
  title?: string;
  children: ReactNode;
  type?: string;
  desc: string;
}

const DasboardLayout = (props: PropsType) => {
  const { title, desc, children, type = "admin" } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DasboardLayoutSidebar
          isOpen={open}
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="text-small mb-4">{desc}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DasboardLayout;
