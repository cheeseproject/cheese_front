import { useMutation } from '@tanstack/react-query';
import { snapPostRepository } from '../../../repositories/snapPost/snapPostRepository';

export const useDeleteSnapPost = () => {
    return {
        ...useMutation((snapPostId: string) => {
            return snapPostRepository.delete({ snapPostId });
        }),
    };
};
