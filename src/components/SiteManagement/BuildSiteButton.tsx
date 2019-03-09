import {
  Checkbox,
  createStyles,
  FormGroup,
  StyledComponentProps,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";
import { REGION_OPTIONS, SIZE_OPTIONS } from "../../constants/sites";
import Sitebuilder from "../../services/Sitebuilder";
import {
  RegionOption,
  RegionValue,
  SizeOption,
  SizeValue
} from "../../types/sites";

interface BuildSiteButtonState {
  open: boolean;
  domain: string;
  region: RegionValue | "";
  size: SizeValue | "";
  whoisPrivacy: boolean;
  autoRenew: boolean;
  keyStrength: any;
  cipherSuite: any;
}

const styles = (theme: Theme) =>
  createStyles({
    flex: {
      display: "flex"
    },
    formControlRow: {
      display: "flex"
    },
    formControl: {
      flex: 1
    }
  });

interface BuildSiteButtonProps extends StyledComponentProps {
  onSubmit: (newServerData: any) => void;
}

class BuildSiteButton extends React.Component<
  BuildSiteButtonProps,
  BuildSiteButtonState
> {
  public state: BuildSiteButtonState = {
    open: false,
    whoisPrivacy: true,
    autoRenew: true,
    domain: "",
    region: "",
    size: "2gb",
    keyStrength: "2048",
    cipherSuite: "2"
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    Sitebuilder.Servers.Create({
      whoisPrivacy: this.state.whoisPrivacy,
      autoRenew: this.state.autoRenew,
      url: this.state.domain,
      region: this.state.region,
      size: this.state.size,
      cipherstr: this.state.keyStrength,
      ciphersuite: this.state.cipherSuite
    }).then(response => {
      this.props.onSubmit(response);
      this.handleClose();
    });
  };

  public handleInputChangeFor = (inputName: string) => (
    event: React.ChangeEvent<any>
  ) => {
    this.setState({
      ...this.state,
      [inputName]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
    console.log(this.state);
  };

  render() {
    const classes = this.props.classes || {};
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
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
              margin="dense"
              autoFocus
              required
              type="url"
              value={this.state.domain}
              onChange={this.handleInputChangeFor("domain")}
              placeholder="yourdomain.com"
              helperText={
                <Typography variant="caption" gutterBottom>
                  {`We will attempt to buy the provided domain and point it at a brand
              new A+ security rated server. Please ensure you have a connected
              name.com account in your `}
                  <Link to="/profile" tabIndex={-1}>
                    profile
                  </Link>
                  .
                </Typography>
              }
              id="domain"
              label="Domain"
              fullWidth
            />
            <FormGroup row>
              <FormControlLabel
                label="Who Is Privacy"
                control={
                  <Checkbox
                    checked={this.state.whoisPrivacy}
                    onChange={this.handleInputChangeFor("whoisPrivacy")}
                  />
                }
              />
              <FormControlLabel
                label="Auto-Renew"
                control={
                  <Checkbox
                    checked={this.state.autoRenew}
                    onChange={this.handleInputChangeFor("autoRenew")}
                  />
                }
              />
            </FormGroup>
            <TextField
              variant="outlined"
              select
              required
              margin="dense"
              value={this.state.region}
              onChange={this.handleInputChangeFor("region")}
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
              required
              margin="dense"
              value={this.state.size}
              onChange={this.handleInputChangeFor("size")}
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
            <FormGroup row>
              <FormControl
                className={classes.formControl}
                margin="dense"
                required
              >
                <FormLabel>Key Strength</FormLabel>
                <RadioGroup
                  aria-label="Security"
                  name="security"
                  className={classes.group}
                  value={this.state.keyStrength}
                  onChange={this.handleInputChangeFor("keyStrength")}
                >
                  <FormControlLabel
                    value="4096"
                    control={<Radio />}
                    label="4096"
                  />
                  <FormControlLabel
                    value="2048"
                    control={<Radio />}
                    label="2048 (Recommended)"
                  />
                  <FormControlLabel
                    value="1024"
                    control={<Radio />}
                    label="1024"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl
                className={classes.formControl}
                margin="dense"
                required
              >
                <FormLabel>Cipher Suite</FormLabel>
                <RadioGroup
                  aria-label="ciphersuite"
                  name="ciphersuite"
                  className={classes.group}
                  value={this.state.cipherSuite}
                  onChange={this.handleInputChangeFor("cipherSuite")}
                >
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Strong"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Medium (Recommended)"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Weak"
                  />
                </RadioGroup>
              </FormControl>
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
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
