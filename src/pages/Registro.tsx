import {Paper, Box, Stepper, Step, StepLabel, Typography, StepContent, Button} from "@mui/material";
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import type {RegisterType} from "../types/RegisterType.ts";
import UserSection from "../components/Register/UserSection.tsx";
import {extractErrorMessages} from "../utils/erroresUseForm.ts";
import ErrorDialog from "../components/Rehusable/ErrorDialog.tsx";
import PymeSection from "../components/Register/PymeSection.tsx";


const Registro = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);


    ///Variables del formulario!!
    const {control, watch, handleSubmit, trigger, formState: {errors}, setValue} = useForm<RegisterType>({
        defaultValues: {
            nomUsuario: '',
            email: '',
            password: '',
            nomPyme: '',
            direccion: '',
            comuna: 0,
            region: 0
        }
    });

    const steps = [
        {
            label: "Datos del usuario",
            content: <UserSection control={control} watch={watch} setValue={setValue} />
        },
        {
            label: "Datos de la pyme",
            content: <PymeSection control={control} watch={watch}/>
        },
    ];


    const handleNext = async () => {


        if(activeStep == 0) {
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