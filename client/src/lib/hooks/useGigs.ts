import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useGigs = (id?: string) => {
    const queryClient = useQueryClient()

    const { data: gigs, isPending } = useQuery({
        queryKey: ["gigs"],
        queryFn: async () => {
            const response = await agent.get<Gig[]>(
                '/gigs'
            );
            return response.data;
        },
    });

    const { data: gig, isLoading: isLoadingGig } = useQuery({
        queryKey: ["gigs", id],
        queryFn: async () => {
            const response = await agent.get<Gig>(
                `/gigs/${id}`
            );
            return response.data;
        },
        enabled: !!id
    });



    const updateGig = useMutation({
        mutationFn: async (gig: Gig) => {
            await agent.put('/gigs', gig)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['gigs'] })
        }
    })


    const createGig = useMutation({
        mutationFn: async (gig: Gig) => {
            await agent.post('/gigs', gig)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['gigs'] })
        }
    })


    const deleteGig = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/gigs/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['gigs'] })
        }
    })

    return {
        gig,
        isLoadingGig,
        gigs,
        isPending,
        updateGig,
        createGig,
        deleteGig
    }
}
