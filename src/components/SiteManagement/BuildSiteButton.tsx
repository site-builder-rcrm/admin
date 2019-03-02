import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import {
  Typography,
  StyledComponentProps,
  withStyles,
  Theme,
  createStyles
} from "@material-ui/core";

import Currency from "react-currency-formatter";

import { REGION_OPTIONS, SIZE_OPTIONS } from "../../constants/sites";
import {
  RegionValue,
  RegionOption,
  SizeValue,
  SizeOption
} from "../../types/sites";

interface BuildSiteButtonState {
  open: boolean;
  region: RegionValue | "";
  size: SizeValue | "";
}

const styles = (theme: Theme) =>
  createStyles({
    flex: {
      display: "flex"
    }
  });

class BuildSiteButton extends React.Component<
  StyledComponentProps,
  BuildSiteButtonState
> {
  public state: BuildSiteButtonState = {
    open: false,
    region: "",
    size: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ region: event.target.value as RegionValue });
  };
  handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ size: event.target.value as SizeValue });
  };

  render() {
    const classes = this.props.classes || {};
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Build New Site
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Build a New Site</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              placeholder="Your New Site"
              helperText={
                <Typography variant="caption" gutterBottom>
                  Choose a recognizable name for your site
                </Typography>
              }
              id="name"
              label="Site Name"
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="dense"
              placeholder="yourdomain.com"
              helperText={
                <Typography variant="caption" gutterBottom>
                  {`We will attempt to buy the provided domain and point it at a brand
              new A+ security rated server. Please ensure you have a connected
              name.com account in your `}
                  <Link to="/profile">profile</Link>.
                </Typography>
              }
              id="domain"
              label="Domain"
              fullWidth
            />
            <TextField
              variant="outlined"
              select
              margin="dense"
              value={this.state.region}
              onChange={this.handleRegionChange}
              helperText={
                <Typography variant="caption" gutterBottom>
                  Choose a region near your planned target audience.
                </Typography>
              }
              id="region"
              label="Region"
              fullWidth
            >
              {Object.entries(REGION_OPTIONS).map(
                ([label, option]: [string, RegionOption]) => (
                  <MenuItem key={option.value} value={option.value}>
                    {label}
                  </MenuItem>
                )
              )}
            </TextField>
            <TextField
              variant="outlined"
              select
              margin="dense"
              value={this.state.size}
              onChange={this.handleSizeChange}
              InputProps={{
                classes: {
                  input: classes.flex
                }
              }}
              helperText={
                <Typography variant="caption" gutterBottom>
                  Choose a size that accommodates the number of pages you plan
                  on creating. Typically <b>Small</b> is enough space for a
                  simple product funnel.
                </Typography>
              }
              id="size"
              label="Server Size"
              fullWidth
            >
              {Object.entries(SIZE_OPTIONS).map(
                ([label, option]: [string, SizeOption]) => (
                  <MenuItem key={option.value} value={option.value}>
                    {`${label} - ${option.value.toLocaleUpperCase()}`}
                    <div style={{ flexGrow: 1 }} />
                    <Currency quantity={option.price} />
                  </MenuItem>
                )
              )}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={this.handleClose}
              color="primary"
              variant="contained"
            >
              Build
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(BuildSiteButton);
