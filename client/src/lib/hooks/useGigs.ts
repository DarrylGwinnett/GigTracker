import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useGigs = () => {
    const { data: gigs, isPending } = useQuery({
        queryKey: ["gigs"],
        queryFn: async () => {
            const response = await agent.get<Gig[]>(
                '/gigs'
            );
            return response.data;
        },
    });
    return {
        gigs,
        isPending
    }
}