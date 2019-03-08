import React from "react";
import { RouteComponentProps } from "react-router";
import { mockData } from "./FunnelList";

export default class FunnelDetails extends React.Component<
  RouteComponentProps<{ funnelid: string }>
> {
  public render() {
    const id = Number(this.props.match.params.funnelid);
    const funnel = mockData.filter(f => f.id === id)[0];
    return <pre>{JSON.stringify(funnel, null, 2)}</pre>;
  }
}
