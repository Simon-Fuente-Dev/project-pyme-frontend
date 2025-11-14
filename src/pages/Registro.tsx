import {Paper, Box, Stepper, Step, StepLabel, Typography, StepContent, Button} from "@mui/material";
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import type {RegisterType} from "../types/RegisterType.ts";
import UserSection from "../components/Register/UserSection.tsx";
import {extractErrorMessages} from "../utils/erroresUseForm.ts";
import ErrorDialog from "../components/Rehusable/ErrorDialog.tsx";
import PymeSection from "../components/Register/PymeSection.tsx";
import {useRegistrarUsuario} from "../api/Registro/useRegistrar.ts";
import axios from "axios";


const Registro = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const {mutate, isPending, isError} = useRegistrarUsuario()


    ///Variables del formulario!!
    const {
        control,
        watch,
        handleSubmit,
        trigger,
        formState: {errors},
        setValue,
        getValues,
        setError
    } = useForm<RegisterType>({
        defaultValues: {
            nomUsuario: '',
            email: '',
            password: '',
            nomPyme: '',
            direccion: '',
            comuna: 0,
            region: 0,
            subServicio: []
        }
    });

    const steps = [
        {
            label: "Datos del usuario",
            content: <UserSection control={control} watch={watch} setValue={setValue}/>
        },
        {
            label: "Datos de la pyme",
            content: <PymeSection control={control} watch={watch} setValue={setValue}/>
        },
    ];


    const handleNext = async () => {


        if (activeStep == 0) {
            const valid1 = await trigger([
                "pnombre",
                "snombre",
                "appaterno",
                "apmaterno",
                "nomUsuario",
                "email",
                "password",
                "rPassword",
            ]);
            if (!valid1) return; // ❌ No avanzar si hay errores

        }
        if (activeStep == 1) {
            const valid2 = await trigger([
                "nomPyme",
                "descPyme",
                "tipoServicio",
                "subServicio",
                "direccion",
                "region",
                "comuna",
            ]);
            if (!valid2) return;

            const formData = getValues();
            mutate(formData, {
                onSuccess: (response) => {
                    console.log(response)
                },
                onError: (err) => {
                    if (axios.isAxiosError(err) && err.response) {
                        const errorMessage = err.response.data?.message ?? "Error desconocido";
                        const dataError = err.response.data?.data ?? 0;
                        const arrMensaje = [errorMessage];

                        switch (dataError) {
                            case 1:
                                setError("nomUsuario", {
                                    type: "manual",
                                    message: "El nombre de usuario ya existe"
                                })
                                setActiveStep(0)
                                break;
                            case 2:
                                setError("email", {
                                    type: "manual",
                                    message: "El correo electronico ya existe"
                                })
                                setActiveStep(0)
                                break;
                        }


                        setErrorMessages(arrMensaje);
                        setOpenErrorDialog(true);

                    } else {
                        console.log("Error inesperado:", err);
                    }
                }
            })
            return;
        }


        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleError = (err: typeof errors) => {
        const messages = extractErrorMessages<RegisterType>(err);
        setErrorMessages(messages);
        setOpenErrorDialog(true);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            // padding: '1rem',
            paddingBlock: {
                xl: '5rem',
                lg: '4rem',
                md: '3rem',
                sm: '2rem',
                xs: '1rem',
            },
            paddingInline: {
                xl: '6rem',
                lg: '5rem',
                md: '4rem',
                sm: '1rem',
                xs: '1rem',
            },

        }}>
            <Paper elevation={6} sx={{width: '100%', height: '100%', paddingInline: "2rem", paddingBlock: "1rem"}}>
                <Stepper activeStep={activeStep} orientation={"vertical"}>
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                            >
                                <Typography variant={"h5"}>
                                    {step.label}
                                </Typography>

                            </StepLabel>
                            <StepContent>
                                {step.content}

                                <Box>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit(handleNext, handleError)}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        Back
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            <ErrorDialog
                title="Errores al Registrarse"
                content="Por favor corrija los siguientes errores"
                errors={errorMessages}
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
            />

        </Box>
    )
}

export default Registro;