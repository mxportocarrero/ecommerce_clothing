import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

import Header from "./components/header/header.component";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // listening to user changes from Firebase auth object
    // returns an unsubscribe function
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // if user document exists in DB returns ref only
        // else creates its documents and returns its ref
        const userRef = await createUserProfileDocument(userAuth);

        // we subscribe to that document for updating incomming changes
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

// we destructure our root reducer, for using user reducer only
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

// makkes setCurrentUser available isnide this.props
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
