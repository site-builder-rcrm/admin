import React from "react";
import { RouteComponentProps } from "react-router";
import { Paper } from "@material-ui/core";

interface ProfileProps extends RouteComponentProps {
  session?: any | null;
}

class Profile extends React.Component<ProfileProps> {
  public render() {
    return (
      <Paper elevation={1} style={{ margin: 16, padding: "8px 16px" }}>
        <pre>{JSON.stringify(this.props.session, null, 2)}</pre>
      </Paper>
    );
  }
}

export default Profile;
