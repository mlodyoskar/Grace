"use client";

import { iconSet } from "@/app/(main-layout)/categories/new-category-form";
import { CategoryIcon, Color } from "@/db/schema";
import { formatMoney } from "@/lib/utils";

interface Props {
 expenses: {
  name: string;
  amount: number;
  percentOfTotal: number;
  icon: CategoryIcon;
  color: Color;
 }[];
}

export const MonthlySpendings = ({ expenses }: Props) => {
 return (
  <div className="flex flex-col gap-3">
   {expenses.map(({ name, amount, percentOfTotal, icon, color }) => {
    const percent = Number((percentOfTotal * 100).toFixed());
    const amountFormatted = formatMoney(amount);

    const iconComponent = iconSet.find((i) => i.name === icon)?.icon;

    return (
     <div className="flex items-center justify-between" key={name}>
      <div className="flex items-center gap-1">
       {/* <div className="h-2 w-2 bg-indigo-600 rounded-full" /> */}
       <span className={`text-${color}-600`}>{iconComponent}</span>
       <p className="">{name}</p>
      </div>
      <div className="flex gap-2 justify-between">
       <p className="text-sm text-gray-700 text-left">{amountFormatted}</p>
       <p className="text-sm font-semibold">{percent}%</p>
      </div>
     </div>
    );
   })}
  </div>
 );
};
