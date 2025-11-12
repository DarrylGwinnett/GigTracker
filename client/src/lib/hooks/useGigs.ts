import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import agent from '../api/agent';
import { useLocation } from 'react-router';
import { useAccount } from './useAccount';

export const useGigs = (id?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { currentUser } = useAccount();

  const { data: gigsGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PagedList<Gig, string>>({
    queryKey: ['gigs'],
    queryFn: async ({ pageParam = null }) => {
      const response = await agent.get<PagedList<Gig, string>>('/gigs', {
        params: { cursor: pageParam },
      });
      return response.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastpage) => lastpage.nextCursor,
    enabled: !id && location.pathname === '/gigs' && !!currentUser,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((gig) => {
          const organiser = gig.attendees.find((x) => x.id === gig.organiserId);
          return {
            ...gig,
            isOrganiser: currentUser?.id === gig.organiserId,
            isGoing: gig.attendees.some((x) => x.id === currentUser?.id),
            hostImage: organiser?.imageUrl,
          };
        }),
      })),
    }),
  });

  const { data: gig, isLoading: isLoadingGig } = useQuery({
    queryKey: ['gigs', id],
    queryFn: async () => {
      const response = await agent.get<Gig>(`/gigs/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      const organiser = data.attendees.find((x) => x.id === data.organiserId);
      return {
        ...data,
        isOrganiser: currentUser?.id === data.organiserId,
        isGoing: data.attendees.some((x) => x.id === currentUser?.id),
        hostImage: organiser?.imageUrl,
      };
    },
  });

  const updateGig = useMutation({
    mutationFn: async (gig: Gig) => {
      await agent.put(`/gigs/${gig.id}`, gig);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['gigs'],
      });
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
    onMutate: async (gigId: string) => {
      await queryClient.cancelQueries({ queryKey: ['gigs', gigId] });
      const prevGig = queryClient.getQueryData<Gig>(['gigs', gigId]);
      queryClient.setQueryData<Gig>(['gigs', gigId], (oldGig) => {
        if (!oldGig || !currentUser) {
          return oldGig;
        }
        const isOrganiser = oldGig.organiserId === currentUser.id;
        const isAttending = oldGig.attendees.some(
          (x) => x.id == currentUser.id
        );
        return {
          ...oldGig,
          isCancelled: isOrganiser ? !oldGig.isCancelled : oldGig.isCancelled,
          attendees: isAttending
            ? isOrganiser
              ? oldGig.attendees
              : oldGig.attendees.filter((x) => x.id !== currentUser.id)
            : [
                ...oldGig.attendees,
                {
                  id: currentUser.id,
                  displayName: currentUser.displayName,
                  imageUrl: currentUser.imageUrl,
                },
              ],
        };
      });
      return { prevGig };
    },
    onError: (error, gigId, context) => {
      console.log(error);
      if (context?.prevGig) {
        queryClient.setQueryData(['gigs', gigId], context.prevGig);
      }
    },
  });

  return {
    gig,
    isLoadingGig,
    gigsGroup,
    isLoading,
    updateGig,
    createGig,
    deleteGig,
    updateAttendance,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  };
};
