import type {Dispatch, SetStateAction} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
type SuccessProps = {
    title: string,
    content: string,
    open: boolean,
    onClose: Dispatch<SetStateAction<boolean>>,
}
const SuccessDialog = ({ title, content, open, onClose }: SuccessProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <CheckBoxIcon color="green" sx={{ mr: 1 }} />
                    <Typography variant="h6">{title}</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography sx={{marginBottom: '1rem'}} >{content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    )

}

export default SuccessDialog;