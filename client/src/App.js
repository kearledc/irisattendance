import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Semantic UI
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
// Pages
import Home from "./Pages/Home";
import RegisterStudent from "./Pages/RegisterStudent";
import Login from "./Pages/Login";
// Components
import MenuBar from "./Components/MenuBar";
// Utilities
import AuthRoute from "./Utilities/AuthRoute";
import { AuthProvider } from "./Utilities/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route path="/register" component={RegisterStudent} />
          <AuthRoute path="/login" component={Login} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
