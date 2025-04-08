import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";

export function SubmitButton({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {children}
    </Button>
  );
}
