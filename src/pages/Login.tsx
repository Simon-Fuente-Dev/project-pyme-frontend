import {
    Box,
    Paper,
    Grid,
    Typography,
    Button
} from "@mui/material";


import {useForm} from "react-hook-form";
import {ControlPasswordField} from "../components/Rehusable/Inputs/PasswordField.tsx";
import {ControlTextField} from "../components/Rehusable/Inputs/TextField.tsx";
import type { LoginUser } from "../types/UserTypes.ts";
import { useAuthUsuario } from "../api/Login/useLogin.ts";
import { useAppContext } from "../context/AppContext.tsx";
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const {control, register, handleSubmit} = useForm<LoginUser>({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const navigate = useNavigate();

    const {setToken} = useAppContext()


    ///Funcion para enviar la informacion al backend
    const {mutate, data: dataLogin, isPending, isError} = useAuthUsuario();
    

    const onSubmit = (data: LoginUser) => {
        mutate(data, {
            onSuccess: (response) => {
                const {success, message, data: authData} = response

                if(!success) {
                    console.log('Error:', message);
                    return;
                }
                setToken(authData.token)
                
                localStorage.setItem('token', authData.token)

                navigate('/')
                
            }
        });
    }

    const onError = (error: any) => {
        console.log(error);
    }

    const registrarse = () => {
        navigate('/Registrarse')
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "4fr 2fr",
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
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'flex-end',
                        alignItems: "flex-end",
                        gap: "0.5rem",
                    }}>
                        <Button
                            variant="outlined"
                            onClick={handleSubmit(onSubmit, onError)}
                        >Iniciar Sesion</Button>
                        <Button
                            variant="outlined"
                            onClick={() => registrarse()}
                        >Registrarse</Button>
                    </Box>

                </Paper>
            </Box>
        </Box>
    )
}

export default Login;