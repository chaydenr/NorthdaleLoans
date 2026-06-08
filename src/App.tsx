import "@shared/sass/main.scss";
import "@shared/sass/core/_reset.scss";
import { LoansProvider } from "Context/Context";
import { BrowserRouter as Router } from "react-router-dom";
import Links from "Header/Links";
import { AppRouter } from "AppRouter";

function App() {
  return (
    <>
      <div>
        <LoansProvider>
          <Router>
            <Links />
            <AppRouter />
          </Router>
        </LoansProvider>
      </div>
    </>
  );
}

export default App;
