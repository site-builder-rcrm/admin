import { createStyles, Theme, withStyles, Fade } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import DummyComponent from "../Dummy/DummyComponent";
import { AppContext } from "../../App.context";
import SiteManagement from "../SiteManagement/SiteManagement";
import SiteList from "../SiteManagement/SiteList";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: 1,
      backgroundColor: theme.palette.background.default,
      minHeight: "calc(100vh - " + theme.spacing.unit * 8 + "px)",
      maxWidth: theme.breakpoints.width("lg"),
      margin: `${theme.spacing.unit * 2}px auto`,
      padding: `0 ${theme.spacing.unit * 2}px`
    },
    toolbar: theme.mixins.toolbar
  });

interface MainContentProps {
  classes: any;
}

class MainContent extends React.Component<MainContentProps> {
  render() {
    const { classes } = this.props;
    return (
      <Fade in={true}>
        <main className={classes.root}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/sites" component={SiteList} />
            <Route path="/site/:siteid" component={SiteManagement} />
            <Route path="*" component={DummyComponent} />
            {/* <AppContext.Consumer>
              {context => (
                <Route
                  path="/profile"
                  render={props => <Profile {...props} user={context.user} />}
                />
              )}
            </AppContext.Consumer> */}
          </Switch>
        </main>
      </Fade>
    );
  }
}

export default withStyles(styles)(MainContent);
