import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUser, fetchUsers } from '../utils/api'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  })
}

export function useRefreshUsers() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      // Invalidate the users query to trigger a refetch
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
