import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { useLocation } from 'react-router';
import { useAccount } from './useAccount';

export const useGigs = (id?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { currentUser } = useAccount();

  const { data: gigs, isLoading } = useQuery({
    queryKey: ['gigs'],
    queryFn: async () => {
      const response = await agent.get<Gig[]>('/gigs');
      return response.data;
    },
    enabled: !id && location.pathname === '/gigs' && !!currentUser,
    select: (data) => {
      return data.map((gig) => {
        return {
          ...gig,
          isOrganiser: currentUser?.id === gig.organiserId,
          isGoing: gig.attendees.some((x) => x.id === currentUser?.id),
        };
      });
    },
  });

  const { data: gig, isLoading: isLoadingGig } = useQuery({
    queryKey: ['gigs', id],
    queryFn: async () => {
      const response = await agent.get<Gig>(`/gigs/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      return {
        ...data,
        isOrganiser: currentUser?.id === data.organiserId,
        isGoing: data.attendees.some((x) => x.id === currentUser?.id),
      };
    },
  });

  const updateGig = useMutation({
    mutationFn: async (gig: Gig) => {
      await agent.put(`/gigs/${gig.id}`, gig);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });

  const createGig = useMutation({
    mutationFn: async (gig: Gig) => {
      const response = await agent.post('/gigs', gig);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });

  const deleteGig = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/gigs/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/gigs/${id}/attend`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['gigs', id],
      });
    },
  });

  return {
    gig,
    isLoadingGig,
    gigs,
    isLoading,
    updateGig,
    createGig,
    deleteGig,
    updateAttendance,
  };
};
