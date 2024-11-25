'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import useSWR from 'swr';
import axios from 'axios';
import Markdown from 'react-markdown'

export default function Repo() {
  const [text, setText] = useState('');
  const params = useParams<{ repoId: string }>();
  const repoId = params?.repoId;
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(repoId ? `/api/repo/${repoId}` : null, fetcher);

  useEffect(() => {
    if (data) {
      setText(data.text);
    } else if (error) {
      setText('Error fetching repository: ' + error.message);
    } 
  }, [data, error]);

  return <div><Markdown>{text}</Markdown></div>
}
