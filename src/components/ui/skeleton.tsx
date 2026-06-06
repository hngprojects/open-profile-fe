import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: Props) {
  return (
    <div
      className={cn("w-full animate-pulse rounded-lg bg-gray-200", className)}
      {...props}
    />
  );
}
