'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import useSWR from 'swr';
import axios from 'axios';
import Markdown from 'react-markdown'

export default function Repo() {
  const [text, setText] = useState('');
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(id ? `/api/repo/${id}` : null, fetcher);

  useEffect(() => {
    if (data) {
      setText(data.text);
    } else if (error) {
      setText('Error fetching repository: ' + error.message);
    } 
  }, [data, error]);

  return <div><Markdown>{text}</Markdown></div>
}
