import Chip from "@material-ui/core/Chip";
import { withStyles, Theme, Color } from "@material-ui/core";
import { amber, teal, green, red, grey } from "@material-ui/core/colors";

const styledChip = (color: string, background: string) => {
  return {
    root: {
      background: color,
      color: background
    },
    avatar: {
      border: `2px solid ${color}`,
      background: "white",
      color: color
    }
  };
};

export const YellowChip = withStyles((theme: Theme) =>
  styledChip(amber[500], theme.palette.background.paper)
)(Chip);
export const GreyChip = withStyles((theme: Theme) =>
  styledChip(grey[300], theme.palette.common.black)
)(Chip);
export const RedChip = withStyles((theme: Theme) =>
  styledChip(red[500], theme.palette.background.paper)
)(Chip);
export const GreenChip = withStyles((theme: Theme) =>
  styledChip(green[500], theme.palette.background.paper)
)(Chip);
