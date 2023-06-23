export type SnapPost = {
    snapPostId: string;
    userId: string;
    postImages: Array<{
        imagePath: string;
    }>;
    tags: Array<string>;
    title: string;
    comment?: string;
    longitude: number;
    latitude: number;
    postedAt: Date;
    updatedAt: Date;
    likedCount: number;
    postedUser: {
        userId: string;
        name: string;
        iconPath: string;
    };
};
