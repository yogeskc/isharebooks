import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ProtectedRoute from './ProtectedRoute';
import ServiceBuy from './pages/ServiceBuy';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import RatingMessage from './pages/RatingMessage';
import ViewListings from './pages/ViewListings';
import BuyBooks from './pages/BuyBooks';
import TradeBooks from './pages/TradeBooks';
import FreeBooks from './pages/FreeBooks';
import Privacy from './pages/Privacy';
import ViewBook from './pages/ViewBook';

import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/profile" component={Profile} />
          <Route path="/rating" component={RatingMessage} />
          <Route path="/viewlistings" component={ViewListings} />
          <Route path="/buybooks" component={BuyBooks} />
          <Route path="/tradebooks" component={TradeBooks} />
          <Route path="/freebooks" component={FreeBooks} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/viewbook" component={ViewBook} />
          <ProtectedRoute
            path="/buyService"
            isLoggedIn={isLoggedIn}
            component={ServiceBuy}
          />
          <ProtectedRoute
            path="/buyService"
            isLoggedIn={isLoggedIn}
            component={ServiceBuy}
          />
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
