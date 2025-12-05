import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton, FormHelperText
} from "@mui/material";

import {
    Controller,
    type FieldValues,
} from "react-hook-form";

import {type ControlInputProps} from "../../../types/InputTypes.ts"
import type { SxProps, Theme } from '@mui/material/styles';

type ControlTextFieldIcon<T extends FieldValues> = ControlInputProps<T> & {
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    sx?: SxProps<Theme>;
}

function ControlTextField<T extends FieldValues>({
                                                     name,
                                                     label,
                                                     control,
                                                     rules,
                                                     icon,
                                                     iconPosition = "start",
                                                     helperText = "",
                                                     sx= {}
                                                 }: ControlTextFieldIcon<T>) {
    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field, fieldState}) => (
                    <>
                        <InputLabel id={name} sx={sx}>{label}</InputLabel>
                        <OutlinedInput
                            {...field}
                            id={name}
                            label={label}
                            error={!!fieldState.error}
                            sx={sx}
                            startAdornment={
                                icon && iconPosition === "start" ? (
                                    <InputAdornment position={"start"}>{icon}</InputAdornment>
                                ) : undefined
                            }
                            endAdornment={
                                icon && iconPosition === "end" ? (
                                    <InputAdornment position={"end"}>{icon}</InputAdornment>
                                ) : undefined
                            }
                        />
                        {helperText ? (
                            <FormHelperText
                                sx={sx}
                            >
                                {helperText}
                            </FormHelperText>
                        ) : (
                            <></>
                        )}

                    </>
                )}/>
        </FormControl>
    )
}

export {ControlTextField}


// function Control