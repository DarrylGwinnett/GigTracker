import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import type { LoginSchema } from '../schemas/loginSchema';

export const useAccount = () => {
const queryClient = useQueryClient();

  const loginUser = useMutation({
    mutationFn: async (values: LoginSchema) => {
      const response = await agent.post('/login?useCookies=true', values);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>('/account/user-info', {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return { loginUser, currentUser };
};
