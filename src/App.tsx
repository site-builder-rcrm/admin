import {
  createStyles,
  CssBaseline,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import React from "react";
import { ReactCookieProps, withCookies, Cookies } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext, AppContextShape } from "./App.context";
import AppHeader from "./components/Layout/AppHeader";
import LeftDrawer from "./components/Layout/LeftDrawer";
import MainContent from "./components/Layout/MainContent";
import Login from "./components/Login/Login";
import UserProfile from "./types/user";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      width: "100vw",
      overflowX: "hidden",
      display: "flex"
    },
    bgImage: {
      zIndex: 0,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundImage: 'url("/login_bg.jpg")',
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }
  });

interface AppProps extends ReactCookieProps {
  classes: any;
}

interface AppState {
  mobileOpen: boolean;
  context: AppContextShape;
}

class App extends React.Component<AppProps, AppState> {
  componentDidMount = () => {
    const { cookies } = this.props;
    if (cookies) {
      this.startSession(cookies.get("session"));
    } else {
      this.setInitialState();
    }
  };

  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    });
  };

  setInitialState = () => {
    this.setState({ mobileOpen: false, context: {} });
  };

  startSession = async (session: UserProfile) => {
    this.setState({
      context: {
        user: session
      }
    });
  };

  public handleLogin = (user: UserProfile) => {
    const { cookies } = this.props;
    if (cookies) {
      cookies.set("session", user);
    }
    this.startSession(user);
  };

  public handleLogout = () => {
    const { cookies } = this.props;
    if (cookies) {
      cookies.remove("session");
    }
    this.setInitialState();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.bgImage} />
        <CssBaseline />
        <Router>
          {this.state ? (
            this.state.context && this.state.context.user ? (
              <AppContext.Provider value={this.state.context}>
                <AppHeader
                  onLogout={this.handleLogout}
                  onDrawerToggle={this.handleDrawerToggle}
                />
                <LeftDrawer
                  mobileOpen={this.state.mobileOpen}
                  onToggle={this.handleDrawerToggle}
                />
                <MainContent />
              </AppContext.Provider>
            ) : (
              <Login onSubmit={this.handleLogin} />
            )
          ) : (
            <Typography variant="h1">Loading</Typography>
          )}
        </Router>
      </div>
    );
  }
}

export default withCookies(withStyles(styles)(App));
