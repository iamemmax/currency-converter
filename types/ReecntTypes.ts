export interface RecentTypes {
    base: string;
    date: Date | undefined | any;
    rates: { [key: string]: number };
    success: boolean;
    timestamp: number;
}