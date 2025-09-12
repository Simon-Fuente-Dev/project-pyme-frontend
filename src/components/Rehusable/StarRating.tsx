import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {Box} from "@mui/material";

type StarProp = {
    value: number,
    objSize: {
        xs: number,
        sm: number,
        md: number,
        lg: number,
    }
}

type StarRatingProp = {
    cant: number,
    objSize: {
        xs: number,
        sm: number,
        md: number,
        lg: number,
    }
}

const Star = ({value, objSize}: StarProp) => {
    const iconStyle = {fontSize: objSize, color: "gold"};
    if (value === 1) return <StarIcon sx={iconStyle}/>;
    if (value === 0.5) return <StarHalfIcon sx={iconStyle}/>;
    return <StarOutlineIcon sx={iconStyle}/>;
}

const StarRating = ({cant, objSize}: StarRatingProp) => {

    const fullStars = Math.floor(cant);
    const hasHalfStar = cant % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} value={1} objSize={objSize}/>
            ))}
            {hasHalfStar && <Star value={0.5} objSize={objSize}/>
            }
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} value={0} objSize={objSize}/>
            ))}
        </Box>
    )

}

export default StarRating;