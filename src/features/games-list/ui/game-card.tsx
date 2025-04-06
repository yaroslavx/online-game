import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function GameCard({ login, rating }: { login: string; rating: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Play with: {login}</CardTitle>
      </CardHeader>
      <CardContent>Rating: {rating}</CardContent>
    </Card>
  );
}
