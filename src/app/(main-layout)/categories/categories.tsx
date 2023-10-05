"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryType } from "@/db/schema";
import { iconSet } from "./new-category-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import React from "react";
import { useDialogsStore } from "@/lib/store";
import { DeleteCategoryDialog } from "./delete-category-dialog";

interface Props {
 title: string;
 categories: CategoryType[];
}

export const CategoriesSummary = ({ categories, title }: Props) => {
 const { setIsOpen, dialogs } = useDialogsStore();
 const isOpen = dialogs["delete-category"];
 const [selectedCategory, setSelectedCategory] = React.useState<number>();

 const handleIsOpen = (isOpen: boolean) => {
  setIsOpen("delete-category", isOpen);
 };

 const isDialogOpen = isOpen && selectedCategory !== undefined;

 return (
  <div>
   <CardHeader className="p-4 pb-0">
    <CardTitle className="text-xl mb-4">{title}</CardTitle>
   </CardHeader>
   <CardContent className="px-0">
    {categories.map(({ id, name, icon, color }) => {
     const iconElement = iconSet.find((i) => i.name === icon);

     return (
      <div className="flex flex-col p-2" key={id}>
       <div className="flex items-center justify-between">
        <div className="flex gap-2 p-1">
         <span className={`text-${color}-600`}>{iconElement?.icon}</span>
         <p>{name}</p>
        </div>
        <div>
         <Button
          onClick={() => {
           handleIsOpen(true);
           setSelectedCategory(id);
          }}
          size="icon"
          variant="ghost"
         >
          <TrashIcon className="w-4 h-4 text-red-600" />
         </Button>
        </div>
       </div>
       <Separator className="mt-2" />
      </div>
     );
    })}
   </CardContent>
   <DeleteCategoryDialog categoryId={selectedCategory} isOpen={isDialogOpen} handleOpen={handleIsOpen} />
  </div>
 );
};
