import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/src/components/Container";
import Header from "@/src/components/Header";
import AppContainer from "@/src/components/AppContainer";
import { CounterStoreProvider } from "@/src/providers/counter-store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OFilm - Web phim miễn phí",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-[#080808] text-white ${inter.className}`}>
        <CounterStoreProvider>
          <Header />
          <Container>
            <AppContainer>{children}</AppContainer>
          </Container>
        </CounterStoreProvider>
      </body>
    </html>
  );
}
