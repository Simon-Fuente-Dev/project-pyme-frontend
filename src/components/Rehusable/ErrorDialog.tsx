import {type Dispatch, type SetStateAction} from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type ErrorProps = {
    title: string,
    content: string,
    errors: string[],
    open: boolean,
    onClose: Dispatch<SetStateAction<boolean>>,
}

const ErrorDialog = ({ title, content, errors, open, onClose } : ErrorProps) => {
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <CloseIcon color="error" sx={{ mr: 1 }} />
                        <Typography variant="h6">{title}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>{content}</Typography>
                    {/*	Recorrer los errors como una lista ordenada de html*/}

                    <ol>
                        {errors.map((err, idx) => (
                            <Typography key={idx} component="li" variant="body2">
                                {err}
                            </Typography>
                        ))}
                    </ol>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ErrorDialog
