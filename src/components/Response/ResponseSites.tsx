import {
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  StyledComponentProps,
  TextField,
  Theme,
  withStyles
} from "@material-ui/core";
import React from "react";
import Sitebuilder from "../../services/Sitebuilder";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxHeight: `calc(100vh - ${theme.spacing.unit * 36}px)`,
      overflowY: "auto"
    }
  });

interface ResponseSite {
  ID: number;
  NAME: string;
}

interface ResponseSiteProps extends StyledComponentProps {
  onChange: (site: any) => void;
}

interface ResponseSitesState {
  sites: ResponseSite[];
  search: string;
}

class ResponseSites extends React.Component<
  ResponseSiteProps,
  ResponseSitesState
> {
  public state = {
    sites: new Array(),
    search: ""
  };
  public componentDidMount = () => {
    Sitebuilder.Response.ListSites().then(data => {
      this.setState({ sites: JSON.parse(data) });
    });
  };
  public handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value.toLocaleLowerCase() });
  };
  public selectSite = (site: any) => (event: React.MouseEvent) => {
    this.props.onChange(site);
  };
  public render() {
    const classes = this.props.classes || {};
    const sites =
      this.state && this.state.sites && this.state.sites.length
        ? this.state.sites.filter(
            site =>
              !this.state.search ||
              site.ID.toString()
                .toLocaleLowerCase()
                .indexOf(this.state.search) > -1 ||
              site.NAME.toLocaleLowerCase().indexOf(this.state.search) > -1
          )
        : undefined;
    return sites ? (
      <React.Fragment>
        <TextField
          fullWidth
          placeholder="Filter Response Sites..."
          margin="normal"
          value={this.state.search}
          variant="outlined"
          onChange={this.handleSearchChange}
        />

        <Paper className={classes.paper}>
          <List>
            {sites.map((site, index) => (
              <React.Fragment key={site.ID}>
                <ListItem button onClick={this.selectSite(site)}>
                  <ListItemText primary={site.NAME} secondary={site.ID} />
                </ListItem>
                {index !== sites.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    ) : (
      "Loading"
    );
  }
}

export default withStyles(styles)(ResponseSites);
