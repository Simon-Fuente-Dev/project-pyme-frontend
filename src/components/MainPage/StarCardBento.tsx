import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {Box,Chip, Button} from '@mui/material';

import {useLocation, useNavigate} from 'react-router-dom'
import StarRating from "../Rehusable/StarRating.tsx";


const StarCardBento = () => {

    const navigate = useNavigate();

    const rating = 5;
    const objSize = {xs: 70, sm: 50, md: 60, lg: 80};


    return (
        <Box sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px"
        }}>

            <StarRating cant={rating} objSize={objSize}/>
            <Chip sx={{marginTop: "2px"}} label={"3.000 Reseñas"}/>
            <Button
                sx={{marginTop: "10px"}}
                variant={"contained"}
                onClick={()=> navigate("/Review")}
            >
                Ver detalle</Button>
        </Box>

    )
}


export default StarCardBento