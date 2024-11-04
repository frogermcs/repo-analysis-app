import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

export default function Repo() {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('');

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(id ? `/api/repo/${id}` : null, fetcher);

  useEffect(() => {
    if (data) {
      setText(data.text);
    } else if (error) {
      setText('Error fetching repository: ' + error.message);
    }
  }, [data, error]);

  return (
      <div>
      <h1>{text}</h1>
      </div>
  );
}
