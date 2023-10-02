"use client";

import { useSession } from "next-auth/react";

export const Dashboard = () => {
 const { data } = useSession();
 const userFirstName = data?.user?.name?.split(" ")[0];

 return (
  <div className="hidden flex-col md:flex">
   <div className="flex-1 space-y-4 p-8 pt-6">
    <div className="flex items-center justify-between space-y-2">
     <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
     <div className="flex items-center space-x-2">{/* <CalendarDateRangePicker /> */}</div>
    </div>
    <p className="text-xl  tracking-tight">Witaj ponownie, {userFirstName}!</p>
    <h2>Cele</h2>
   </div>
  </div>
 );
};
