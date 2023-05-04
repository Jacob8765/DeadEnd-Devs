import { api } from "@/utils/api";
import { z } from "zod";

export const handleVoteSchema = z.object({
  postId: z.string().optional(),
  typeofVote: z.string(),
});

type handleVoteSchemaType = z.infer<typeof handleVoteSchema>;
type VoteProps = {
  postId: string;
};

const Vote = ({ postId }: VoteProps) => {
  const handleVote = api.handleVote.mutateVotes.useMutation();

  const handleVoteInput = ({ typeofVote }: handleVoteSchemaType) => {
    handleVote.mutate({ typeofVote, postId });
  };
  return (
    <div>
      <button onClick={() => handleVoteInput({ typeofVote: "up" })}>
        upvote
      </button>
      <button onClick={() => handleVoteInput({ typeofVote: "down" })}>
        downvote
      </button>
    </div>
  );
};

export default Vote;
