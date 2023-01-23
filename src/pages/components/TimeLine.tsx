import React from 'react'
import { api } from '../../utils/api'
import Post from './Post'

const TimeLine = () => {

  return (
    <div className="ml-auto flex w-5/6 flex-col bg-slate-600 text-center">
      <Post />
      <TimeLineFeed />
    </div>
  );
}

function TimeLineFeed() {
    const timeLinePost = api.user.getFeed.useQuery()
    return (
        <div>
            {timeLinePost.data?.map((post) => (
                <div key={post.id}>
                    <p className="text-white">{post.text}</p>
                    <p>Post made by {post.authorID}</p>
                </div>
            ))}
        </div>
    )
}

export default TimeLine