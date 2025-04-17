"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Clients", href: "/clients" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-16 items-center">
      <Link href="/">
        <Image
          src="/images/elana-logo.jpg"
          alt="logo"
          width={140}
          height={80}
          style={{ height: "auto" }}
          priority
        />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-900": currentPath === link.href,
              "text-zinc-500": currentPath !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
