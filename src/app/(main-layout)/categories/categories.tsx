"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryType } from "@/db/schema";
import { iconSet } from "./new-category-form";
import { Separator } from "@/components/ui/separator";

interface Props {
 title: string;
 categories: CategoryType[];
}

export const CategoriesSummary = ({ categories, title }: Props) => {
 return (
  <>
   <CardHeader className="p-4 pb-0">
    <CardTitle className="text-xl mb-4">{title}</CardTitle>
   </CardHeader>
   <CardContent className="px-0">
    {categories.map(({ id, name, icon, color }) => {
     const iconElement = iconSet.find((i) => i.name === icon);

     console.log({ icon, color });
     return (
      <div className="flex flex-col p-2" key={id}>
       <div className="flex gap-2 p-1">
        <span className={`text-${color}-600`}>{iconElement?.icon}</span>
        <p>{name}</p>
       </div>
       <Separator className="mt-2" />
      </div>
     );
    })}
   </CardContent>
  </>
 );
};
