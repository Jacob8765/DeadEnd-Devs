import { api } from "@/utils/api";
import { useState } from "react";
import { z } from "zod";

export const handleVoteSchema = z.object({
  postID: z.string().optional(),
  userID: z.string().optional(),
  typeOfVote: z.string(),
});

export const handleHasUpVotedSchema = z.object({
  postID: z.string(),
  userID: z.string().optional()
});

type handleVoteSchemaType = z.infer<typeof handleVoteSchema>;
type VoteProps = {
  postID: string;
  userID: string | undefined;
};

const Vote = ({ postID, userID }: VoteProps) => {
  const handleVote = api.handleVote.mutateVotes.useMutation();
  const hasUpVoted = api.handleVote.hasUpVoted.useQuery({ postID, userID });
  const [hasUpVotedNotRefreshed, setHaUpVotedNotRefreshed] = useState(false);
  

  const handleVoteInput = ({ typeOfVote }: handleVoteSchemaType) => {
    if (handleVote.isLoading) return
      
    if ((hasUpVoted.data || hasUpVotedNotRefreshed) && typeOfVote === "up") {
      // 
      return
    }
    handleVote.mutate({ typeOfVote, postID, userID })
    setHaUpVotedNotRefreshed(true)
  };
  return (
    <div>
      <button onClick={() => void handleVoteInput({ typeOfVote: "up" })}>
        upvote
      </button>
      <button onClick={() => void handleVoteInput({ typeOfVote: "down" })}>
        downvote
      </button>
    </div>
  );
};

export default Vote;
