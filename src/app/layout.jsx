import "../styles/globals.css";
import Head from "next/head";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "OwnGCC — Student Dashboard",
  description: "Student dashboard UI demo for OwnGCC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <div className="min-h-screen">
          <NavBar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
