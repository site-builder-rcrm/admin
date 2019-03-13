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
import { Edit, Delete, DeleteForever } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Sitebuilder from "../../services/Sitebuilder";
import moment from "moment";
import ConfirmDialog from "../Alerts/ConfirmDialog";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    spacer: {
      minWidth: theme.spacing.unit * 10
    }
  });

interface FunnelsState {
  funnels: Array<any>;
  confirmTitle: string;
  confirmMessage: string;
  confirmOpen: boolean;
  confirmCallback: (answer: any) => void;
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
  public getFunnelList = () => {
    Sitebuilder.Funnels.List().then(response => {
      this.setState({ funnels: response });
    });
  };

  public componentDidMount = this.getFunnelList;

  public negateFunnelStatus = (funnel: any, refresh: boolean) => (
    event: React.MouseEvent
  ) => {
    this.setState({
      confirmTitle: `${refresh ? "Archive Site" : "Permanently Delete"}`,
      confirmMessage: `Are you sure you want to ${
        refresh ? "archive" : "permanently delete"
      } ${funnel.name}?`,
      confirmOpen: true,
      confirmCallback: (answer: any) => {
        this.setState({ confirmOpen: false });
        if (answer) {
          Sitebuilder.Funnels.Archive(funnel.id).then(() => {
            if (refresh) {
              this.getFunnelList();
            } else {
              this.setState(state => {
                return {
                  funnels: state.funnels.filter(f => f.id !== funnel.id)
                };
              });
            }
          });
        }
      }
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
          <ConfirmDialog
            open={this.state.confirmOpen}
            onClose={this.state.confirmCallback}
            message={this.state.confirmMessage}
            title={this.state.confirmTitle}
          />
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
                      {funnel.archived ? (
                        <IconButton
                          aria-label={`Delete ${funnel.name} Funnel`}
                          onClick={this.negateFunnelStatus(funnel, false)}
                        >
                          <DeleteForever color="error" />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label={`Archive ${funnel.name} Funnel`}
                          onClick={this.negateFunnelStatus(funnel, true)}
                        >
                          <Delete color="error" />
                        </IconButton>
                      )}
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
