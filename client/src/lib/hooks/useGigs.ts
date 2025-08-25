import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useGigs = () => {

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


    const updateGig = useMutation({
        mutationFn: async (gig: Gig) => {
            await agent.put('/gigs', gig)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['gigs']})
        }
    })

    
    const createGig = useMutation({
        mutationFn: async (gig: Gig) => {
            await agent.post('/gigs', gig)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['gigs']})
        }
    })

        
    const deleteGig = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/gigs/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['gigs']})
        }
    })

    return {
        gigs,
        isPending,
        updateGig,
        createGig,
        deleteGig
    }
}
