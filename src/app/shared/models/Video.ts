export class Videos {
    items?: Video[];
}

export interface Video {
    id: string,
    snippet: {
        title: string,
        description: string,
        thumbnails: {
            default: Thumbnail
            medium: Thumbnail
            high: Thumbnail
            standard: Thumbnail
            maxres: Thumbnail
        },
    },
    contentDetails: {
        duration: string,
        dimension: string,
        definition: string,
        caption: boolean,
        licensedContent: boolean,
    },
    player: {
        embedHtml: string
    }
}

interface Thumbnail {
    url: string,
    width: number,
    height: number
}