import useSWR from 'swr';
import axios from 'axios';

interface Repository {
  id: string;
  text: string;
}

export function useRepository (repoId: string): { repository: Repository | null, isLoading: boolean, isError: Error } {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data.repository);
  const { data, error, isLoading } = useSWR(`/api/repo/${repoId}`, fetcher);
  const repo: Repository | null = data ? {id: data.id, text: data.text} : null;
  return {repository: repo, isLoading, isError: error}
}
