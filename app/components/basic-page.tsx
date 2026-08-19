import { SiteHeader } from "./SiteHeader";
import { Footer } from "./Footer";

export function BasicPage({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {title}
        </h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}
