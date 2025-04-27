import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50">
        <div className="text-xl">Tic Tac Toe</div>
        <div className="flex items-center">
          <div className="text-lg">UserLogin</div>
          <Button>Sign out</Button>
        </div>
      </header>
      {children}
    </div>
  );
}
