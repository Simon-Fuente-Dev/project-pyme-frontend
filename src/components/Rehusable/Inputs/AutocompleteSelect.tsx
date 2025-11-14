import {
    Autocomplete,
    TextField,
    InputAdornment,
} from '@mui/material';
import { Controller, type FieldValues } from 'react-hook-form';
import React from 'react';
import type { ControlInputProps } from '../../../types/InputTypes.ts';

type ControlAutocompleteProps<T extends FieldValues, TOption extends Record<string, any>> =
    ControlInputProps<T> & {
    data: TOption[];
    valueField: keyof TOption;
    textField: keyof TOption;
    icon?: React.ReactNode;
    onChange?: (selectedId: string | number, selectedObject?: TOption | null) => void;
    disabled?: boolean;
    defaultValue?: string | number;
    size?: 'small' | 'medium';
};

function ControlAutocomplete<T extends FieldValues, TOption extends Record<string, any>>({
                                                                                             name,
                                                                                             control,
                                                                                             label,
                                                                                             rules,
                                                                                             data,
                                                                                             valueField,
                                                                                             textField,
                                                                                             icon,
                                                                                             onChange,
                                                                                             disabled = false,
                                                                                             defaultValue = '',
                                                                                             size = 'medium',
                                                                                         }: ControlAutocompleteProps<T, TOption>) {

    const findOptionByValue = (val: string | number | null): TOption | null => {
        if (val == null || val === '') return null;
        const norm = String(val);
        return data.find(opt => String(opt?.[valueField]) === norm) || null;
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue as any}
            render={({ field, fieldState }) => {
                const selectedOption =
                    typeof field.value === 'object' && field.value !== null
                        ? field.value
                        : findOptionByValue(field.value);

                return (
                    <Autocomplete
                        disablePortal
                        disabled={disabled}
                        options={data}
                        size={size}
                        value={selectedOption}
                        getOptionLabel={(option: TOption | string) =>
                            typeof option === 'string'
                                ? option
                                : (option?.[textField] ?? '') as string
                        }
                        isOptionEqualToValue={(option, value) =>
                            option?.[valueField] === value?.[valueField]
                        }
                        onChange={(_, newValue) => {
                            const newId = newValue ? newValue[valueField] : '';
                            field.onChange(newId);
                            onChange?.(newId, newValue ?? null);
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={String(option[valueField])}>
                                {String(option[textField])}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                inputProps={{
                                    ...params.inputProps,
                                    placeholder: '',
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    placeholder: '',
                                    startAdornment: icon ? (
                                        <InputAdornment position="start">
                                            {icon}
                                        </InputAdornment>
                                    ) : undefined,
                                }}
                            />
                        )}
                    />
                );
            }}
        />
    );
}

export default ControlAutocomplete;
