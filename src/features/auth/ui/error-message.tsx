import { Alert, AlertDescription } from "@/shared/ui/alert";

export function ErrorMessage({ error }: { error?: string }) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  return null;
}
