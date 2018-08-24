/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import merchantRoutes from "./../../routes/merchant.js";
// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import './Merchant.scss';

const switchRoutes = (
  <Switch>
    {merchantRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route exact name="index" path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <div className='app'>
          <div className='app-layout'>
            <div className='main-panel' ref="mainPanel">
              <Header />
              <div className='main-panel__pages'>
                {switchRoutes}
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
