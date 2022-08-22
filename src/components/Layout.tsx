import Head from "next/head";
import { ReactElement } from "react";
import { HeaderDashboard } from "./HeaderDashboard";

interface LayoutProps {
  title: string;
  children?: ReactElement[] | ReactElement;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} - SX&CO</title>
      </Head>
      <HeaderDashboard />
      <div className="p-8">{children}</div>
    </>
  );
}
