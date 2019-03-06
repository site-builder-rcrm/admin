import React from "react";
import { RouteComponentProps } from "react-router";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import Sitebuilder from "../../services/Sitebuilder";
import { AnyKindOfDictionary } from "lodash";

interface ProductsState {
  products: any;
}

class Products extends React.Component<
  RouteComponentProps<{ siteid: string }>,
  ProductsState
> {
  componentDidMount = () => {
    const siteid = this.props.match.params.siteid;
    Sitebuilder.Response.ListProducts(siteid).then(products => {
      this.setState({
        products: JSON.parse(products)
      });
    });
  };
  public render() {
    return (
      this.state &&
      this.state.products.map((product: any) => (
        <ExpansionPanel elevation={1} key={product.ID}>
          <ExpansionPanelSummary>{product.Name}</ExpansionPanelSummary>
          {product.Charges && product.Charges.length && (
            <ExpansionPanelDetails
              style={{ padding: 0, maxHeight: 400, overflowY: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(product.Charges[0]).map(key => (
                      <TableCell>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.Charges.map((chargeRow: any) => (
                    <TableRow>
                      {Object.values(chargeRow).map(value => (
                        <TableCell>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ExpansionPanelDetails>
          )}
        </ExpansionPanel>
      ))
    );
  }
}

export default Products;
