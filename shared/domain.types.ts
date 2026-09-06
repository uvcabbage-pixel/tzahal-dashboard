export interface Car {
	carNumber: string;
	makat: string; 
	kshirot: boolean;
	gdud: string; 
}

export interface AuthUser {
	pernr: string; 
	gdud: string; 
	isManager: boolean; 
}

export interface MakatStat {
	makat: string;
	total: number;
	fit: number;
	percentage: number;
}
