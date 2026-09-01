import type { Car, MakatStat } from "../types/domain.types";

export interface KshirutSummary {
    total: number;
    fit: number;
    unfit: number;
    percentage: number;
    byMakat: MakatStat[];
}

const toPercentage = (fit: number, total: number): number =>
    total === 0 ? 0 : Math.round((fit / total) * 100);

export const calculateKshirut = (cars: Car[]): KshirutSummary => {
    const groups = new Map<string, { total: number; fit: number }>();

    for (const car of cars) {
        const current = groups.get(car.makat) ?? { total: 0, fit: 0 };
        current.total += 1;
        if (car.kshirot === 1) current.fit += 1;
        groups.set(car.makat, current);
    }

    const byMakat: MakatStat[] = Array.from(groups.entries())
        .map(([makat, { total, fit }]) => ({
            makat,
            total,
            fit,
            percentage: toPercentage(fit, total),
        }))
        .sort((a, b) => b.percentage - a.percentage);

    const fit = cars.filter((car) => car.kshirot === 1).length;

    return {
        total: cars.length,
        fit,
        unfit: cars.length - fit,
        percentage: toPercentage(fit, cars.length),
        byMakat,
    };
};