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
import ErrorPage from './components/ErrorPage';
import {me} from './store'
import Cart from './components/Cart';
import AllUsers from './components/AllUsers'

/**
 * COMPONENT
 */
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
            <Route path='/users' exact component={AllUsers}/>
            <Route path='/pies' exact component={AllPies}/>
            <Route path='/pies/:id' exact component={SinglePieView}/>
            <Route path='/addpie' exact component={AddPie}/>
            <Route path='/pies/:id/editpie' exact component={EditPie}/>
            <Route path='/cart' exact component={Cart}/>
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
            <Route path="/error" component={ErrorPage}/>
            {/* <Redirect to='/error' /> */}

          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
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
