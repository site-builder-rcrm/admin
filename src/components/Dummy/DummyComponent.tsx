import React from "react";
import { Paper } from "@material-ui/core";

export default class DummyComponent extends React.Component<{ match: any }> {
  public render() {
    return (
      <Paper elevation={2} style={{ padding: 16 }}>
        <pre>{JSON.stringify(this.props.match, null, 2)}</pre>
      </Paper>
    );
  }
}
