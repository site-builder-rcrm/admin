import React from "react";
import {
  StyledComponentProps,
  withStyles,
  Theme,
  createStyles,
  Button,
  Toolbar,
  Paper,
  Link,
  Divider
} from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ExternalLinkIcon from "@material-ui/icons/OpenInNew";

import data from "./data.json";
import SimpleTable from "./SimpleTable";
import SiteStatus from "./SiteStatus";

const styles = (theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center"
    },
    siteLink: {
      display: "flex",
      alignItems: "center"
    },
    spacer: {
      width: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
    }
  });

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

interface SiteManagementProps
  extends StyledComponentProps,
    RouteComponentProps<{ siteid: string }> {}

class SiteManagement extends React.Component<SiteManagementProps> {
  state = {
    value: 0
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const classes = this.props.classes || {};
    const site = data.filter(
      s => s.droplet === this.props.match.params.siteid
    )[0];

    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <Typography color="inherit" variant="h5">
            {site.name}
          </Typography>
          <div className={classes.spacer} />
          <Typography className={classes.siteDomain} variant="body1">
            <Link
              target="_blank"
              className={classes.siteLink}
              href={`https://${site.domain}`}
            >
              {site.domain}
              <ExternalLinkIcon style={{ marginLeft: 4 }} fontSize="inherit" />
            </Link>
          </Typography>
          <div className={classes.grow} />
          <SiteStatus status={site.status} />
        </header>
        <SimpleTable />
      </div>
    );
  }
}

export default withStyles(styles)(SiteManagement);
