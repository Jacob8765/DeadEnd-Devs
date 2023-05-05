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
  userID: z.string().optional(),
});

type handleVoteSchemaType = z.infer<typeof handleVoteSchema>;
type VoteProps = {
  postID: string;
  userID: string | undefined;
};

const Vote = ({ postID, userID }: VoteProps) => {
  const handleVote = api.handleVote.mutateVotes.useMutation();
  const hasUpVoted = api.handleVote.hasUpVoted.useQuery({ postID, userID });
  const hasDownVoted = api.handleVote.hasUpVoted.useQuery({ postID, userID });
  const [hasUpVotedNotRefreshed, setHaUpVotedNotRefreshed] = useState(false);
  const [hasDownVotedNotRefreshed, setHaDownVotedNotRefreshed] =
    useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  // const userUpVoted = hasUpVoted.data || hasUpVotedNotRefreshed

  const handleVoteInput = ({ typeOfVote }: handleVoteSchemaType) => {
    if (handleVote.isLoading) return;

    if (hasVoted) {
      // when user double clicks on upvote (remove or negate the vote)
      if (hasUpVoted.data || hasUpVotedNotRefreshed) {
        //
        if (typeOfVote === "up") {
          // removeVote.mutate({ postID, userID });
        }

        if (typeOfVote === "down") {
          // negateVote.mutate({ postID, userID });
        }
        return;
      }

      // when user double clicks on downvote (remove or negate the vote)
      if (
        hasDownVoted.data ||
        (hasDownVotedNotRefreshed && typeOfVote === "down")
      ) {
        //
        console.log("hasDownVoted");

        return;
      }
    }

    handleVote.mutate({ typeOfVote, postID, userID });

    if (typeOfVote === "up") {
      setHaUpVotedNotRefreshed(true);
    } else {
      setHaDownVotedNotRefreshed(true);
    }

    setHasVoted(true);
  };
  return (
    <div>
      <button onClick={() => void handleVoteInput({ typeOfVote: "up" })}>
        ^
      </button>
      <p></p>
      <button onClick={() => void handleVoteInput({ typeOfVote: "down" })}>
        v
      </button>
    </div>
  );
};

export default Vote;
