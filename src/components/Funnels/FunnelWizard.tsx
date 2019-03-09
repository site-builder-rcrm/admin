import {
  Button,
  Chip,
  createStyles,
  Divider,
  FormHelperText,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import {
  DEFAULT_BILLING_FIELDS,
  DEFAULT_CUSTOMER_FIELDS
} from "../../constants/response";
import Sitebuilder from "../../services/Sitebuilder";
import Fields, { Field } from "../../types/field";
import FormManager from "./FormManager";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2
    },
    spacer: {
      minWidth: theme.spacing.unit
    },
    grow: {
      flexGrow: 1
    },
    flex: {
      display: "flex",
      alignItems: "center"
    }
  });

interface FunnelWizardState {
  activeStep: number;
  name?: string;
  site?: any;
  group?: any;
  siteOptions: any[];
  groupOptions: any[];
  step1Fields: Fields;
  step1Location?: string;
  step2Fields: Fields;
  step2Location?: string;
}

const funnelSteps = ["Funnel Details", "Step 1", "Step 2"];

class FunnelWizard extends React.Component<
  { classes: any },
  FunnelWizardState
> {
  componentDidMount = () => {
    Sitebuilder.Response.ListSites().then(sites => {
      this.setState({
        activeStep: 0,
        site: "",
        group: "",
        groupOptions: new Array(),
        siteOptions: JSON.parse(sites),
        step1Fields: DEFAULT_CUSTOMER_FIELDS,
        step2Fields: DEFAULT_BILLING_FIELDS
      });
    });
  };
  public handleSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    this.setState({ site: event.target.value, group: "" });
    Sitebuilder.Response.ListProducts(event.target.value).then(groups => {
      this.setState({ groupOptions: JSON.parse(groups) });
    });
  };
  public handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ group: event.target.value });
  };
  public handleFunnelNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ name: event.target.value });
  };
  public handleStep1LocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ step1Location: event.target.value });
  };
  public handleStep2LocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ step2Location: event.target.value });
  };
  public handleFieldChangeFor = (fieldGroup: "step1Fields" | "step2Fields") => (
    property: string,
    field: Field
  ) => {
    this.setState(state => ({
      ...state,
      [fieldGroup]: {
        ...state[fieldGroup],
        [property]: field
      }
    }));
  };
  public onSubmit = (event: React.MouseEvent) => {
    var data: any = {
      name: this.state.name,
      responseSite: this.state.site,
      responseGroup: this.state.group.id,
      steps: {}
    };
    if (this.state.step1Location) {
      data.steps[this.state.step1Location] = this.state.step1Fields;
    }
    if (this.state.step2Location) {
      data.steps[this.state.step2Location] = this.state.step2Fields;
    }
    Sitebuilder.Funnels.Create(data).then((response: any) => {
      console.log(response);
    });
  };
  public render() {
    const activeStep = this.state && this.state.activeStep;
    const classes = this.props.classes || {};
    return (
      this.state && (
        <Paper className={classes.root}>
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
              <TextField
                fullWidth
                style={{ marginBottom: 16 }}
                margin="normal"
                variant="outlined"
                placeholder="Your New Funnel"
                label="Funnel Name"
                value={this.state.name}
                required
                onChange={this.handleFunnelNameChange}
              />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Select a Response Site"
                label="Response Site"
                value={this.state.site}
                select
                required
                onChange={this.handleSiteChange}
              >
                {this.state.siteOptions.map(site => (
                  <MenuItem key={site.ID} value={site.ID}>
                    {site.NAME}
                  </MenuItem>
                ))}
              </TextField>
              {Boolean(this.state.site) &&
                !Boolean(this.state.groupOptions.length) && (
                  <FormHelperText error>
                    The selected site does not have any available product
                    groups.
                  </FormHelperText>
                )}
              {this.state.site && (
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled={!Boolean(this.state.groupOptions.length)}
                  placeholder="Select a Product Group"
                  label="Product Group"
                  value={this.state.group}
                  select
                  required
                  InputProps={{
                    classes: {
                      input: classes.flex
                    }
                  }}
                  onChange={this.handleGroupChange}
                >
                  {this.state.groupOptions.map(group => (
                    <MenuItem key={group.ID} value={group.ID}>
                      <Typography variant="body1">{group.Name}</Typography>
                      <div className={classes.grow} />
                      <Typography variant="caption" color="secondary">
                        <code>{group.ProductGroupGUID}</code>
                      </Typography>
                      <div className={classes.spacer} />
                      <Chip
                        label={`${group.Charges.length} charge${
                          group.Charges.length === 1 ? "" : "s"
                        }`}
                      />
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <br />
              <br />
              <Divider />
              <br />
              <Button
                variant="outlined"
                color="primary"
                disabled={
                  !Boolean(
                    this.state.name && this.state.site && this.state.group
                  )
                }
                onClick={event => this.setState({ activeStep: 1 })}
              >
                Next
              </Button>
            </React.Fragment>
          )}
          {activeStep === 1 && this.state.group && (
            <React.Fragment>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Provide the URL where this step will be loaded (ex. '/shipping')"
                label="Step Location"
                value={this.state.step1Location}
                onChange={this.handleStep1LocationChange}
              />
              <br />
              <FormManager
                fields={this.state.step1Fields}
                onChange={this.handleFieldChangeFor("step1Fields")}
              />
              <br />
              <br />
              <Divider />
              <br />
              <Button
                variant="outlined"
                onClick={event => this.setState({ activeStep: 0 })}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={event => this.setState({ activeStep: 2 })}
              >
                Next
              </Button>
            </React.Fragment>
          )}
          {activeStep === 2 && this.state.group && (
            <React.Fragment>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Provide the URL where this step will be loaded (ex. '/billing')"
                label="Step Location"
                value={this.state.step2Location}
                onChange={this.handleStep2LocationChange}
              />
              <br />
              <FormManager
                fields={this.state.step2Fields}
                onChange={this.handleFieldChangeFor("step2Fields")}
              />
              <br />
              <br />
              <Divider />
              <br />
              <Button
                variant="outlined"
                onClick={event => this.setState({ activeStep: 1 })}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.onSubmit}
                component={(props: any) => <Link to="/funnels" {...props} />}
              >
                Finish
              </Button>
            </React.Fragment>
          )}
        </Paper>
      )
    );
  }
}

export default withStyles(styles)(FunnelWizard);
