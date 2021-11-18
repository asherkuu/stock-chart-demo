import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(router.pathname);
  }, [router.pathname]);

  return (
    <header>
      <ul>
        <li>
          <Link href="/">
            <a className={path === "/" ? "menu-active" : ""}>메인</a>
          </Link>
        </li>
        <li>
          <Link href="/stock-chart">
            <a className={path === "/stock-chart" ? "menu-active" : ""}>차트</a>
          </Link>
        </li>
        <li>
          <Link href="/order-book">
            <a className={path === "/order-book" ? "menu-active" : ""}>
              호가창
            </a>
          </Link>
        </li>
        <li>
          <Link href="/market-trade">
            <a className={path === "/market-trade" ? "menu-active" : ""}>
              체결
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
