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
  Divider,
  ExpansionPanelActions,
  Button,
  Tooltip,
  Link as UiLInk,
  LinearProgress
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import data from "./data.json";
import moment from "moment";

import { Link } from "react-router-dom";

import GlobeIcon from "@material-ui/icons/PublicTwoTone";
import ExternalLinkIcon from "@material-ui/icons/OpenInNew";
import DropletIcon from "@material-ui/icons/InvertColorsTwoTone";
import SiteStatus from "./SiteStatus";
import { blueGrey, green, blue, teal, amber } from "@material-ui/core/colors";
import { GreyChip } from "../Styled/Chip";
import BuildSiteButton from "./BuildSiteButton";

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
    siteLink: {
      display: "flex",
      alignItems: "center"
    },
    detailChip: {
      marginRight: theme.spacing.unit
    },
    progress: {
      flexGrow: 1,
      height: theme.spacing.unit * 2,
      borderRadius: theme.spacing.unit
    },
    spacer: {
      width: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
    },
    globeSvg: {
      "& > g > path": {
        "&:first-child": {
          fill: green[400]
        },
        "&:last-child": {
          fill: blue[400]
        }
      }
    },
    dropletSvg: {
      "& > path": {
        "&:nth-child(2)": {
          fill: teal[600],
          opacity: 0.75
        },
        "&:last-child": {
          fill: teal[800]
        }
      }
    }
  });

class SiteList extends React.Component<StyledComponentProps> {
  public timer: any;
  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };
  public render() {
    const classes = this.props.classes || {};
    return (
      <div className={classes.root}>
        <BuildSiteButton />
        <br />
        <div className={classes.list}>
          {data.map((site: any) => (
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
                  <UiLInk
                    target="_blank"
                    className={classes.siteLink}
                    href={`https://${site.domain}`}
                  >
                    {site.domain}
                    <ExternalLinkIcon
                      style={{ marginLeft: 4 }}
                      fontSize="inherit"
                    />
                  </UiLInk>
                </Typography>
                <div className={classes.grow} />
                <SiteStatus status={site.status} />
                <div className={classes.spacer} />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {site.status ? (
                  <React.Fragment>
                    <GreyChip
                      className={classes.detailChip}
                      label={site.droplet}
                      avatar={
                        <Avatar>
                          <Tooltip placement="top" title="Droplet ID">
                            <DropletIcon
                              classes={{ root: classes.dropletSvg }}
                            />
                          </Tooltip>
                        </Avatar>
                      }
                    />
                    <GreyChip
                      className={classes.detailChip}
                      label={site.ip}
                      avatar={
                        <Avatar>
                          <Tooltip placement="top" title="IP Address">
                            <span
                              style={{ textAlign: "center", color: amber[500] }}
                            >
                              IP
                            </span>
                          </Tooltip>
                        </Avatar>
                      }
                    />

                    <GreyChip
                      className={classes.detailChip}
                      label={site.region}
                      avatar={
                        <Avatar>
                          <Tooltip placement="top" title="Region">
                            <GlobeIcon classes={{ root: classes.globeSvg }} />
                          </Tooltip>
                        </Avatar>
                      }
                    />
                    <div className={classes.grow} />
                    <Typography variant="body2">{`Created by ${
                      site.owner
                    } on ${moment(site.dateCreated).format(
                      "M/D/YYYY"
                    )}`}</Typography>
                  </React.Fragment>
                ) : (
                  <LinearProgress
                    classes={{ root: classes.progress }}
                    color="secondary"
                    variant="determinate"
                    value={this.state.completed}
                  />
                )}
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                {site.status ? (
                  site.status === 1 ? (
                    <React.Fragment>
                      <Button size="small">Restart</Button>
                      <Button size="small" color="secondary">
                        Archive
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Button size="small">Recover</Button>
                      <Button size="small" color="secondary">
                        Delete
                      </Button>
                    </React.Fragment>
                  )
                ) : (
                  <Button size="small" color="secondary">
                    Cancel
                  </Button>
                )}
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SiteList);
