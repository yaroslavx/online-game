import Link from "next/link";

export function BottomLink({
  text,
  url,
  linkText,
}: {
  text: string;
  url: string;
  linkText: string;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      {linkText}{" "}
      <Link href={url} className="text-primary font-medium hover:underline">
        {text}
      </Link>
    </p>
  );
}
