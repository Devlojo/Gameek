/* Components */
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = (): JSX.Element => {
  return (
    <>
      <div className="h-full bg-global">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
