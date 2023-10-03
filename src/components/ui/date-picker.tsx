"use client";

import { cn, formatDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";

interface Props {
 date: Date | undefined;
 setDate: (date: Date | undefined) => void;
}

export const DatePicker = ({ date, setDate }: Props) => {
 return (
  <Popover>
   <PopoverTrigger asChild>
    <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
     <CalendarIcon className="mr-2 h-4 w-4" />
     {date ? formatDate(date) : <span>Wybierz datę</span>}
    </Button>
   </PopoverTrigger>
   <PopoverContent className="w-auto p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
   </PopoverContent>
  </Popover>
 );
};
