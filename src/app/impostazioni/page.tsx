import type { Metadata } from "next";
import { Impostazioni } from "@/components/Impostazioni";

export const metadata: Metadata = { title: "Impostazioni" };

export default function Page() {
  return <Impostazioni />;
}
