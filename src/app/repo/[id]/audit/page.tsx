'use client'

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Markdown from 'react-markdown'

export default function RepoAnalysis() {
    const [text, setText] = useState('');

    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error } = useSWR(`/api/example-analysis`, fetcher);

    useEffect(() => {
        if (data) {
          setText(data.text);
        } else if (error) {
          setText('Error fetching analysis: ' + error.message);
        }
      }, [data, error]);

    return <div><Markdown>{text}</Markdown></div>
}