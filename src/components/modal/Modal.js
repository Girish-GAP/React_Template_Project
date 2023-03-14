import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
import { Grid, IconButton } from "@mui/material";

const Modal = ({
  open,
  setModalClose,
  title,
  children,
  size,
  isBackdrop = false,
  className,
  closeButton = true,
  ...rest
}) => {
  const handleClose = () => {
    setModalClose(false);
  };
  return (
    <Dialog
      className={className}
      {...rest}
      fullWidth
      maxWidth={size || "xs"}
      open={open}
      onClose={isBackdrop ? () => {} : handleClose}
    >
      <Grid container>
        <Grid item xs={10}>
          {title && <DialogTitle>{title}</DialogTitle>}
        </Grid>
        <Grid item xs={2} textAlign={"right"}>
          {closeButton && (
            <div className="closeButton">
              <IconButton
                size="small"
                color="default"
                className="deleteButton"
                onClick={handleClose}
                aria-label="edit"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          )}
        </Grid>
      </Grid>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
