import { Oswald, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { FitlogProvider } from "@/context/FitlogContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "FitLog – Workout Library & Tracker",
  description:
    "Pick a lift, lock it into today’s plan, and watch the week’s work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <FitlogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#151517",
                color: "#fff",
                border: "1px solid #2A2A2E",
              },
            }}
          />
        </FitlogProvider>
      </body>
    </html>
  );
}
