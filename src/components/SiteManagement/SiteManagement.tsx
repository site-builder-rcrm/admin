import React from "react";
import {
  Typography,
  StyledComponentProps,
  withStyles,
  Theme,
  createStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Chip,
  Avatar,
  Link,
  Divider,
  ExpansionPanelActions,
  Button,
  Tooltip
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import data from "./data.json";

import BuildingIcon from "@material-ui/icons/BuildOutlined";
import ConnectedIcon from "@material-ui/icons/Check";
import ArchivedIcon from "@material-ui/icons/Block";
import GlobeIcon from "@material-ui/icons/Public";
import PriceIcon from "@material-ui/icons/AttachMoney";
import DropletIcon from "@material-ui/icons/InvertColors";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    siteSummary: {
      alignItems: "center"
    },
    siteName: {
      flexShrink: 0,
      flexBasis: "33.3333%"
    },
    siteStatus: {
      display: "flex",
      alignItems: "center"
    },
    detailChip: {
      marginRight: theme.spacing.unit
    },
    spacer: {
      width: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
    }
  });

const siteStatus = (status: number) => {
  switch (status) {
    case 0:
      return (
        <Chip
          label="Building"
          avatar={
            <Avatar>
              <BuildingIcon />
            </Avatar>
          }
        />
      );
    case 1:
      return (
        <Chip
          label="Connected"
          color="primary"
          avatar={
            <Avatar>
              <ConnectedIcon />
            </Avatar>
          }
        />
      );
    case 2:
      return (
        <Chip
          label="Archived"
          color="secondary"
          avatar={
            <Avatar>
              <ArchivedIcon />
            </Avatar>
          }
        />
      );
    default:
      break;
  }
};

class SiteManagement extends React.Component<StyledComponentProps> {
  public render() {
    const classes = this.props.classes || {};
    return (
      <div className={classes.root}>
        {data.map(site => (
          <ExpansionPanel key={site.droplet}>
            <ExpansionPanelSummary
              classes={{ content: classes.siteSummary }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.siteName} variant="h6" noWrap>
                {site.name}
              </Typography>
              <div className={classes.spacer} />
              <Typography className={classes.siteDomain} variant="body1">
                <Link target="_blank" href={`https://${site.domain}`}>
                  {site.domain}
                </Link>
              </Typography>
              <div className={classes.grow} />
              {siteStatus(site.status)}
              <div className={classes.spacer} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Chip
                className={classes.detailChip}
                label={site.droplet}
                avatar={
                  <Avatar>
                    <Tooltip placement="top" title="Droplet ID">
                      <DropletIcon />
                    </Tooltip>
                  </Avatar>
                }
              />
              <Chip
                className={classes.detailChip}
                label={site.ip}
                avatar={
                  <Avatar>
                    <Tooltip placement="top" title="IP Address">
                      <span style={{ textAlign: "center" }}>IP</span>
                    </Tooltip>
                  </Avatar>
                }
              />

              <Chip
                className={classes.detailChip}
                label={site.region}
                avatar={
                  <Avatar>
                    <Tooltip placement="top" title="Region">
                      <GlobeIcon />
                    </Tooltip>
                  </Avatar>
                }
              />
              <br />
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              {site.status ? (
                site.status === 1 ? (
                  <React.Fragment>
                    <Button size="small" color="primary">
                      Manage
                    </Button>
                    <Button size="small">Restart</Button>
                    <Button size="small" color="secondary">
                      Archive
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button size="small" color="primary">
                      Recover
                    </Button>
                    <Button size="small" color="secondary">
                      Delete Permanently
                    </Button>
                  </React.Fragment>
                )
              ) : (
                <Button size="small" color="secondary">
                  Cancel Build
                </Button>
              )}
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(SiteManagement);
