"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CategoryIcon, Color, colors } from "@/db/schema";
import { cn } from "@/lib/utils";
import {
 TrainFrontIcon,
 ShirtIcon,
 GraduationCapIcon,
 DramaIcon,
 ShoppingCartIcon,
 GiftIcon,
 CrossIcon,
 HomeIcon,
 BanknoteIcon,
 BikeIcon,
 BookIcon,
 PlaneIcon,
 CarFrontIcon,
 ArmchairIcon,
 PartyPopperIcon,
 CoffeeIcon,
 ChevronDown,
 ChevronUpIcon,
} from "lucide-react";
import React from "react";
import { createCategory } from "./actions";

export const iconSet: { name: CategoryIcon; icon: React.ReactNode }[] = [
 { name: "transport", icon: <TrainFrontIcon /> },
 { name: "clothes", icon: <ShirtIcon /> },
 { name: "education", icon: <GraduationCapIcon /> },
 { name: "entertainment", icon: <DramaIcon /> },
 { name: "food", icon: <ShoppingCartIcon /> },
 { name: "gift", icon: <GiftIcon /> },
 { name: "health", icon: <CrossIcon /> },
 { name: "home", icon: <HomeIcon /> },
 { name: "salary", icon: <BanknoteIcon /> },
 { name: "sport", icon: <BikeIcon /> },
 { name: "book", icon: <BookIcon /> },
 { name: "travel", icon: <PlaneIcon /> },
 { name: "car", icon: <CarFrontIcon /> },
 { name: "furniture", icon: <ArmchairIcon /> },
 { name: "party", icon: <PartyPopperIcon /> },
 { name: "coffe", icon: <CoffeeIcon /> },
];

const categoryColors = colors;

export const NewCategoryForm = () => {
 const [selectedIcon, setSelectedIcon] = React.useState<CategoryIcon>("food");
 const [selectedColor, setSelectedColor] = React.useState<Color>("red");
 const [iconPopoverOpen, setIconPopoverOpen] = React.useState(false);
 const [colorPopoverOpen, setColorPopoverOpen] = React.useState(false);

 const icon = iconSet.find((icon) => icon.name === selectedIcon)?.icon;

 const createCategoryWithIconAndColor = createCategory.bind(null, selectedIcon, selectedColor);

 return (
  <form className="p-4" action={createCategoryWithIconAndColor}>
   <div className="space-y-4">
    <div className="grid w-full  gap-1.5">
     <Label htmlFor="name" className="ml-2">
      Nazwa
     </Label>
     <Input id="name" name="name" required placeholder="Komunikcja miejska" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 gap-2">
     <div className="grid w-full col-span-2 items-center gap-1.5">
      <Label htmlFor="amount" className="ml-2">
       Typ
      </Label>
      <Select required name="type">
       <SelectTrigger className="">
        <SelectValue placeholder="Wybierz" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="income">Wpływ</SelectItem>
        <SelectItem value="expense">Wydatek</SelectItem>
       </SelectContent>
      </Select>
     </div>
     <div className="grid w-full  items-center gap-1.5">
      <Label htmlFor="amount" className="ml-2">
       Ikona
      </Label>
      <Popover open={iconPopoverOpen} onOpenChange={setIconPopoverOpen}>
       <PopoverTrigger asChild>
        <Button className="w-auto text-gray-700 gap-1 px-0 " variant="outline">
         {icon}
         {iconPopoverOpen ? <ChevronDown className="w-[16px]" /> : <ChevronUpIcon className="w-[16px]" />}
        </Button>
       </PopoverTrigger>
       <PopoverContent className="w-60 flex flex-wrap  items-center gap-1">
        {iconSet.map(({ name, icon }) => (
         <Button
          onClick={() => {
           setSelectedIcon(name);
           setIconPopoverOpen(false);
          }}
          className="m-1 text-gray-700"
          key={name}
          variant="outline"
          size="icon"
         >
          {icon}
         </Button>
        ))}
       </PopoverContent>
      </Popover>
     </div>
     <div className="grid w-full  items-center gap-1.5">
      <Label htmlFor="amount" className="ml-2">
       Kolor
      </Label>
      <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
       <PopoverTrigger asChild>
        <Button className="w-auto text-gray-700 gap-1 px-0" variant="outline">
         <div className={cn(`bg-${selectedColor}-600`, "w-6 h-6 rounded-sm")} />
         {colorPopoverOpen ? <ChevronDown className="w-[16px]" /> : <ChevronUpIcon className="w-[16px]" />}
        </Button>
       </PopoverTrigger>
       <PopoverContent className="w-56 flex flex-wrap  items-center gap-2">
        {categoryColors.map((color) => (
         <Button
          onClick={() => {
           setSelectedColor(color);
           setColorPopoverOpen(false);
          }}
          className="text-gray-700"
          key={color}
          variant="outline"
          size="icon"
         >
          <div className={cn(`bg-${color}-600`, "w-8 h-8 rounded-sm")} />
         </Button>
        ))}
       </PopoverContent>
      </Popover>
     </div>
    </div>
   </div>
   <DialogFooter className="mt-4">
    <Button className="w-full" type="submit">
     Stwórz kategorię
    </Button>
   </DialogFooter>
  </form>
 );
};
