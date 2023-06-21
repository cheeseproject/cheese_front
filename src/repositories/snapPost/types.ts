import { z } from 'zod';

export const SnapPostResponseScheme = z.object({
    snapPostId: z.string(),
    userId: z.string(),
    postImages: z.array(
        z.object({
            imagePath: z.string(),
            tag: z.string(),
        })
    ),
    title: z.string(),
    comment: z.string().optional(),
    longitude: z.number(),
    latitude: z.number(),
    postedAt: z.string(),
    updatedAt: z.string(),
    likedCount: z.number(),
    postedUser: z.object({
        userId: z.string(),
        name: z.string(),
        iconPath: z.string(),
    }),
});

export type SnapPostResponse = z.infer<typeof SnapPostResponseScheme>;

export const SnapPostResponseListScheme = z.array(SnapPostResponseScheme);

export type SnapPostResponseList = z.infer<typeof SnapPostResponseListScheme>;

const CreateSnapPostRequestScheme = z.object({
    title: z.string(),
    comment: z.string().optional(),
    longitude: z.number(),
    latitude: z.number(),
    postImages: z.array(
        z.object({
            imagePath: z.string(),
            tag: z.string(),
        })
    ),
});

export type CreateSnapPostRequest = z.infer<typeof CreateSnapPostRequestScheme>;

const DeleteSnapPostRequestScheme = z.object({
    snapPostId: z.string(),
});

export type DeleteSnapPostRequest = z.infer<typeof DeleteSnapPostRequestScheme>;

const LikeSnapPostRequestScheme = z.object({
    snapPostIds: z.array(z.string()),
});

export type LikeSnapPostRequest = z.infer<typeof LikeSnapPostRequestScheme>;

const UpdateSnapPostRequestScheme = z.object({
    snapPostId: z.string(),
    title: z.string(),
    comment: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    postImages: z.array(
        z.object({
            imagePath: z.string(),
            tag: z.string(),
        })
    ),
});

export type UpdateSnapPostRequest = z.infer<typeof UpdateSnapPostRequestScheme>;

const FetchSnapPostRequestScheme = z.object({
    snapPostId: z.string(),
});

export type FetchSnapPostRequest = z.infer<typeof FetchSnapPostRequestScheme>;

const FetchSnapPostsByGeographyRangeRequestScheme = z.object({
    latitude: z.number(),
    longitude: z.number(),
});

export type FetchSnapPostsByGeographyRangeRequest = z.infer<
    typeof FetchSnapPostsByGeographyRangeRequestScheme
>;
