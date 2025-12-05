import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box, IconButton, Tooltip,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import type {Dispatch, SetStateAction} from "react";
import TagIcon from "@mui/icons-material/Tag";

type WinProps = {
    title: string;
    open: boolean;
    content: string;
    confirmText: string;
    onClose: Dispatch<SetStateAction<boolean>>;
    onConfirm: () => void | Promise<void>;
}

const ConfirmDialog = ({
                           title,
                           open,
                           onClose,
                           content,
                           confirmText = "Aceptar",
                           onConfirm
                       }: WinProps) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={true}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <Box sx={{display: "flex", alignItems: "center", gap: "0.3em"}}>
                        <TagIcon/>
                        {title}
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
                    <Typography sx={{marginBottom: '1rem'}}>{content}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"contained"}
                        onClick={async () => {
                            await onConfirm(); // 🔥 Ejecuta la acción recibida
                        }}
                    >
                        {confirmText}
                    </Button>
                    <Button
                        color={"error"}
                        variant={"contained"}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialog;