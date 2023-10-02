import { Dashboard } from "@/components/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: "Grace | Dashboard",
 description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
 return (
  <>
   <Dashboard />
  </>
 );
}
