import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ReactNode } from "react";

export function GameLayout({
  players,
  status,
  field,
}: {
  players?: ReactNode;
  status?: ReactNode;
  field?: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tic Tac Toe</CardTitle>
        <CardContent className="flex flex-col gap-4">
          {players}
          {status}
          <div className="flex items-center justify-center">{field}</div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
