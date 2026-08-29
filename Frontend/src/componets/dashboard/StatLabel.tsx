import { Card, Typography } from "@mui/material";
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

export const StatLabel = (props: StatLabelProps) => {
    // TODO: switch על props.variant — TypeScript יצמצם את הטיפוס בכל ענף,
    //       כך ש-props.unit קיים רק ב-"count" ו-props.value הוא string רק ב-"text"

    return (
        <Card sx={{ p: "1.25rem" }}>
            <Typography variant="body2" color="text.secondary">{props.title}</Typography>
            <Typography variant="h4" sx={{ color, fontWeight: 700 }}>{display}</Typography>
        </Card>
    );
};