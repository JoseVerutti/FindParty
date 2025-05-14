import { UUID } from "crypto";
import { Party } from "./party";

export interface User {

    id?: UUID;
    name: string;
    email: string;
    password: string;
    image?: string;
    partys?: Party[];
}

