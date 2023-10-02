import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
 return (
  <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
   <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
    Panel
   </Link>
   <Link href="/accounts" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    Konta bakowe
   </Link>
   <Link href="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    Kategorie
   </Link>
   <Link href="/examples/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    Settings
   </Link>
  </nav>
 );
}
