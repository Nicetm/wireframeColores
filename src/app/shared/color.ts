export interface DataColors {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Array<DataColors>
}

export interface Color {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
} 