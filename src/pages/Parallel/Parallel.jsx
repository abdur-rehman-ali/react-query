import React, { useState } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../lib/react-query/queryKeys';
import { fetchSingleUser } from '../../lib/apis/apis';

const Parallel = () => {
  const [userIds, setUserIds] = useState([1, 2, 3]);

  const { data: user } = useQuery({
    queryKey: ['user', 1],
    queryFn: () => fetchSingleUser(1)
  })

  // userIds.map(id => {
  //   const userQuery = useQuery({
  //     queryKey: ['user', id],
  //     queryFn: () => fetchSingleUser(id)
  //   })
  // })

  const userQueries = useQueries({
    queries: userIds.map(id => {
      return {
        queryKey: [QUERY_KEYS.USER, id],
        queryFn: () => fetchSingleUser(id)
      }
    })
  })

  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={() =>
          setUserIds((prev) => {
            const nextId = prev[prev.length - 1] + 1;
            return [...prev, nextId];
          })
        }>
        Load more
      </button>

      {userIds.map((id) => (
        <h1 key={id}>{id}</h1>
      ))}
    </div>
  );
};

export default Parallel;
