import Chip from "@material-ui/core/Chip";
import { withStyles, Theme } from "@material-ui/core";
import { amber, green, red, grey } from "@material-ui/core/colors";

const styledChip = (
  chipColor: string,
  textColor: string,
  avatarBackground: string
) => {
  return {
    root: {
      background: chipColor,
      color: textColor
    },
    avatar: {
      border: `2px solid ${chipColor}`,
      background: avatarBackground,
      color: chipColor
    }
  };
};

export const YellowChip = withStyles((theme: Theme) =>
  styledChip(
    amber[500],
    theme.palette.background.paper,
    theme.palette.background.paper
  )
)(Chip);
export const GreyChip = withStyles((theme: Theme) =>
  styledChip(
    grey[300],
    theme.palette.common.black,
    theme.palette.background.paper
  )
)(Chip);
export const RedChip = withStyles((theme: Theme) =>
  styledChip(
    red[500],
    theme.palette.background.paper,
    theme.palette.background.paper
  )
)(Chip);
export const GreenChip = withStyles((theme: Theme) =>
  styledChip(
    green[500],
    theme.palette.background.paper,
    theme.palette.background.paper
  )
)(Chip);
