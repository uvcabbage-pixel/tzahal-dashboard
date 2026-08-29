export interface Car {
	carNumber: string;
	makat: string; //המק"ט של הכלי
	kshirot: 0 | 1;
	gdud: string; //גדוד
}

export interface AuthUser {
	pernr: string; //מספר אישי של המשתמש.
	gdud: string; //הגדוד אליו שייך המשתמש.
	isManager: boolean; // ממירים בשרת מ-0/1 לבוליאני
}

export interface MakatStat {
	makat: string;
	total: number;
	fit: number;
	percentage: number;
}
