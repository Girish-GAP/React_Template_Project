import React, { FC, useCallback, useMemo, useState } from "react";
import {
    Grid,
    Typography,
    CircularProgress,
    Container,
    AlertColor,
} from "@mui/material";
import Notification from "../../../components/Notification";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import Modal from "../../../components/modal/Modal";
import axiosInstance from "../../../utils/axios";
interface deleteProps {
    openModal?: boolean;
    closeModal: any;
    deleteUrl: string;
    updateList: () => void;
}
const Delete: FC<deleteProps> = ({ openModal, closeModal, deleteUrl, updateList }) => {
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


    const confirmDelete = useCallback(async () => {
        try {
            await axiosInstance.delete(deleteUrl);
            updateList();
            closeModal();
            setLoading(true);
            setMessage({
                display: true,
                message: `User has been deleted Successfully`,
                severity: "success",
            });
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setMessage({
                    display: true,
                    severity: "warning",
                    message: error.response.data.message,
                });
            }
            console.log(error);
        }
    }, [deleteUrl, updateList, closeModal]);

    const deleteModalContent = useMemo(() => {
        return (
            <Grid container spacing={2}>
                <Grid item>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1,
                            fontSize: 24,
                            fontWeight: 600,
                            color: "#333333",
                        }}
                    >
                        Delete
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mb:2,
                            fontWeight: 400,
                            color: "#727272",
                        }}
                    >
                        Are you sure you want to delete?
                    </Typography>
                </Grid>
                <Grid item>
                    <PrimaryButton
                        variant="outlined"
                        onClick={closeModal}
                    >
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton
                        disabled={loading}
                        variant="contained"
                        onClick={confirmDelete}
                        sx={{ color: "#ffffff", py: 0, ml:3 }}
                    >
                        {loading && <CircularProgress sx={{ mr: 1 }} size={20} />} Yes!
                        Delete
                    </PrimaryButton>
                    </Grid>
            </Grid>
        );
    }, [loading, confirmDelete, closeModal]);


    const deleteModal = useMemo(() => {
        return (
            <Modal
                open={openModal}
                setModalClose={closeModal}
                children={deleteModalContent}
                title={undefined}
                size={undefined}
                className={undefined}
                closeButton={false}
            />
        );
    }, [openModal, deleteModalContent, closeModal]);

    const closeNotification = (value: boolean) => {
        setMessage({ ...message, display: value });
    };

    return (
        <Container sx={{ p: "1rem" }} maxWidth={false}>
            {deleteModal}
            <Grid container spacing={2}>
                {message.display && (
                    <Notification
                        isOpen={message.display}
                        message={message.message}
                        severity={message.severity as AlertColor}
                        closeNotification={closeNotification}
                    />
                )}

            </Grid>
        </Container>
    );
};
export default Delete;
