import {
    Box,
    Paper,
    Grid,
    Typography,
    TextField,
    FormControl, Button
} from "@mui/material";

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import {useForm} from "react-hook-form";
import {ControlPasswordField} from "../components/Rehusable/PasswordField.tsx";
import {ControlTextField} from "../components/Rehusable/TextField.tsx";

interface LoginUser  {
    username: string;
    password: string;
}

const Login = () => {

    const {control, register, handleSubmit} = useForm<LoginUser>({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onSubmit = (data: LoginUser) => {
        console.log(data);
    }

    const onError = (error: any) => {
        console.log(error);
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "3fr 2fr",
                placeContent: "center",
                width: "100%",
                height: "100vh",
                padding: "4rem",
            }}
        >
            <Box>
                <h1>Hola</h1>
            </Box>
            <Box>
                <Paper elevation={1} sx={{paddingInline: "2rem", paddingBlock: "1rem", gap: "2rem", display: "flex", flexDirection: "column"}}>
                    <Typography variant={"h4"} color={"primary"}>
                        Inicio de sesion
                    </Typography>
                    <Grid container
                          direction="column"
                          spacing={2}
                    >
                        <Grid item xs={12}>
                            <ControlTextField<LoginUser>
                                name={"username"}
                                label={"Nombre de usuario"}
                                control={control}
                                rules={{
                                    required: "El nombre de usuario es obligatorio",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ControlPasswordField<LoginUser>
                                name={"password"}
                                label={"Contraseña"}
                                control={control}
                                rules={{
                                    required: "La contraseña es obligatoria"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit, onError)}
                    >Iniciar Sesion</Button>
                </Paper>
            </Box>
        </Box>
        // <Grid container
        //       direction="column"
        //       spacing={0}
        //       sx={{width: "100%", height: "100vh", padding: "4rem", background: "white"}}>
        //     <Grid item sx={{backgroundColor: "red", width: "500px", height: "700px"}}>
        //     </Grid>
        //     <Grid item sx={{backgroundColor: "red"}}>
        //
        //     </Grid>
        //
        // </Grid>
    )
}

export default Login;