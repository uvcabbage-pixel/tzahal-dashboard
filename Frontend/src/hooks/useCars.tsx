import { useState, useEffect, useMemo, useCallback } from "react";
import { api } from "../api/axiosInstance";
import { calculateKshirut, type KshirutSummary } from "../utils/kshirutStats";
import type { Car } from "../types/domain.types";

interface UseCarsResult {
    cars: Car[];
    summary: KshirutSummary;
    isLoading: boolean;
    error: string;
    refetch: () => Promise<void>;
}


export const useCars = (): UseCarsResult => {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchCars = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError("");
        try {
            const { data } =  await api.get<Car[]>("/cars");
            console.log("response:", data); //להוריד
            setCars(data);
        } catch {
            setError("שגיאה בטעינת נתוני המכוניות");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchCars();
    }, [fetchCars]);

    const summary = useMemo(() => calculateKshirut(cars), [cars]);

    return { cars, summary, isLoading, error, refetch: fetchCars };
};


/*const MOCK_CARS: Car[] = [
    { carNumber: "1234567", makat: "M-100", kshirot: 1, gdud: "גדוד 100" },
    { carNumber: "1234568", makat: "M-100", kshirot: 0, gdud: "גדוד 100" },
    { carNumber: "1234569", makat: "M-200", kshirot: 1, gdud: "גדוד 100" },
    { carNumber: "1234570", makat: "M-200", kshirot: 1, gdud: "גדוד 100" },
    { carNumber: "1234571", makat: "M-300", kshirot: 0, gdud: "גדוד 200" },
];
setCars(MOCK_CARS);
*/