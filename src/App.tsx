import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./pages/Navigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import SideMenu from "./components/SideMenu/SideMenu";
import styled from "styled-components";

const ScreenMinusSideMenu = styled.div`
  height: 100%;
  width: 80%;
  position: fixed;
  top: 0;
  right: 10px;
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SideMenu />
        <ScreenMinusSideMenu>
          <Navigation />
        </ScreenMinusSideMenu>
      </Router>
    </Provider>
  );
}

export default App;
