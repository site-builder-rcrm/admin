import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  open: boolean;
  onClose: (response: any) => void;
}

class ConfirmDialog extends React.Component<ConfirmDialogProps> {
  handleCancel = (event: React.MouseEvent) => {
    this.props.onClose(false);
  };

  handleConfirm = () => {
    this.props.onClose(true);
  };

  render() {
    const { message, title, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleConfirm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;
