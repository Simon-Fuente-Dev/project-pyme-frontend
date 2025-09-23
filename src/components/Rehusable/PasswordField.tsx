import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {useState} from "react";

import {
    Controller,
    type FieldValues,
} from "react-hook-form";

import {type ControlInputProps} from "../../types/InputTypes.ts"


function ControlPasswordField<T extends FieldValues>({
                                                         name,
                                                         label,
                                                         control,
                                                         rules
                                                     }: ControlInputProps<T>) {

    const [mostrarPass, setMostrarPass] = useState<boolean>(false);

    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field, fieldState}) => (
                    <>
                        <InputLabel id={name}>{label}</InputLabel>
                        <OutlinedInput
                            {...field}
                            id={name}
                            label={label}
                            type={mostrarPass ? "text" : "password"}
                            error={!!fieldState.error}
                            endAdornment={
                                <InputAdornment position={"end"}>
                                    <IconButton
                                        onClick={() => setMostrarPass((prev) => !prev)}
                                        edge={"end"}
                                    >
                                        {mostrarPass ? <VisibilityOffIcon/> : <VisibilityIcon/>}

                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </>


                )}/>
        </FormControl>
    )
}

export {ControlPasswordField};