import useSWR from 'swr';
import axios from 'axios';

interface Audit {
    id: string;
    text: string;
  }

export function useAudit (repoId: string, auditId: string): { audit: Audit | null, isLoading: boolean, isError: any } {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error, isLoading } = useSWR(`/api/repo/${repoId}/audit/${auditId}`, fetcher);

    const audit: Audit | null = data ? {id: data.id, text: data.text} : null;
    return {audit: audit, isLoading, isError: error}
}