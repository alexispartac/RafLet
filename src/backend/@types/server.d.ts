import { ItemType } from "src/frontend/@types/item";

export interface IReq {
    headers: { 
        adminId?: string;
        accessToken?: string;
    }; 
    files: {
        image: {
            mv(uploadPath: string, arg1: (err: any) => any): unknown;
            name: string
        },
    };
    body: {
        item: ItemType
    }
    query: {
        itemId: string;
    };
}

export interface IRes {
    status: (arg0: number) => { 
        ();
        new(): unknown; 
        json: {(
            arg0: { 
                message?: string; 
                error?: unknoun; 
                items?: ItemType[] | unknown;
                item?: ItemType | unknown;
                data?: any
            }): unknown; 
            new(): unknown; 
        }; 
    }; 
}

export interface UReq {
    headers: { 
        adminId: string;
    }; 
    body: { 
        email: string;
        password: string;
    }
    query: {
        userId: string;
    };
}

export interface URes {
    status: (arg0: number) => { 
        ();
        new(): unknown; 
        json: {(
            arg0: { 
                message?: string; 
                error?: unknoun; 
                users?: unknown; 
                accessToken?: string;
                newUser?: unknown;
            }): unknown; 
            new(): unknown; 
        }; 
    }; 
}

