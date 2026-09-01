import { Card, CardContent, Typography } from "@mui/material";
import { KSHIRUT_THRESHOLDS } from "../../theme/theme";

type StatLabelProps =
    | { variant: "percentage"; title: string; value: number }
    | { variant: "count"; title: string; value: number; unit?: string }
    | { variant: "text"; title: string; value: string };

const percentageColor = (value: number): string => {
    if (value < KSHIRUT_THRESHOLDS.low) return "error.main";
    if (value < KSHIRUT_THRESHOLDS.medium) return "warning.main";
    return "success.main";
};

const resolve = (props: StatLabelProps): { display: string; color: string } => {
    switch (props.variant) {
        case "percentage":
            return {
                display: `${props.value}%`,
                color: percentageColor(props.value),
            };
        case "count":
            return {
                display: props.unit ? `${props.value} ${props.unit}` : String(props.value),
                color: "text.primary",
            };
        case "text":
            return { display: props.value, color: "text.primary" };
        default: {
            const exhaustive: never = props;
            return exhaustive;
        }
    }
};

export const StatLabel = (props: StatLabelProps) => {
    const { display, color } = resolve(props);

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: "1.25rem" }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {props.title}
                </Typography>
                <Typography variant="h4" sx={{ color, fontWeight: 700 }}>
                    {display}
                </Typography>
            </CardContent>
        </Card>
    );
};