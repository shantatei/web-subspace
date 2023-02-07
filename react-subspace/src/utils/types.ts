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
    user: Array<User>;
    created_at: string;
}

export interface Category {
    id: number;
    category_name: string
}

export interface Community {
    id: number;
    name: string;
    about: string;
    community_image_url?: string;
    community_image_filename?: string;
    community_banner_url?: string;
    community_banner_filename?: string;
    created_at: string;
}

export interface Comment {
    id: number;
    user_id: number;
    post_id: number;
    text: string;
    created_at: string;
    updated_at: string;
    user: Array<User>;
}

export interface Role {
    id: number;
    role_name: string;
    pivot: {
        com_users_id: number;
        com_roles_id: number;
    }
}

export interface CommunityUser {
    id: number;
    user_id: number;
    community_id: number;
    user: Array<User>;
    roles: Array<Role>;
    community: Community;
}