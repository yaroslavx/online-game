"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";
import { startTransition, useActionState } from "react";
import { mapLeft, right } from "@/shared/lib/either";

export function CreateButton() {
  const [state, dispatch, isPending] = useActionState(
    createGameAction,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    right(undefined),
  );

  return (
    <Button
      disabled={isPending}
      onClick={dispatch}
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
