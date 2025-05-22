
import React from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      <div className="flex-1 pl-64">
        <AppHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
