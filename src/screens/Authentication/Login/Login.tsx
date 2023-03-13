import React, { FC, MouseEvent, RefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import {
  AlertColor,
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Form, { FormDataModel } from "../../../components/Form";
import Notification from "../../../components/Notification/Notification";
import { LoginForm } from "./LoginForm";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { removeErrorFieldsFromValues } from "../../../utils/validators";
import { Link } from "react-router-dom";
import { URLS } from "../../../utils/constants/urls";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../../utils/redux";
import axiosInstance from "../../../utils/axios";
import strings from "../../../common/Translation/Translate";

const Login: FC<any> = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  // Created Use Ref Variable / pointer
  // loginFormRef Points to the Form Component
  let loginForm: RefObject<Form | null | undefined> = useRef();

  const matches = useMediaQuery(theme.breakpoints.up("lg"));  // css

  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    display: boolean;
    severity: AlertColor | null;
    message: string;
  }>({
    display: false,
    severity: null,
    message: "",
  });

  // handelLogin function will call when user will click on login Button
  // async function call // pass paramter e which is of type HTMLButtonElement
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Before accessing the getFormData method from the form component, 
    // the code performs a type-cast on the current property of loginFormRef using the as operator. 
    // This type-cast is necessary because the type of the current property is null | undefined | Form, 
    // and the code wants to access a specific method on the form component (getFormData).
    const { getFormData } = loginForm.current as {
      getFormData: () => { formData: FormDataModel; isFormValid: boolean };
    };

    const { formData, isFormValid } = getFormData();
    const bodyData = removeErrorFieldsFromValues(formData);
    const body = {email : bodyData.username, password : bodyData.password}

    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.REACT_APP_CLIENT,
          password: process.env.REACT_APP_SECRET,
        },
      };
      setHasError(false);
      if (isFormValid) {
        setLoading(true);
        const { status, data } = await axiosInstance.post("http://localhost:3001/union/login", body, config as any);
        if (data.token) {
          setLoading(false);
          dispatch(setAuthentication(data));
          Navigate("/", { replace: true });
        }
        else{
          console.log("WRONG PASSWORD || EMAIL")
          setLoading(false);
        }

      } else {
        setHasError(true);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        setActionMessage(true, "warning", error.response.data.error_description);
      }
    }
  };

  const closeNotification = (value: boolean) => {
    setMessage({ ...message, display: value });
  };

  const setActionMessage = (
    display: boolean = false,
    severity: AlertColor = "warning",
    message: string = ""
  ) => {
    setMessage({
      display,
      severity,
      message,
    });
  };

  return (
    <Container
      sx={matches ? {} : { px: 0 }}
      className={"login-container"}
      maxWidth={false}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "calc(100vh)" }}
      >
        {message.display && (
          <Notification
            isOpen={message.display}
            message={message.message}
            severity={message.severity as AlertColor}
            closeNotification={closeNotification}
          />
        )}
        <Grid item xs={12} sm={8} lg={4}>
          <Box textAlign="center" mb={3}>
            <img 
            // style={{ backgroundColor: theme.palette.primary.main }} 
            src='https://g05991.p3cdn1.secureserver.net/wp-content/uploads/2021/10/CBT_Updated_Logo-168x55.png' alt="logo" />
          </Box>
          <Card sx={{ p: matches ? 2 : 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {strings.login_title_text}
            </Typography>
            <form onSubmit={handleLogin as any}>
              <Form
                hasError={hasError}
                ref={loginForm as RefObject<Form>}
                model={LoginForm()}
                values={{}}
              />
              {/* <Box my={2}>
                <Captcha verify={verifyCallback} />
                <Typography variant="subtitle2" color='error'>{captaFlag ? strings.captchaValidation : ''}</Typography>
              </Box> */}
              <PrimaryButton
                disabled={loading}
                fullWidth
                sx={{ mt: 1, color: "#ffffff" }}
                onClick={handleLogin}
                type="submit"
              >
                {loading && <CircularProgress sx={{ mr: 1 }} size={20} />}
                {strings.loginText}
              </PrimaryButton>
            </form>

            <Link to={"/forgot-password"} className="other-links">
              <Typography
                variant="body1"
                sx={{ mb: 1, mt: 2 }}
                align={"center"}
              >
                Forgot Password
              </Typography>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
