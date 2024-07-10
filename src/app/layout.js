import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blogs",
  description: "Blogs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />

    </head>
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>

    </html>
  );
}
