import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

export function useGlobalTableData<T>(key: string, fetcher: () => Promise<T[]>) {
  const { data = [], isLoading, isError, refetch } = useQuery({ queryKey: [key], queryFn: fetcher })
  const [selected, setSelected] = useState<T[]>([])

  useEffect(() => {
    setSelected([])
  }, [data])

  return { data, isLoading, isError, refetch, selected, setSelected }
}
