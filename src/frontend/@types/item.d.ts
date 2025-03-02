
export interface ItemType {
    id: string;
    title: string;
    img: string[];
    price: number;
    favorite: boolean;
    cart: boolean;
    gender: string;
    description: string
}

export interface ItemTypeOrder {
    id: string;
    img: string;
    name: string;
    price: number;
    quantity: number;
}