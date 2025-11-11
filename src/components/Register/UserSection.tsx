import {type Control} from "react-hook-form";
import {Typography, Box, Button} from "@mui/material";
import type {RegisterType} from "../../types/RegisterType.ts";
import {ControlTextField} from "../Rehusable/Inputs/TextField.tsx";

import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {ControlPasswordField} from "../Rehusable/Inputs/PasswordField.tsx";

type Props = {
    control: Control<RegisterType>;
    watch: (name: keyof RegisterType) => any;
    setValue: (name: keyof RegisterType, value: any) => void;
};


// nomUsuario: '',
//     email: '',
//     password: '',
//     nomPyme: '',
//     direccion: '',
//     comuna: 0,
//     region: 0

const UserSection = ({control, watch, setValue}: Props) => {
    const llenarForm = () => {
        setValue("pnombre", "Juan");
        setValue("snombre", "Carlos");
        setValue("appaterno", "Pérez");
        setValue("apmaterno", "González");
        setValue("nomUsuario", "juanp");
        setValue("email", "juan@example.com");
        setValue("password", "1234");
        setValue("rPassword", "1234");
    };

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xl: '1fr 1fr 1fr 1fr',
                lg: '1fr 1fr 1fr ',
                md: '1fr 1fr 1fr',
                sm: '1fr 1fr',
                xs: 'auto',

            },
            gap: '1.5rem',
        }}>

            <ControlTextField<RegisterType>
                name={"pnombre"}
                label={"Primer Nombre"}
                control={control}
                rules={{
                    required: "Debe Ingresar el primer nombre",
                }}
            />
            <ControlTextField<RegisterType>
                name={"snombre"}
                label={"Segundo Nombre"}
                control={control}
            />
            <ControlTextField<RegisterType>
                name={"appaterno"}
                label={"Primer Apellido"}
                control={control}
                rules={{
                    required: "Debe Ingresar el Primer Apellido",
                }}
            />
            <ControlTextField<RegisterType>
                name={"apmaterno"}
                label={"Segundo Apellido"}
                control={control}
            />

            <ControlTextField<RegisterType>
                name={"nomUsuario"}
                label={"Nombre de Usuario"}
                control={control}
                icon={<PersonIcon />}
                rules={{
                    required: "Debe Ingresar un nombre de Usuario",
                }}
            />

            <ControlTextField<RegisterType>
                name={"email"}
                label={"Correo Electronico"}
                control={control}
                icon={<AlternateEmailIcon />}
                rules={{
                    required: "Debe Ingresar un correo electronico",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Formato de correo no válido",
                    }
                }}
            />
            <ControlPasswordField<RegisterType>
                name={"password"}
                label={"Contraseña"}
                control={control}
                rules={{
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 4,
                        message: "La contraseña debe tener un largo minimo de 4 caracteres"
                    }
                }}
            />
            <ControlPasswordField<RegisterType>
                name={"rPassword"}
                label={"Repetir Contraseña"}
                control={control}
                rules={{
                    validate: (value) =>
                        value === watch("password") || "Las contraseñas no coinciden"
                }}
            />

            <Button
                onClick={llenarForm}
            >Llenar form</Button>
        </Box>

    )
}

export default UserSection;