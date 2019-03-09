import {
  Button,
  createStyles,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  StyledComponentProps,
  Theme,
  withStyles,
  Typography
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Sitebuilder from "../../services/Sitebuilder";
import moment from "moment";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    spacer: {
      minWidth: theme.spacing.unit * 10
    }
  });

interface FunnelsState {
  funnels: Array<any>;
}

export const mockData = [
  {
    id: 123456,
    name: "My first funnel",
    responseSite: "1003300",
    responseGroup: "3cc6da14-2d81-4663-b3e8-06a56144de81",
    stepCount: 3, //3 step, 2 step, or 1 step checkout
    assignments: [5, 1], //site assignments
    steps: {
      1: {
        url: "/shipping",
        config: {} //potentially template & custom styling/components
      },
      2: {
        url: "/billing",
        config: {}
      },
      3: {
        url: "/confirmation",
        config: {}
      }
    }
  }
];

class FunnelList extends React.Component<StyledComponentProps, FunnelsState> {
  componentDidMount = () => {
    Sitebuilder.Funnels.List().then(response => {
      this.setState({ funnels: response });
    });
  };
  public buttonLinkComponent = (funnelid: number) => (props: any) => (
    <Link to={`/funnels/${funnelid}`} {...props} />
  );
  public render() {
    const classes = this.props.classes || {};
    return (
      this.state &&
      this.state.funnels && (
        <React.Fragment>
          <Button
            variant="outlined"
            color="primary"
            component={(props: any) => <Link to="/funnels/create" {...props} />}
          >
            Build New Funnel
          </Button>
          <br />
          <br />
          <Paper className={classes.paper}>
            <List>
              {this.state.funnels.map((funnel, index) => (
                <React.Fragment key={funnel.id}>
                  <ListItem
                    button
                    component={this.buttonLinkComponent(funnel.id)}
                  >
                    <ListItemText
                      primary={funnel.name || "Untitled"}
                      secondary={funnel.id}
                    />
                    <Typography variant="body2">{`Created by ${
                      funnel.creator
                    } on ${moment(funnel.created).format(
                      "M/D/YYYY"
                    )}`}</Typography>
                    <div className={classes.spacer} />
                    <ListItemSecondaryAction>
                      <IconButton
                        component={this.buttonLinkComponent(funnel.id)}
                        aria-label={`Edit ${funnel.name} Funnel`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton aria-label={`Edit ${funnel.name} Funnel`}>
                        <Delete color="error" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index !== this.state.funnels.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </React.Fragment>
      )
    );
  }
}

export default withStyles(styles)(FunnelList);
