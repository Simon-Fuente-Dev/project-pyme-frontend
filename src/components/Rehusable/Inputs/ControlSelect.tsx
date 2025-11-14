import {
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    FormHelperText,
} from '@mui/material';
import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
    type RegisterOptions,
} from 'react-hook-form';
import React from 'react';

type ControlSelectProps<TFieldValues extends FieldValues, TOption> = {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    rules?: RegisterOptions;
    data: TOption[];
    valueField: keyof TOption;
    textField: keyof TOption;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
    disabled?: boolean;
    defaultValue?: string | number | Array<string | number>;
    size?: 'small' | 'medium';
    fullWidth?: boolean;
    multiple?: boolean;
};

function ControlSelect<TFieldValues extends FieldValues, TOption>({
                                                                      name,
                                                                      label,
                                                                      control,
                                                                      rules,
                                                                      data = [],
                                                                      valueField,
                                                                      textField,
                                                                      icon,
                                                                      iconPosition = 'start',
                                                                      disabled = false,
                                                                      defaultValue = '',
                                                                      size = 'medium',
                                                                      fullWidth = true,
                                                                      multiple = false,
                                                                  }: ControlSelectProps<TFieldValues, TOption>) {
    const labelId = `${name}-label`;

    return (
        <FormControl fullWidth={fullWidth} disabled={disabled}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue ?? (multiple ? [] : '')}
                render={({ field, fieldState }) => (
                    <>
                        <Select
                            {...field}
                            labelId={labelId}
                            id={name}
                            size={size}
                            value={
                                multiple
                                    ? Array.isArray(field.value) ? field.value : []
                                    : field.value ?? ""
                            }
                            error={!!fieldState.error}
                            multiple={multiple}
                            input={
                                <OutlinedInput
                                    label={label}
                                    startAdornment={
                                        icon && iconPosition === 'start' ? (
                                            <InputAdornment position="start">{icon}</InputAdornment>
                                        ) : undefined
                                    }
                                    endAdornment={
                                        icon && iconPosition === 'end' ? (
                                            <InputAdornment position="end">{icon}</InputAdornment>
                                        ) : undefined
                                    }
                                    error={!!fieldState.error}
                                />
                            }
                        >
                            <MenuItem value="">
                                <em>Seleccione...</em>
                            </MenuItem>
                            {data.map((option) => (
                                <MenuItem key={String(option[valueField])} value={option[valueField]}>
                                    {String(option[textField])}
                                </MenuItem>
                            ))}
                        </Select>
                        {fieldState.error && (
                            <FormHelperText>{fieldState.error.message}</FormHelperText>
                        )}
                    </>
                )}
            />
        </FormControl>
    );
}

export default ControlSelect ;
