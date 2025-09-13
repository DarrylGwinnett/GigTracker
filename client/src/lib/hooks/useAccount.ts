import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import type { LoginSchema } from '../schemas/loginSchema';
import type { RegisterSchema } from '../schemas/registerSchema';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginUser = useMutation({
    mutationFn: async (values: LoginSchema) => {
      const response = await agent.post('/login?useCookies=true', values);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post('/account/logout');
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.removeQueries({ queryKey: ['gigs'] });
      navigate('/');
    },
  });

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>('/account/user-info', {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: !queryClient.getQueryData(['user']) && location.pathname !== '/login' && location.pathname !== '/register',
  });

  const registerUser = useMutation({
    mutationFn: async (values: RegisterSchema) => {
      await agent.post('/account/register', values);
    },
    onSuccess: () => {
      toast.success('Registration successful, you can now login.');
      navigate('/login');
    },
  });

  return { loginUser, currentUser, loadingUserInfo, logoutUser, registerUser };
};
