import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateUserProfile } from "../api/userApi";

export const useProfile = () => {
      const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["user"],
        queryFn: getProfile
    })

    const updateMutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
        }
    })
    return {
        profileData: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
        updateProfile: updateMutation.mutateAsync,
    }
}
