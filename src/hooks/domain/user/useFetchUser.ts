import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '../../../entities/User';
import { userRepository } from '../../../repositories/user/userRepository';
import { UserResponse } from '../../../repositories/user/types';

const QUERY_KEYS = {
    MY: () => 'myUser',
    ONE: (userId: string) => `user/${userId}`,
};
export const useFetchMyUser = (queryOptions?: UseQueryOptions<User>) => {
    return useQuery<User>(
        [QUERY_KEYS.MY()],
        () => userRepository.fetchMy().then(converter),
        {
            ...queryOptions,
        }
    );
};

export const useFetchUser = (
    userId?: string,
    queryOptions?: UseQueryOptions<User>
) => {
    const queryFn = async () => {
        if (!userId) throw new Error('userId is required.');
        const res = await userRepository.fetch({ userId });
        return converter(res);
    };
    return useQuery<User>([QUERY_KEYS.ONE(userId ?? '')], queryFn, {
        ...queryOptions,
    });
};

const converter = (res: UserResponse) => {
    return {
        ...res,
        resistedAt: new Date(res.resistedAt),
        updatedAt: new Date(res.updatedAt),
    };
};
