import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mytech Dashboard",
  description: "A modern dashboard for Mytech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}
      >
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header />
            <main className="p-6 mt-16">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
