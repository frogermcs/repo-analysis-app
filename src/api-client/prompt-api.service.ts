import useSWR from 'swr';
import axios from 'axios';

interface Prompt {
    id: string;
    filename: string;
    text: string;
  }

export function useAllPrompts (): { prompts: Prompt[] | null, isLoading: boolean, isError: Error } {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data.prompts);
    const { data, error, isLoading } = useSWR(`/api/prompt/all`, fetcher);
    return {prompts: data, isLoading, isError: error}
}
