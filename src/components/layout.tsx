import Header from "../components/Header";
import Container from "./Container";
// import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-black">
          <Header />
        <Container>
          {children}
        </Container>
        {/* <Footer /> */}
    </section>
  );
}