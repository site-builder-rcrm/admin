import React from "react";
import {
  StyledComponentProps,
  withStyles,
  Theme,
  createStyles,
  Divider,
  Button,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";

const styles = (theme: Theme) =>
  createStyles({
    root: {}
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
  public buttonLinkComponent = (funnelid: number) => (props: any) => (
    <Link to={`/funnels/${funnelid}`} {...props} />
  );
  public render() {
    const classes = this.props.classes || {};
    const funnels = mockData;
    return (
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
            {funnels.map((funnel, index) => (
              <React.Fragment key={funnel.id}>
                <ListItem
                  button
                  component={this.buttonLinkComponent(funnel.id)}
                >
                  <ListItemText primary={funnel.name} secondary={funnel.id} />
                  <ListItemSecondaryAction>
                    <IconButton
                      component={this.buttonLinkComponent(funnel.id)}
                      aria-label={`Edit ${funnel.name} Funnel`}
                    >
                      <Tooltip title="Edit Funnel" placement="left">
                        <Edit />
                      </Tooltip>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index !== funnels.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FunnelList);
