/* Components */
import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import Footer from "@/components/layout/Footer";

const App = (): JSX.Element => {
  return (
    <>
      <div className="h-full bg-global">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <Header />
          <Home />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
