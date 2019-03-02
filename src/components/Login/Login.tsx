import React, { Component } from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  withStyles,
  Snackbar,
  Zoom,
  Fade
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import LoginStyles from "./LoginStyles";
import Alert from "../Alerts/Alert";
import UserProfile from "../../types/user";

interface LoginProps {
  classes: any;
  onSubmit: (user: UserProfile) => void;
}

export interface LoginState {
  password: string;
  username: string;
  remember: boolean;
  showPassword: boolean;
  error: string | null;
  showError: boolean;
  showForm: boolean;
}

class Login extends Component<LoginProps, LoginState> {
  public state = {
    password: "",
    username: "",
    remember: false,
    showPassword: false,
    showError: false,
    showForm: true,
    error: null
  };

  public handleInputChangeFor = (inputName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      ...this.state,
      [inputName]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
  };

  public handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  public handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({ showForm: false });
    this.props.onSubmit({
      username: this.state.username,
      firstName: "Mason",
      lastName: "Stedman",
      email: "mstedman@rcrm-site-builder.com",
      phone: "(555) 555-5555"
    });
  };

  public handleCloseError = () => {
    this.setState({ showError: false });
  };

  public handleError = (error: {
    response: { body: { error_description: string } };
  }) => {
    this.setState({
      showForm: true,
      showError: true,
      error: error.response.body.error_description
    });
  };

  public render() {
    const { classes } = this.props;
    return (
      <Fade in={true}>
        <div className={classes.root}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.showError}
            onClose={this.handleCloseError}
            message={
              <span id="login-error-message">
                {(this.state && this.state.error && `${this.state.error}`) ||
                  "An Error Occured"}
              </span>
            }
          >
            <Alert
              variant="error"
              onClose={this.handleCloseError}
              message={
                <span id="login-error-message">
                  {(this.state && this.state.error && `${this.state.error}`) ||
                    "An Error Occured"}
                </span>
              }
            />
          </Snackbar>
          <Zoom in={this.state.showForm}>
            <div>
              <form onSubmit={this.handleSubmit} className={classes.form}>
                {/* <img
                  className={classes.logo}
                  src="/logo_purple.png"
                  alt="OrderCloud.io"
                /> */}
                <Typography variant="title" color="default" gutterBottom>
                  SiteBuilder
                </Typography>
                <Typography variant="subtitle1" color="default" gutterBottom>
                  Admin Login
                </Typography>
                <TextField
                  className={classes.textFields}
                  type="text"
                  label="Username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor("username")}
                />
                <TextField
                  className={classes.textFields}
                  type={this.state.showPassword ? "text" : "password"}
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment variant="filled" position="end">
                        <Tooltip
                          title={
                            this.state.showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.remember}
                      onChange={this.handleInputChangeFor("remember")}
                      value="remember"
                    />
                  }
                  label="Keep me logged in"
                />
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </div>
          </Zoom>
        </div>
      </Fade>
    );
  }
}

export default withStyles(LoginStyles)(Login);
