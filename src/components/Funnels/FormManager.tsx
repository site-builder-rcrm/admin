import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  StyledComponentProps,
  TextField,
  Theme,
  withStyles
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Email,
  ExpandMore,
  Phone,
  TextFields,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import React from "react";
import Fields, { Field } from "../../types/field";

interface FormManagerProps
  extends StyledComponentProps<"expansionPanelContent"> {
  fields: Fields;
  onChange: (property: string, field: Field) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    expansionPanelContent: {
      alignItems: "center"
    }
  });

const FIELD_TYPE_ICON_MAP: {
  [type: string]: any;
} = {
  text: <TextFields />,
  email: <Email />,
  phone: <Phone />
};

class FieldForm extends React.Component<any, any> {
  componentDidMount = () => {
    this.setState({ ...this.props.field });
  };
  componentDidUpdate = (prevProps: any) => {
    if (this.props != prevProps) {
      this.setState({ ...this.props.field });
    }
  };
  public handleInputChangeFor = (inputName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      [inputName]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
  };
  public saveChanges = (event: React.MouseEvent) => {
    this.props.onSave(this.props.property, this.state);
  };
  public render() {
    const { property } = this.props;
    return (
      this.state && (
        <div>
          <ExpansionPanelDetails>
            <TextField
              variant="outlined"
              value={this.state.label}
              label="Field Label"
              required
              placeholder={`${property} field label`}
              onChange={this.handleInputChangeFor("label")}
            />
            <TextField
              variant="outlined"
              value={this.state.default}
              label="Default Value"
              placeholder={`${property} default value`}
              onChange={this.handleInputChangeFor("default")}
            />
            <FormControlLabel
              label="Required"
              control={
                <Checkbox
                  checked={this.state.required}
                  onChange={this.handleInputChangeFor("required")}
                />
              }
            />
            <FormControlLabel
              label="Hide"
              control={
                <Checkbox
                  checked={this.state.hide}
                  onChange={this.handleInputChangeFor("hide")}
                />
              }
            />
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.saveChanges}
            >
              Save Changes
            </Button>
          </ExpansionPanelActions>
        </div>
      )
    );
  }
}

class FormManager extends React.Component<
  FormManagerProps,
  { expanded: boolean | string }
> {
  public render() {
    const classes = this.props.classes || {};
    const { fields } = this.props;
    return (
      <div>
        {Object.entries(fields).map(([property, field]) => (
          <ExpansionPanel key={property}>
            <ExpansionPanelSummary
              classes={{ content: classes.expansionPanelContent }}
              expandIcon={<ExpandMore />}
            >
              <Avatar>{FIELD_TYPE_ICON_MAP[field.type]}</Avatar>
              <ListItemText
                primary={field.label}
                secondary={field.required ? "Required" : "Optional"}
              />
              {field.default && (
                <ListItemText
                  primary={"Default Value"}
                  secondary={field.default}
                />
              )}
              {field.hide ? (
                <VisibilityOff color="disabled" />
              ) : (
                <Visibility color="inherit" />
              )}
              <div />
            </ExpansionPanelSummary>
            <FieldForm
              property={property}
              field={field}
              onSave={this.props.onChange}
            />
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(FormManager);
