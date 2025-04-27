import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";
import { sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = await sessionService.verifySession();

  return (
    <div>
      <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">Tic Tac Toe</div>
        <div className="flex items-center gap-4">
          <div className="text-lg">{session.login}</div>
          <form
            action={async () => {
              "use server";
              await sessionService.deleteSession();
              redirect("/signin");
            }}
          >
            <Button>Sign out</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
