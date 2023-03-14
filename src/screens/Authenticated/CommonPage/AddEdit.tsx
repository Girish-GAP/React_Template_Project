import React, { FC, RefObject, useState, MouseEvent, useRef } from "react";
import {
    Grid,
    Typography,
    Divider,
    AlertColor,
    CircularProgress,
    IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Form, { FormDataModel } from "../../../components/Form";
import { removeErrorFieldsFromValues } from "../../../utils/validators";
import Notification from "../../../components/Notification";
import axiosInstance from "../../../utils/axios";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { Close } from "@mui/icons-material";


interface AddEditProps {
    pageConfig: any;
    pageResponse: object;
    handlePropsChange?: (key: string, value: any, formdata: any, deleted: any) => void;
    handleCustomResponse?: (body: FormDataModel) => { [key: string]: string | number | boolean },
    customCallbackResponse?: any,
    isFormUpdated?: boolean,
    dropdownValue?: any,
    isFormData?: any,
}
const AddEdit: FC<AddEditProps> = ({ pageConfig, pageResponse, handlePropsChange, handleCustomResponse, customCallbackResponse, dropdownValue }) => {
    const Navigate = useNavigate();
    const { id } = useParams() as any;
    let formRef: RefObject<Form | null | undefined> = useRef();
    const [loading, setLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [message, setMessage] = useState<{
        display: boolean;
        severity: AlertColor | null;
        message: string;
    }>({
        display: false,
        severity: null,
        message: "",
    });
    const handleAddEdit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const { getFormData } = formRef.current as {
                getFormData: () => { formData: FormDataModel; isFormValid: boolean };
            };
            const { formData, isFormValid } = getFormData();
            const body = removeErrorFieldsFromValues(formData);
            const method = id ? 'put' : 'post';
            setHasError(false);
            if (isFormValid) {
                const requestData = handleCustomResponse ? handleCustomResponse(body) : body;
                setLoading(true);
                const { status, data } = await axiosInstance[method](pageConfig.addEditApiUrl, requestData, pageConfig.isFormData && {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (status === 200 || status === 201) {
                    setLoading(false);
                    setMessage({
                        display: true,
                        severity: "success",
                        message: pageConfig.successMessage,
                    });
                    setTimeout(() => {
                        if (customCallbackResponse) {
                            customCallbackResponse(data);
                        }
                        if (pageConfig.navigateToPage) {
                            Navigate(`${pageConfig.navigateToPage}`);
                        }

                    }, 1000);
                }
            } else {
                setHasError(true);
            }
        } catch (error: any) {
            console.log(error)
            setLoading(false);
            if (error.response) {
                setMessage({
                    display: true,
                    severity: "warning",
                    message: error.response.data.message,
                });
            }
        }
    };

    const closeNotification = (value: boolean) => {
        setMessage({ ...message, display: value });
    };
    const handleChange = (key: string, value: any, formdata: any, delted: any) => {
        if (handlePropsChange) {
            handlePropsChange(key, value, formdata, delted)
        }
    }

    return (
        <Grid className="content">
            <Grid container spacing={2}>
                {message.display && (
                    <Notification
                        isOpen={message.display}
                        message={message.message}
                        severity={message.severity as AlertColor}
                        closeNotification={closeNotification}
                    />
                )}
                <Grid item xs={10}>
                    <Typography sx={{ fontSize: 24, fontWeight: 500 }}> {pageConfig.title}</Typography>
                </Grid>
                <Grid item textAlign='right' xs={2}>
                    <IconButton onClick={() => Navigate(pageConfig.navigateToPage || -1)} aria-label="delete">
                        <Close />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Form
                    isFormUpdated={id}
                    dropdownData={dropdownValue ? dropdownValue : {}}
                    hasError={hasError}
                    ref={formRef as RefObject<Form>}
                    model={pageConfig.formModel}
                    values={id ? pageResponse : {}}
                    onChange={handleChange}
                />

            </Grid>
            <Grid container sx={{ my: 5 }}>
                <PrimaryButton fullWidth={false} variant="contained"
                    onClick={handleAddEdit}>
                    {loading && <CircularProgress color="inherit" sx={{ mr: 1 }} size={20} />}
                    {pageConfig?.buttonText || pageConfig.title}
                </PrimaryButton>
            </Grid>
        </Grid>
    );
};
export default AddEdit;
