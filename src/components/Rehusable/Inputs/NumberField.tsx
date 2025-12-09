import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText
} from "@mui/material";

import {
    Controller,
    type FieldValues,
} from "react-hook-form";

import { type ControlInputProps } from "../../../types/InputTypes.ts";
import type { SxProps, Theme } from "@mui/material/styles";

type ControlNumberFieldProps<T extends FieldValues> = ControlInputProps<T> & {
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    sx?: SxProps<Theme>;
};
import { NumberField } from "@mui/material"; // Asegúrate de que es el correcto

function ControlNumberField<T extends FieldValues>({
                                                       name,
                                                       label,
                                                       control,
                                                       rules,
                                                       icon,
                                                       iconPosition = "start",
                                                       helperText = "",
                                                       sx = {}
                                                   }: ControlNumberFieldProps<T>) {
    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <>
                        <InputLabel id={name} sx={sx}>
                            {label}
                        </InputLabel>

                        <NumberField
                            {...field}
                            id={name}
                            label={label}
                            sx={sx}
                            value={field.value ?? null}
                            error={!!fieldState.error}
                            onChange={(event, numericValue) => {
                                field.onChange(numericValue ?? "");
                            }}
                            slotProps={{
                                input: {
                                    startAdornment:
                                        icon && iconPosition === "start" ? (
                                            <InputAdornment position="start">{icon}</InputAdornment>
                                        ) : undefined,
                                    endAdornment:
                                        icon && iconPosition === "end" ? (
                                            <InputAdornment position="end">{icon}</InputAdornment>
                                        ) : undefined
                                }
                            }}
                        />

                        {helperText && (
                            <FormHelperText sx={sx}>{helperText}</FormHelperText>
                        )}
                    </>
                )}
            />
        </FormControl>
    );
}
