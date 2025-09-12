import {useTheme} from "@mui/material/styles";
import {Divider, Paper, Typography, Box} from "@mui/material";

type BentoCardProps = {
    title: string;
    icon: React.ReactNode;
    colorIcon: string;
    children?: React.ReactNode;
}
const BentoCard = ({title, children, icon, colorIcon = 'white'}: BentoCardProps) => {
    const theme = useTheme();
    return (
        <Paper sx={{height: "100%", borderColor: "white", display: "flex", flexDirection: "column"}} elevation={3}
               variant="outlined">
            <Box sx={{display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid white", paddingBlock: "4px"}}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colorIcon ,
                    ml: "0.25rem",
                    fontSize: {
                        xs: '1.8rem', // móviles
                        sm: '1.3rem',   // tablets
                        md: '1.3rem', // laptops
                        lg: '2rem',   // escritorios grandes
                    }}}>
                    {icon}
                </Box>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontSize: {
                            xs: '1.3rem', // móviles
                            sm: '1rem',   // tablets
                            md: '1rem', // laptops
                            lg: '1.3rem',   // escritorios grandes
                        },
                        color: "white"
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {children}
        </Paper>
    )
}

export default BentoCard;