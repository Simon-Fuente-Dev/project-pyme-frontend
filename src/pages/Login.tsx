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
import type { LoginUser } from "../types/UserTypes.ts";
import { useAuthUsuario } from "../api/useLogin.ts";
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

    const {setUserId, setPymeId, setNomPyme} = useAppContext()


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
                
                setUserId(authData.id_usuario)
                setPymeId(authData.id_pyme)
                setNomPyme(authData.nombre_pyme)
                
                localStorage.setItem('token', authData.token)

                localStorage.setItem('userId', authData.id_usuario.toString())
                localStorage.setItem('pymeId', authData.id_pyme.toString())
                localStorage.setItem('nomPyme', authData.nombre_pyme)


                navigate('/')
                
            }
        });
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
    )
}

export default Login;