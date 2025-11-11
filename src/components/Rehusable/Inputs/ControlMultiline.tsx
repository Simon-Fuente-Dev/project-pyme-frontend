import {FormControl, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";

import {Controller, type FieldValues} from "react-hook-form";
import {type ControlInputProps} from "../../../types/InputTypes.ts";

type ControlMultilineProps<T extends FieldValues> = ControlInputProps<T> & {
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    rows: number;
    maxLength?: number;
    watch: (name: keyof T) => any;
}

function ControlMultiline<T extends FieldValues>({
                                                     name,
                                                     label,
                                                     control,
                                                     rules,
                                                     icon,
                                                     iconPosition = 'start',
                                                     rows,
                                                     watch,
                                                     maxLength,
                                                 }: ControlMultilineProps<T>) {
    const value = watch(name) || "";
    let mensaje = `Caracteres restantes: ${value.length}/${maxLength}`;
    if (value.length >= (maxLength ?? Infinity)) {
        mensaje = `Alcanzó el máximo de caracteres ${value.length}/${maxLength}`;
    }

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
                            multiline
                            rows={rows}
                            error={!!fieldState.error}
                            startAdornment={
                                icon && iconPosition === 'start' ? (
                                    <InputAdornment position={'start'}>{icon}</InputAdornment>
                                ) : undefined
                            }
                            endAdornment={
                                icon && iconPosition === 'end' ? (
                                    <InputAdornment position={'end'}>{icon}</InputAdornment>
                                ) : undefined
                            }
                        />
                        <Typography
                            align={'right'}
                            color={(value.length >= maxLength) ? 'red' : 'white'}
                        >{mensaje}</Typography>
                    </>
                )}


            />
        </FormControl>
    )
}

export default ControlMultiline;