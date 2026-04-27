import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

type ExamplesLayoutProps = {
  children: ReactNode;
};

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return <>{children}</>;
}
