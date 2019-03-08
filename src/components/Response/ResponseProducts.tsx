import {
  Button,
  Card,
  CardContent,
  createStyles,
  Divider,
  Grid,
  StyledComponentProps,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React from "react";
import Currency from "react-currency-formatter";
import Sitebuilder from "../../services/Sitebuilder";

interface ResponseProductsProps extends StyledComponentProps {
  siteid?: number;
  onChange: (group: any) => void;
}

interface ResponseProductsState {
  products: any;
}

const styles = (theme: Theme) =>
  createStyles({
    group: {
      height: "100%",
      display: "flex",
      flexFlow: "column nowrap"
    },
    groupContent: {
      textAlign: "center",
      flexFlow: "column nowrap"
    },
    charges: {
      maxHeight: 120,
      overflowY: "auto"
    },
    chargeContainer: {
      padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit}px`,
      width: "100%",
      display: "flex",
      alignItems: "center",
      textAlign: "left"
    },
    chargeType: {
      padding: `0 ${theme.spacing.unit}px`,
      color: theme.palette.secondary.dark
    },
    chargeAmount: {
      padding: `0 0 0 ${theme.spacing.unit}px`,
      minWidth: 65,
      textAlign: "right",
      color: green[500]
    },
    grow: {
      flexGrow: 1
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center"
    }
  });

class ResponseProducts extends React.Component<
  ResponseProductsProps,
  ResponseProductsState
> {
  componentDidMount = () => {
    if (this.props.siteid) {
      const siteid = this.props.siteid.toString();
      Sitebuilder.Response.ListProducts(siteid).then(response => {
        const products = JSON.parse(response);
        this.setState({
          products
        });
      });
    }
  };
  public selectProductGroup = (group: any) => (event: React.MouseEvent) => {
    this.props.onChange(group);
  };
  public render() {
    const classes = this.props.classes || {};
    let productGroups;
    if (this.state && this.state.products && this.state.products.length) {
      productGroups = this.state.products;
      console.log(productGroups);
    }
    return (
      <Grid container spacing={16}>
        {productGroups &&
          productGroups.map((group: any) => (
            <Grid item key={group.ID} md={3} sm={4} xs={6}>
              <Card elevation={2} className={classes.group}>
                <CardContent className={classes.groupContent}>
                  <Typography variant="h6">{group.Name}</Typography>
                  <Typography variant="caption">
                    {group.ProductGroupGUID}
                  </Typography>
                </CardContent>
                <div className={classes.charges}>
                  {group.Charges.map((charge: any, index: number) => (
                    <React.Fragment key={charge.ID}>
                      <div className={classes.chargeContainer}>
                        <Typography variant="body2" title={charge.Name} noWrap>
                          {charge.Name}
                        </Typography>
                        <div className={classes.grow} />
                        <Typography
                          variant="body1"
                          className={classes.chargeType}
                        >
                          {charge.Type.split(" ")[0]}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.chargeAmount}
                        >
                          <Currency quantity={charge.Amount} />
                        </Typography>
                      </div>
                      {index < group.Charges.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </div>
                <div className={classes.grow} />
                <CardContent className={classes.buttonContainer}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={this.selectProductGroup(group)}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(ResponseProducts);
