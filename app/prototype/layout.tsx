import { Bebas_Neue, Montserrat } from "next/font/google";
import "@/components/prototype/prototype.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas",
});

export const metadata = {
  title: "Matiks prototype · Referral flows",
  description:
    "iPhone 16 Pro prototype switcher for Matiks referral slide-ups, toasts, and Track Referral.",
};

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${montserrat.variable} ${bebasNeue.variable} ${montserrat.className} prototype-canvas`}
    >
      {children}
    </div>
  );
}
