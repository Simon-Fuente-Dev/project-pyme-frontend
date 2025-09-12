import {Avatar, Box, Paper, Typography} from "@mui/material"
import StarRating from "../Rehusable/StarRating.tsx";


type CommentType = {
    id: number;
    nombre: string;
    calificacion: number;
    comentario: string;
}


const comments: CommentType[] = [
    {id: 1, nombre: "Maria antonieta", calificacion: 5, comentario:"klsjadlaksdjadskj asdkljaskjdlkajsd lkjsadlkjasdkjas klasdjasdkljadslkjasdlkj"},
    {id: 2, nombre: "Saki to wea", calificacion: 3, comentario:"Muy buena la comida"},
    {id: 3, nombre: "Foca", calificacion: 3.3, comentario:"asdjkdaslkjsalk asdklajsdnmfaw kfajsdkjfasdlkjdfsan kldasjlkfsda sdakomasfdlkmasd kljdasfkmdsfalkmasd klasfjkljdflasfd kljfdslkmafsdklfsdaj kjdsflm,asdfilsdfa ,kljsdfamasdfm i"},
];

const LastCommentCard = () => {

    const objSize = {xs: 15, sm: 15, md: 15, lg: 15};

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            gap: "16px",
            paddingBlock: "12px",
            paddingInline: "24px",
        }}>
            {comments.map((comment: CommentType) => (
                <Paper
                    elevation={4}
                    index={comment.id}
                    sx={{
                        width: "100%",
                        padding: "8px",
                        display: "flex",
                        flexDirection: 'column',
                        gap: "8px",
                    }}>
                    {/*Seccion de los datos del usuario que hizo el comentario*/}
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        gap: "8px"
                    }}>
                        <Avatar>{(comment.nombre).charAt(0)}</Avatar>
                        <Box>
                            <Typography>{comment.nombre}</Typography>
                            <StarRating cant={comment.calificacion} objSize={objSize} />
                        </Box>

                    </Box>
                    {/*Seccion del comentario*/}
                    <Box sx={{width: '100%' }}>
                        <Typography
                            sx={{
                                wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', fontSize: '0.8rem',
                            }}
                        >{comment.comentario}</Typography>

                    </Box>
                </Paper>
            ))}

        </Box>
    )
}

export default LastCommentCard;