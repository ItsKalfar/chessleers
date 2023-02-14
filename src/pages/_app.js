import "@/styles/globals.scss";
import Navbar from "components/Navbar";
import { ChessleersContextProvider } from "../../context/ChessleersContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ChessleersContextProvider>
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ChessleersContextProvider>
    </>
  );
}
