import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main
        className="p-4"
        style={{
          marginLeft: "var(--sidebar-width)",
          marginTop: "var(--header-height)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
