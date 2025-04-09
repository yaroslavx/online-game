import { Either, matchEither } from "@/shared/lib/either";
import { Alert, AlertDescription } from "@/shared/ui/alert";

export function ErrorMessage({ error }: { error: Either<string, null> }) {
  return matchEither(error, {
    left: (error) => (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    ),
    right: () => null,
  });
}
