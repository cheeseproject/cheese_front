import { httpsCallable } from 'firebase/functions';
import {
    CreateSnapPostRequest,
    DeleteSnapPostRequest,
    FetchSnapPostRequest,
    FetchSnapPostsByGeographyRangeRequest,
    LikeSnapPostRequest,
    SnapPostResponse,
    SnapPostResponseListScheme,
    SnapPostResponseScheme,
    UpdateSnapPostRequest,
} from './types';
import { functions } from '../../plugins/firebase';
import { removeNulls } from '../../libs/nullToUndefined';

export const snapPostRepository = {
    create: async (params: CreateSnapPostRequest) => {
        await httpsCallable(functions, 'createSnapPost')(params);
    },

    update: async (params: UpdateSnapPostRequest) => {
        console.log(params);
        await httpsCallable(functions, 'updateSnapPost')(params);
    },

    delete: async (params: DeleteSnapPostRequest) => {
        await httpsCallable(functions, 'deleteSnapPost')(params);
    },

    like: async (params: LikeSnapPostRequest) => {
        await httpsCallable(functions, 'likeSnapPost')(params);
    },

    fetch: async (params: FetchSnapPostRequest): Promise<SnapPostResponse> => {
        const res = await httpsCallable(functions, 'fetchSnapPost')(params);
        return SnapPostResponseScheme.parse(removeNulls(res.data));
    },

    fetchMy: async (): Promise<SnapPostResponse[]> => {
        const res = await httpsCallable(functions, 'fetchMySnapPosts')();
        return SnapPostResponseListScheme.parse(removeNulls(res.data));
    },

    fetchLiked: async (): Promise<SnapPostResponse[]> => {
        const res = await httpsCallable(functions, 'fetchLikedSnapPosts')();
        return SnapPostResponseListScheme.parse(removeNulls(res.data));
    },

    fetchByGeographyRange: async (
        params: FetchSnapPostsByGeographyRangeRequest
    ) => {
        const res = await httpsCallable(
            functions,
            'fetchSnapPostsByGeographyRange'
        )(params);
        return SnapPostResponseListScheme.parse(removeNulls(res.data));
    },
};
