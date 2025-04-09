import Link from "next/link";

export function BottomLink({
  text,
  href,
  linkText,
}: {
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      {linkText}{" "}
      <Link href={href} className="text-primary font-medium hover:underline">
        {text}
      </Link>
    </p>
  );
}
