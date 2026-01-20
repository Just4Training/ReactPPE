// my-nextjs-app/src/types/Blog.ts
export interface Blog {
    _id: string;
    title: string;
    content: string;
    contentType: 'markdown' | 'html' | 'richtext';
    author: {
        _id: string;
        username: string;
        email: string;
    };
    tags: string[];
    published: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    viewCount: number;
}

export interface BlogFormData {
    title: string;
    content: string;
    contentType: 'markdown' | 'html' | 'richtext';
    tags: string[];
    published: boolean;
    excerpt?: string;
    coverImage?: string;
}