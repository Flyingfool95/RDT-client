import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../../features/shared/utils/customFetch';
import { convertPixelDataToImage } from '../../features/shared/utils/helpers';

export const useAuthCheckQuery = () => {
  return useQuery({
    queryKey: ['auth-check'],
    queryFn: async () => {
      const result: any = await customFetch(`/api/v1/auth/auth-check`, 'GET', true);
      return {
        id: result.data.user.id,
        name: result.data.user.name,
        email: result.data.user.email,
        image: await convertPixelDataToImage(result.data.user.image),
      };
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // optional: cache user for 5 mins
  });
};
