import '../styles/MainPage.css'
import {useAppContext} from "../context/AppContext";
import BentoCard from "../components/MainPage/BentoCard.tsx";
import StarCardBento from "../components/MainPage/StarCardBento.tsx";
import DashCardBento from "../components/MainPage/DashCardBento.tsx";

import StarIcon from '@mui/icons-material/Star';
import BarChartIcon from '@mui/icons-material/BarChart';
import CommentIcon from '@mui/icons-material/Comment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ProductServiceCard from "../components/MainPage/ProductServiceCard.tsx";
import LastCommentCard from "../components/MainPage/LastCommentCard.tsx";


const MainPage = () => {
    const {userId, nomPyme, pymeId} = useAppContext()
    console.log(userId);
    console.log(nomPyme);
    console.log(pymeId);
    return (
        <div className="parent">
            <div className="div1">
                <BentoCard
                    title="Mi Calificación"
                    icon={<StarIcon sx={{fontSize: 'inherit'}}/>}

                    colorIcon="gold">
                    <StarCardBento/>
                </BentoCard>
            </div>
            <div className="div2">
                <BentoCard
                    icon={<BusinessCenterIcon sx={{fontSize: 'inherit'}}/>}
                    title="Top productos y servicios"
                    colorIcon="#c237db"
                    >
                    <ProductServiceCard />

                </BentoCard>

            </div>
            <div className="div3">
                <BentoCard
                    title="Estadísticas"
                    icon={<BarChartIcon sx={{fontSize: 'inherit'}}/>}
                    colorIcon="#40f2fe">
                    <DashCardBento/>

                </BentoCard>

            </div>
            <div className="div4">
                <BentoCard
                    title="Ultimas Ventas"
                    icon={<MonetizationOnIcon sx={{fontSize: 'inherit'}}/>}
                    colorIcon="#44F814">
                    4
                </BentoCard>

            </div>
            <div className="div5">
                {/*<BentoCard*/}
                {/*    title="Ultimos Comentarios"*/}
                {/*    icon={<CommentIcon sx={{fontSize: 'inherit'}}/>}*/}
                {/*    colorIcon="#FF8000">*/}
                {/*    <LastCommentCard />*/}
                {/*</BentoCard>*/}

            </div>
        </div>

    )
}

export default MainPage;