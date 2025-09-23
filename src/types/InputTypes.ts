import type {Control, FieldValues, Path, RegisterOptions} from "react-hook-form";

export interface ControlInputProps<T extends FieldValues>  {
    name: Path<T>;
    label: string;
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
}