import {
  Avatar,
  Button,
  createStyles,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  LinearProgress,
  Link as UiLInk,
  StyledComponentProps,
  Theme,
  Typography,
  withStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link,
  IconButton
} from "@material-ui/core";
import { amber, blue, green, grey, red, teal } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DropletIcon from "@material-ui/icons/InvertColorsTwoTone";
import ExternalLinkIcon from "@material-ui/icons/OpenInNew";
import GlobeIcon from "@material-ui/icons/PublicTwoTone";
import { findKey } from "lodash";
import moment from "moment";
import React from "react";
import { REGION_OPTIONS, SIZE_OPTIONS } from "../../constants/sites";
import Sitebuilder from "../../services/Sitebuilder";
import ConfirmDialog from "../Alerts/ConfirmDialog";
import { GreyChip } from "../Styled/Chip";
import BuildSiteButton from "./BuildSiteButton";
import SiteStatus from "./SiteStatus";
import { Storage, LocalOffer, FileCopyOutlined } from "@material-ui/icons";
import Currency from "react-currency-formatter";
import { Link as UiLink } from "react-router-dom";
import CopyButton from "./CopyButton";
import FunnelSelector from "../Funnels/FunnelSelector";

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
    progressRoot: {
      flexGrow: 1,
      height: theme.spacing.unit * 2,
      borderRadius: theme.spacing.unit,
      background: grey[300]
    },
    barRed: {
      backgroundColor: red[500]
    },
    barAmber: {
      backgroundColor: amber[500]
    },
    barGreen: {
      background: green[500]
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
  confirmTitle: string;
  confirmMessage: string;
  confirmOpen: boolean;
  confirmCallback: (answer: any) => void;
}

class SiteList extends React.Component<StyledComponentProps, SiteListState> {
  public componentWillMount = () => {
    this.setState({ confirmOpen: false });
  };
  public getSiteList = () => {
    Sitebuilder.Servers.List()
      .then(response => {
        this.setState({ sites: response });
      })
      .catch(error => {
        console.error("Server List Error", error);
      });
  };

  public onFunnelChange = (siteId: string) => (funnelId: string) => {
    this.getSiteList();
  };

  public negateSiteAtStatus = (site: any, refresh: boolean) => (
    event: React.MouseEvent
  ) => {
    this.setState({
      confirmTitle: `${
        refresh
          ? "Archive Site"
          : site.status === 0
          ? "Cancel Build"
          : "Permanently Delete"
      }`,
      confirmMessage: `Are you sure you want to ${
        refresh
          ? "archive"
          : site.status === 0
          ? "cancel the build for"
          : "permanently delete"
      } ${site.domain}?`,
      confirmOpen: true,
      confirmCallback: (answer: any) => {
        this.setState({ confirmOpen: false });
        if (answer) {
          Sitebuilder.Servers.Archive(site.id).then(() => {
            if (refresh) {
              this.getSiteList();
            } else {
              this.setState(state => {
                return { sites: state.sites.filter(s => s.id !== site.id) };
              });
            }
          });
        }
      }
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
        <ConfirmDialog
          open={this.state.confirmOpen}
          onClose={this.state.confirmCallback}
          message={this.state.confirmMessage}
          title={this.state.confirmTitle}
        />
        <br />
        <div className={classes.list}>
          {this.state &&
            this.state.sites &&
            this.state.sites.map((site: any) => {
              let barClass;
              if (site.build_step && site.build_step.progress) {
                if (site.build_step.progress <= 32) {
                  barClass = classes.barRed;
                }
                if (
                  site.build_step.progress >= 33 &&
                  site.build_step.progress <= 65
                ) {
                  barClass = classes.barAmber;
                }
                if (site.build_step.progress >= 66) {
                  barClass = classes.barGreen;
                }
              }
              return (
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
                  <ExpansionPanelDetails
                    style={{ padding: site.status ? 0 : "" }}
                  >
                    {site.status ? (
                      <Table>
                        <colgroup>
                          <col width="15%" />
                        </colgroup>
                        <TableBody>
                          <TableRow>
                            <TableCell variant="head">Funnel</TableCell>
                            <TableCell>
                              {site.funnel && (
                                <Link
                                  component={(props: any) => (
                                    <UiLink
                                      {...props}
                                      to={`/funnels/${site.funnel}`}
                                    />
                                  )}
                                >
                                  {site.funnel_name}
                                </Link>
                              )}
                              <FunnelSelector
                                value={site.funnel}
                                site={site.id}
                                onChange={this.onFunnelChange(site.id)}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head">Owner</TableCell>
                            <TableCell>{site.creator}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head">Date Created</TableCell>
                            <TableCell>
                              {moment(site.created).format(
                                "MM/DD/YYYY   h:mm a"
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head">Droplet ID</TableCell>
                            <TableCell>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center"
                                }}
                              >
                                <span>{site.droplet}</span>

                                <CopyButton text={site.droplet} />
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head">IP Address</TableCell>
                            <TableCell>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center"
                                }}
                              >
                                <span>{site.ip}</span>

                                <CopyButton text={site.ip} />
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head">Memory Size</TableCell>
                            <TableCell>
                              {Object.values(SIZE_OPTIONS)
                                .filter(size => {
                                  return size.price === site.price;
                                })[0]
                                .value.toLocaleUpperCase()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head">Monthly Cost</TableCell>
                            <TableCell>
                              <Currency quantity={site.price} />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ) : // <React.Fragment>
                    //   <GreyChip
                    //     className={classes.detailChip}
                    //     label={site.droplet}
                    //     avatar={
                    //       <Avatar>
                    //         <Tooltip placement="top" title="Droplet ID">
                    //           <DropletIcon
                    //             classes={{ root: classes.dropletSvg }}
                    //           />
                    //         </Tooltip>
                    //       </Avatar>
                    //     }
                    //   />
                    //   <GreyChip
                    //     className={classes.detailChip}
                    //     label={site.ip}
                    //     avatar={
                    //       <Avatar>
                    //         <Tooltip placement="top" title="IP Address">
                    //           <span
                    //             style={{
                    //               textAlign: "center",
                    //               color: amber[500]
                    //             }}
                    //           >
                    //             IP
                    //           </span>
                    //         </Tooltip>
                    //       </Avatar>
                    //     }
                    //   />

                    //   <GreyChip
                    //     className={classes.detailChip}
                    //     label={findKey(REGION_OPTIONS, r => {
                    //       return r.value === site.region;
                    //     })}
                    //     avatar={
                    //       <Avatar>
                    //         <Tooltip placement="top" title="Region">
                    //           <GlobeIcon
                    //             classes={{ root: classes.globeSvg }}
                    //           />
                    //         </Tooltip>
                    //       </Avatar>
                    //     }
                    //   />
                    //   <GreyChip
                    //     className={classes.detailChip}
                    //     label={Object.values(SIZE_OPTIONS)
                    //       .filter(size => {
                    //         return size.price === site.price;
                    //       })[0]
                    //       .value.toLocaleUpperCase()}
                    //     avatar={
                    //       <Avatar>
                    //         <Tooltip placement="top" title="Memory">
                    //           <Storage color="secondary" />
                    //         </Tooltip>
                    //       </Avatar>
                    //     }
                    //   />
                    //   <GreyChip
                    //     className={classes.detailChip}
                    //     label={<Currency quantity={site.price} />}
                    //     avatar={
                    //       <Avatar>
                    //         <Tooltip placement="top" title="Monthly cost">
                    //           <LocalOffer color="primary" />
                    //         </Tooltip>
                    //       </Avatar>
                    //     }
                    //   />
                    //   <div className={classes.grow} />
                    //   <Typography variant="body2">{`Created by ${
                    //     site.creator
                    //   } on ${moment(site.created).format(
                    //     "M/D/YYYY"
                    //   )}`}</Typography>
                    // </React.Fragment>
                    site.build_step ? (
                      <div style={{ width: "100%" }}>
                        <LinearProgress
                          classes={{
                            root: classes.progressRoot,
                            bar: barClass
                          }}
                          color="secondary"
                          variant="determinate"
                          value={site.build_step.progress}
                        />
                        <Typography variant="caption">
                          {site.build_step.message}
                        </Typography>
                      </div>
                    ) : (
                      <Typography variant="h5">Site Error</Typography>
                    )}
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    {site.status ? (
                      site.status === 1 ? (
                        <React.Fragment>
                          <Button size="small">Restart</Button>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={this.negateSiteAtStatus(site, true)}
                          >
                            Archive
                          </Button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Button size="small">Recover</Button>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={this.negateSiteAtStatus(site, false)}
                          >
                            Delete
                          </Button>
                        </React.Fragment>
                      )
                    ) : (
                      <Button
                        size="small"
                        color="secondary"
                        onClick={this.negateSiteAtStatus(site, false)}
                      >
                        Cancel
                      </Button>
                    )}
                  </ExpansionPanelActions>
                </ExpansionPanel>
              );
            })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SiteList);
