// KshirutBarChart.tsx
interface KshirutBarChartProps {
    stats: MakatStat[];
}
// TODO: Chart.js -> Bar. data.labels = מק"טים, dataset אחד עם percentage.
//       backgroundColor כפונקציה שמחזירה צבע לפי הסף של כל עמודה.
//       options.scales.y = { min: 0, max: 100 }