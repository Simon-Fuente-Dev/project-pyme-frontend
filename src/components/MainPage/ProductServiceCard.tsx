import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea, Box
} from "@mui/material"
import useResponsive from "../../hooks/useResponsive.ts";

interface Items {
    id: number;
    title: string;
    description: string;
    price: number;
    img: string;
}

const items: Items[] = [
    {
        id: 1,
        title: "Hamburguesa doble",
        description: "Hamburguesa jugosa",
        price: 3500,
        img: "/images/hamburguesa.png"
    }, {
        id: 2,
        title: "Completo italiano",
        description: "Maravilla culinaria",
        price: 2500,
        img: "/images/completo.jpg"
    }, {
        id: 3,
        title: "Papas fritas",
        description: "Deliciosas papas estilo malolal",
        price: 1500,
        img: "/images/papasfritas.jpg"
    },
]


const ProductServiceCard = () => {

    const {isMobile, isTablet, isDesktop} = useResponsive();

    let imageHeight = 200;
    if (isMobile) imageHeight = 120;
    if (isTablet)  imageHeight = 100;
    if (isDesktop) imageHeight = 200;

    return (
        <Box sx={{
            display: "flex",
            gap: "40px",
            // flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "30px"
        }}>
            {/*<Card sx={{maxWidth: 200}}>*/}
            {items.map((item: Items) => (
                <Card key={item.id} sx={{maxWidth: 250}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height={imageHeight}
                            image={item.img}
                            alt={item.title}
                            sx={{
                                width: "100%",
                                objectFit: "cover",
                                borderBottom: "1px solid white",
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                {item.description}
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Precio: {item.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

        </Box>
    )
}

export default ProductServiceCard;