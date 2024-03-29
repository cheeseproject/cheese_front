import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { SnapPost } from '../../../entities/SnapPost';
import { snapPostRepository } from '../../../repositories/snapPost/snapPostRepository';
import { SnapPostResponse } from '../../../repositories/snapPost/types';
import { LocationObjectCoords } from 'expo-location';

const QUERY_KEYS = {
    MY: () => 'mySnapPost',
    ONE: (snaPostId: string) => `snapPost/${snaPostId}`,
    LIKED: () => 'likedSnapPost',
    GEO_RANGE: (latitude: number, longitude: number) =>
        `snapPost/geoRange/${latitude}-${longitude}`,
};
export const useFetchMySnapPosts = (
    queryOptions?: UseQueryOptions<SnapPost[]>
) => {
    return useQuery<SnapPost[]>(
        [QUERY_KEYS.MY()],
        () => snapPostRepository.fetchMy().then((res) => res.map(converter)),
        {
            ...queryOptions,
        }
    );
};

export const useFetchSnapPost = (
    snapPostId: string,
    queryOptions?: UseQueryOptions<SnapPost>
) => {
    return useQuery<SnapPost>(
        [QUERY_KEYS.ONE(snapPostId)],
        () => snapPostRepository.fetch({ snapPostId }).then(converter),
        {
            ...queryOptions,
        }
    );
};

export const useFetchLikedSnapPosts = (
    queryOptions?: UseQueryOptions<SnapPost[]>
) => {
    return useQuery<SnapPost[]>(
        [QUERY_KEYS.LIKED()],
        () => snapPostRepository.fetchLiked().then((res) => res.map(converter)),
        {
            ...queryOptions,
        }
    );
};

export const useFetchSnapPostsByGeographyRange = (
    location: LocationObjectCoords | undefined,
    queryOptions?: UseQueryOptions<SnapPost[]>
) => {
    const queryFn = async () => {
        if (!location) {
            throw new Error('Please enable location information.');
        }
        const res = await snapPostRepository.fetchByGeographyRange({
            latitude: location.latitude,
            longitude: location.longitude,
        });
        return res.map(converter);
    };
    return useQuery<SnapPost[]>([QUERY_KEYS.LIKED()], queryFn, {
        ...queryOptions,
        enabled: !!location,
    });
};

const converter = (res: SnapPostResponse): SnapPost => {
    return {
        ...res,
        postedAt: new Date(res.postedAt),
        updatedAt: new Date(res.updatedAt),
    };
};
