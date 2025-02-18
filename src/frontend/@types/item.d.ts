
export interface ItemType {
    id: string;
    title: string;
    img: string[];
    price: number;
    favorite: boolean;
    cart?: boolean;
    gender: string;
    description?: string
}