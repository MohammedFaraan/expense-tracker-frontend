import {QueryClient} from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 5 * 60, // 5 min cache
            refetchOnWindowFocus: false
        }
    }
})