import React from 'react';
import { usePost, usePostComments } from '../../lib/react-query/queries';

const Dependant = () => {
  const { data: post, isLoading } = usePost(4)
  const { data: comments } = usePostComments(post)

  return (
    <div className="p-12">
      <h1 className="text-lg font-bold">Post:</h1>
      {isLoading ? <p>Loading the post</p> : <h2>{post?.title}</h2>}
      <br />
      <h1 className="text-lg font-bold">Comments</h1>
      <ol>
        {comments?.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ol>
    </div>
  );
};

export default Dependant;
