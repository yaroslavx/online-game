"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";
import { startTransition } from "react";
import { mapLeft, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";

export function CreateButton() {
  const [state, dispatch, isPending] = useActionState(
    createGameAction,
    right(undefined),
  );

  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(dispatch)}
      error={mapLeft(
        state,
        (e) =>
          ({
            ["user-does-not-exist"]: "User does not exists",
            ["can-create-only-one-game"]: "You can create only one game",
          })[e],
      )}
    >
      Create game
    </Button>
  );
}
