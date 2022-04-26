import { Slide } from "./Slide";

export class Slideshow {
    id?: number;
    name?: string;
    url?: string;
    user_id?: number;
    slides?: Slide[];
    created_date?: string;
    isLoading?: boolean;
}