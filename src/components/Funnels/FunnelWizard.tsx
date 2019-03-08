import React from "react";
import {
  StyledComponentProps,
  withStyles,
  Theme,
  createStyles,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button
} from "@material-ui/core";
import ResponseSites from "../Response/ResponseSites";
import ResponseProducts from "../Response/ResponseProducts";
import { Link } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

interface FunnelWizardState {
  activeStep: number;
  site?: any;
  group?: any;
}

const funnelSteps = [
  "Funnel Details",
  "Response Site",
  "Product Group",
  "Step 1",
  "Step 2"
];

class FunnelWizard extends React.Component<
  StyledComponentProps,
  FunnelWizardState
> {
  componentDidMount = () => {
    this.setState({ activeStep: 0 });
  };
  public handleSiteChange = (site: any) => {
    this.setState({ site, activeStep: 2 });
  };
  public handleGroupChange = (group: any) => {
    this.setState({ group, activeStep: 3 });
  };
  public render() {
    const activeStep = this.state && this.state.activeStep;
    const classes = this.props.classes || {};
    return (
      this.state && (
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {funnelSteps.map((label, index) => {
              const props = {
                completed: activeStep > index
              };
              return (
                <Step key={label} {...props}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <React.Fragment>
              <Typography variant="h3">Funnel Details</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={event => this.setState({ activeStep: 1 })}
              >
                Next
              </Button>
            </React.Fragment>
          )}
          {activeStep === 1 && (
            <ResponseSites onChange={this.handleSiteChange} />
          )}
          {activeStep === 2 && this.state.site && (
            <ResponseProducts
              siteid={this.state.site.ID}
              onChange={this.handleGroupChange}
            />
          )}
          {activeStep === 3 && this.state.group && (
            <React.Fragment>
              <Typography variant="h3">Step 1 Configuration</Typography>
              <Typography variant="h6">Selected Site</Typography>
              <Typography variant="body2">{this.state.site.NAME}</Typography>
              <Typography variant="body1">{this.state.site.ID}</Typography>
              <Typography variant="h6">Selected Product Group</Typography>
              <Typography variant="body2">{this.state.group.Name}</Typography>
              <Typography variant="body1">{this.state.group.ID}</Typography>
              <Button
                variant="outlined"
                onClick={event => this.setState({ activeStep: 2 })}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={event => this.setState({ activeStep: 4 })}
              >
                Next
              </Button>
            </React.Fragment>
          )}
          {activeStep === 4 && this.state.group && (
            <React.Fragment>
              <Typography variant="h3">Step 2 Configuration</Typography>
              <Typography variant="h6">Selected Site</Typography>
              <Typography variant="body2">{this.state.site.NAME}</Typography>
              <Typography variant="body1">{this.state.site.ID}</Typography>
              <Typography variant="h6">Selected Product Group</Typography>
              <Typography variant="body2">{this.state.group.Name}</Typography>
              <Typography variant="body1">{this.state.group.ID}</Typography>
              <Button
                variant="outlined"
                onClick={event => this.setState({ activeStep: 3 })}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={(props: any) => <Link to="/funnels" {...props} />}
              >
                Finish
              </Button>
            </React.Fragment>
          )}
        </div>
      )
    );
  }
}

export default withStyles(styles)(FunnelWizard);
