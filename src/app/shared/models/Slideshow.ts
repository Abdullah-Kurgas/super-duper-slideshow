import { Slide } from "./Slide";

export class Slideshow {
    _id!: number;
    name!: string;
    url!: string;
    user_id!: number;
    slides!: Slide[];
    created_at!: string;
    isLoading!: boolean;
}