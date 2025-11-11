import { type FieldErrors, type FieldError } from "react-hook-form";

export const extractErrorMessages = <T extends Record<string, any>>(
    errors: FieldErrors<T>
): string[] => {
    return Object.values(errors)
        .map((error) => {
            if (error && typeof error === "object" && "message" in error) {
                return (error as FieldError).message as string;
            }
            return null;
        })
        .filter((msg): msg is string => Boolean(msg));
};
