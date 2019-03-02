import React from "react";
import {
  StyledComponentProps,
  withStyles,
  Theme,
  createStyles,
  Chip,
  Avatar
} from "@material-ui/core";

import { YellowChip, RedChip, GreenChip } from "../Styled/Chip";
import BuildingIcon from "@material-ui/icons/BuildOutlined";
import ConnectedIcon from "@material-ui/icons/Check";
import ArchivedIcon from "@material-ui/icons/Block";

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
    siteStatus: {
      display: "flex",
      alignItems: "center"
    },
    detailChip: {
      marginRight: theme.spacing.unit
    },
    progress: {
      flexGrow: 1
    },
    spacer: {
      width: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
    }
  });

interface SiteStatusProps extends StyledComponentProps {
  status: number;
  style?: any;
}
class SiteStatus extends React.Component<SiteStatusProps> {
  public render() {
    switch (this.props.status) {
      case 0:
        return (
          <YellowChip
            label="Building"
            avatar={
              <Avatar>
                <BuildingIcon />
              </Avatar>
            }
          />
        );
        break;
      case 1:
        return (
          <GreenChip
            label="Connected"
            avatar={
              <Avatar>
                <ConnectedIcon />
              </Avatar>
            }
          />
        );
      case 2:
        return (
          <RedChip
            label="Archived"
            avatar={
              <Avatar>
                <ArchivedIcon />
              </Avatar>
            }
          />
        );
    }
  }
}

export default withStyles(styles)(SiteStatus);
