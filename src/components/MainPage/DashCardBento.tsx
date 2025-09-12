
import {BarChart, PieChart} from "@mui/x-charts";
import {Typography, Box} from "@mui/material";
import useResponsive from "../../hooks/useResponsive.ts";
const DashCardBento = () => {

    const {isMobile, isTablet, isDesktop} = useResponsive();

    let graphHeight = 250;
    if (isMobile) graphHeight = 300;
    if (isTablet)  graphHeight = 200;
    if (isDesktop) graphHeight = 250;



    return (
        <Box sx={{display: 'grid', gridTemplateColumns: '1fr', p: "10px", placeContent: 'center',height: "100%"}}>
            <Box sx={{display:"flex", flexDirection: "column", textAlign: "center", gap: "10px"}}>
                <Typography
                    variant={"h5"}
                    style={{
                        fontSize: {
                            xs: '1.8rem', // móviles
                            sm: '1.3rem',   // tablets
                            md: '1.3rem', // laptops
                            lg: '2rem',   // escritorios grandes
                        }
                    }}
                >Ventas de los Últimos 6 meses </Typography>
                <BarChart
                    xAxis={[{data: ['Enero 2025', 'Febrero 2025', 'Marzo 2025', 'Abril 2025', 'Mayo 2025', 'Junio 2025']}]}
                    series={[{
                        data: [3,6,9, 3,6,9],
                        color: "#40f2fe"
                    }]}
                    height={graphHeight}

                    // width={graphWidth}
                />
            </Box>

        </Box>

    )
}

export default DashCardBento;


