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

import { findKey } from "lodash";

import GlobeIcon from "@material-ui/icons/PublicTwoTone";
import ExternalLinkIcon from "@material-ui/icons/OpenInNew";
import DropletIcon from "@material-ui/icons/InvertColorsTwoTone";
import SiteStatus from "./SiteStatus";
import { green, blue, teal, amber } from "@material-ui/core/colors";
import { GreyChip } from "../Styled/Chip";
import BuildSiteButton from "./BuildSiteButton";
import Sitebuilder from "../../services/Sitebuilder";
import { REGION_OPTIONS } from "../../constants/sites";

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

interface SiteListState {
  sites: Array<any>;
}

class SiteList extends React.Component<StyledComponentProps, SiteListState> {
  public getSiteList = () => {
    Sitebuilder.Servers.List()
      .then(response => {
        console.log(typeof response);
        this.setState({ sites: response });
      })
      .catch(error => {
        console.error("Server List Error", error);
      });
  };

  componentDidMount = this.getSiteList;

  onNewSiteCreated = (newSite: any) => {
    console.log(newSite);
    this.getSiteList();
  };

  public render() {
    const classes = this.props.classes || {};
    return (
      <div className={classes.root}>
        <BuildSiteButton onSubmit={this.onNewSiteCreated} />
        <br />
        <div className={classes.list}>
          {this.state &&
            this.state.sites &&
            this.state.sites.map((site: any) => (
              <ExpansionPanel key={site.id}>
                <ExpansionPanelSummary
                  classes={{ content: classes.siteSummary }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.siteDomain} variant="h6">
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
                                style={{
                                  textAlign: "center",
                                  color: amber[500]
                                }}
                              >
                                IP
                              </span>
                            </Tooltip>
                          </Avatar>
                        }
                      />

                      <GreyChip
                        className={classes.detailChip}
                        label={findKey(REGION_OPTIONS, r => {
                          return r.value === site.region;
                        })}
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
                        site.creator
                      } on ${moment(site.created).format(
                        "M/D/YYYY"
                      )}`}</Typography>
                    </React.Fragment>
                  ) : (
                    <LinearProgress
                      classes={{ root: classes.progress }}
                      color="secondary"
                      variant="determinate"
                      value={50}
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
