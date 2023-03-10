import React, { FC, SyntheticEvent } from "react";
import { AlertColor, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface NotificationProps {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number | null;
  closeNotification: (value: boolean) => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification: FC<NotificationProps> = ({
  isOpen,
  message,
  severity,
  autoHideDuration,
  closeNotification,
}) => {
  let duration: number | null = 10000;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    closeNotification(false);
  };

  if (autoHideDuration !== undefined) {
    duration = autoHideDuration;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      onClick={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
