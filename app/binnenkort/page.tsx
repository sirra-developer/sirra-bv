import type { Metadata } from "next";
import { Logo } from "../components/Logo";

export const metadata: Metadata = {
  title: "Binnenkort | SIRRA",
  description: "We werken momenteel aan de nieuwe website van SIRRA.",
};

export default function BinnenkortPage() {
  return (
    <main className="flex h-dvh w-dvw flex-col items-center justify-center bg-amber-50">
      <Logo className="logo mt-auto h-auto w-70 md:w-100" />
      <h1 className="fadeIn mb-auto text-black">
        Binnenkort lanceren wij onze website
      </h1>
      <h2 className="fadeInUp mb-8 block items-end text-black">
        Volg ons op{" "}
        <a
          className="text-sirra-green font-bold underline"
          target="_blank"
          href="https://www.linkedin.com/company/sirra-bv/"
        >
          LinkedIn
        </a>{" "}
        voor updates
      </h2>
    </main>
  );
}
