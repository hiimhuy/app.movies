import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/src/components/Container";
import Header from "@/src/components/Navbar";
import AppContainer from "@/src/components/AppContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OFilm - Web phim miễn phí",
  description: "Xem phim miễn phí với Ofilm, không lo quảng cáo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-[#080808] text-white ${inter.className}`}>
        <Header />
        <Container>
          <AppContainer>{children}</AppContainer>
        </Container>
      </body>
    </html>
  );
}
