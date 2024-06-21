import SideNav from "@/components/sideMenu/sidenav";
import TopNav from "@/components/topNav/topnav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen flex-col">
      <TopNav />
      <div className="flex flex-1 overflow-hidden md:flex-row">
        <SideNav />
        <div className={`flex-grow overflow-y-auto p-4`}>{children}</div>
      </div>
    </main>
  );
}
