export interface User {
    id: number;
    username: string;
    profile_image_url: string;
    profile_image_filename: string;
    email: string;
}

export interface Post {
    id: number;
    user_id: number;
    community_id: number;
    title: string;
    text?: string;
    post_image_url?: string;
    post_image_filename?: string;
    category?: Array<Category>;
}

export interface Category {
    id: number;
    category_name: string
}