export const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

export const isNonEmptyString = (value: unknown, maxLength = 100): value is string =>
    typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;

export const isDigitsOnly = (value: unknown): value is string =>
    typeof value === "string" && /^\d+$/.test(value.trim());

export const isBinary = (value: unknown): value is 0 | 1 =>
    value === 0 || value === 1;