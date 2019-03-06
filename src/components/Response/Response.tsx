import React from "react";
import Sitebuilder from "../../services/Sitebuilder";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

class Response extends React.Component<{}, { sites: any }> {
  componentDidMount = () => {
    Sitebuilder.Response.ListSites().then(data => {
      this.setState({ sites: JSON.parse(data) });
    });
  };
  public render() {
    return (
      this.state &&
      this.state.sites.map((site: { ID: string; NAME: string }) => (
        <Typography variant="h6">
          <Link to={`/response/${site.ID}`}>{site.NAME}</Link>
        </Typography>
      ))
    );
  }
}

export default Response;
