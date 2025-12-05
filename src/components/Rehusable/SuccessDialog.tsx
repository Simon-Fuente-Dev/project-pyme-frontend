import type {Dispatch, SetStateAction} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    Tooltip,
    IconButton
} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from "@mui/icons-material/Cancel";
type SuccessProps = {
    title: string,
    content: string,
    open: boolean,
    onClose: Dispatch<SetStateAction<boolean>>,
}
const SuccessDialog = ({ title, content, open, onClose }: SuccessProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "1rem"
                }}
            >
                <Box display="flex" alignItems="center">
                    <CheckBoxIcon color="green" sx={{ mr: 1 }} />
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <Tooltip title={"Cerrar"}>
                    <IconButton
                        onClick={onClose}
                    >
                        <CancelIcon/>
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            <DialogContent>
                <Typography sx={{marginBottom: '1rem'}} >{content}</Typography>
            </DialogContent>
        </Dialog>
    )

}

export default SuccessDialog;