import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import UserHome from './components/UserHome';
import HomePage from './components/HomePage'
import SinglePieView from './components/SinglePieView'
import AllPies from './components/AllPies'
import AddPie from './components/AddPie';
import EditPie from './components/EditPie'
import SingleOrder from './components/SingleOrder';
import Confirmation from './components/Confirmation';
import ErrorPage from './components/ErrorPage';
import {me} from './store'
import Cart from './components/Cart';
import AllUsers from './components/AllUsers'
import EditAccountForm from './components/EditAccountForm';
import CheckoutPage from './components/CheckoutPage';
import AllPiesTable from './components/AllPiesTable';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path='/userhome' exact component={UserHome}/>

            {/* will eventually redirect to userhome/order/:id */}
            <Route path='/order' exact component={SingleOrder}/>
            <Route path='/order/:id' exact component={SingleOrder}/>
            <Route path='/userhome/order/' exact component={SingleOrder}/>
            <Route path='/users/:id/editAccountForm' exact component={EditAccountForm}/>
            {/* will eventually redirect to cart/checkout/:id/confirmation, need to adjust for guest */}
            <Route path='/cart/checkout/confirmation' exact component={Confirmation}/>

            <Route path='/users' exact component={AllUsers}/>
            <Route path='/pies' exact component={AllPies}/>
            <Route path='/pies/table' exact component={AllPiesTable}/>
            <Route path='/pies/:id' exact component={SinglePieView}/>
            <Route path='/addpie' exact component={AddPie}/>
            <Route path='/pies/:id/editpie' exact component={EditPie}/>
            <Route path='/cart' exact component={Cart}/>
            <Route path='/checkout' exact component={CheckoutPage}/>
            <Redirect to="/" />
            <Route path="/error" exact component={ErrorPage}/>
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ HomePage } />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path='/pies' exact component={AllPies}/>
            <Route path='/pies/:id' component={SinglePieView}/>
            <Route path='/cart' exact component={Cart}/>
            <Route path='/checkout' exact component={CheckoutPage}/>
            <Route path="/error" component={ErrorPage}/>
            {/* <Redirect to='/error' /> */}
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
