import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox
} from "@material-ui/core";
import Sitebuilder from "../../services/Sitebuilder";

class FunnelSelector extends React.Component<
  any,
  { funnel: string; open: boolean; funnels?: Array<any> }
> {
  public componentDidMount = () => {
    this.setState({ open: false, funnel: this.props.value });
  };

  public openSelector = (event: React.MouseEvent) => {
    Sitebuilder.Funnels.List().then(response => {
      this.setState({ funnels: response.filter(f => !f.archived), open: true });
    });
  };

  public selectFunnel = (funnel: string) => (event: React.MouseEvent) => {
    this.setState({ funnel });
  };

  public handleCancel = (event: React.MouseEvent) => {
    this.setState({ open: false });
  };

  public handleConfirm = (event: React.MouseEvent) => {
    Sitebuilder.Servers.AssignFunnel(this.props.site, this.state.funnel).then(
      () => {
        this.props.onChange(this.state.funnel);
        this.setState({ open: false });
      }
    );
  };

  public render() {
    return (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={this.openSelector}>
          {this.props.value ? "Change" : "Select"}
        </Button>
        {this.state && (
          <Dialog
            maxWidth="md"
            aria-labelledby="selector-dialog-title"
            open={this.state.open}
          >
            <DialogTitle id="selector-dialog-title">
              Select a Funnel{" "}
              <Typography variant="body1">
                The funnel you choose will define the checkout process for your
                site.
              </Typography>
            </DialogTitle>
            <DialogContent style={{ padding: 0 }}>
              <List>
                {this.state.funnels &&
                  this.state.funnels.map((f, i) => (
                    <React.Fragment key={f.id}>
                      <ListItem dense button onClick={this.selectFunnel(f.id)}>
                        <Checkbox
                          checked={this.state.funnel === f.id}
                          tabIndex={-1}
                          disableRipple
                        />
                        <ListItemText primary={f.name} secondary={f.id} />
                      </ListItem>
                      {this.state.funnels &&
                        i < this.state.funnels.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel}>Cancel</Button>
              <Button
                onClick={this.handleConfirm}
                color="primary"
                variant="contained"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </React.Fragment>
    );
  }
}

export default FunnelSelector;
