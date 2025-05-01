import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ReactNode } from "react";

export function GameCard({
  login,
  rating,
  actions,
}: {
  login: string;
  rating: number;
  actions: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Play with: {login}</CardTitle>
      </CardHeader>
      <CardContent>Rating: {rating}</CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
}
