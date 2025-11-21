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


type ControlTextFieldIcon<T extends FieldValues> = ControlInputProps<T> & {
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
}

function ControlTextField<T extends FieldValues>({
                                                     name,
                                                     label,
                                                     control,
                                                     rules,
                                                     icon,
                                                     iconPosition = "start",
                                                     helperText = "",
                                                 }: ControlTextFieldIcon<T>) {
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
                            error={!!fieldState.error}
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
                            <FormHelperText >
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