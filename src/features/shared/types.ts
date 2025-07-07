export type User = {
    id: string;
    email: string;
    name: string;
    image: string;
};

export type RDTResponse = {
    success: boolean;
    data: any;
    message: string;
    errors: string[];
};
