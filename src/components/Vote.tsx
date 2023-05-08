import { api } from "@/utils/api";
import type { VoteType } from "../types/voteType";
import { useCallback, useState } from "react";

const VoteButton = ({
  type,
  myVote,
  handleVote,
}: {
  type: string;
  myVote: { typeOfVote: string } | null;
  handleVote: (typeOfVote: string) => void;
}) => (
  <button
    className={myVote?.typeOfVote === type ? "bg-zinc-700" : "text-black"}
    onClick={() => void handleVote(type)}
  >
    {type == "up" ? "^" : "v"}
  </button>
);

const Vote = ({ postID, voteCount, myVote }: VoteType) => {
  const mutateVote = api.handleVote.mutateVote.useMutation();

  // Check if the vote count data is available
  const [myVoteState, setMyVote] = useState(myVote);
  const [voteCountState, setVoteCount] = useState(voteCount);

  const handleVote = useCallback(
    async (typeOfVote: string) => {
      console.log(
        "type of vote: ",
        typeOfVote,
        "my vote: ",
        myVoteState,
        "vote count: ",
        voteCountState
      );
      if (myVoteState?.typeOfVote === "up") setVoteCount(voteCountState - 1);
      else if (typeOfVote === "up") setVoteCount(voteCountState + 1);

      if (myVoteState?.typeOfVote === typeOfVote) {
        setMyVote(null);
      } else if (!myVoteState) {
        setMyVote({ typeOfVote });
      } else {
        setMyVote((prev) => ({ ...prev, typeOfVote }));
      }

      //if (mutateVote.isLoading) return;
      try {
        await mutateVote.mutateAsync({
          postID,
          typeOfVote,
        });
      } catch (error) {
        // Show some UI error
        console.log(error);
      }
    },
    [myVoteState, mutateVote.isLoading, voteCountState]
  );

  return (
    <div>
      <VoteButton type="up" myVote={myVoteState} handleVote={handleVote} />
      <p>upvote: {voteCountState}</p>
      <br />
      <p>downvote</p>
      <br />
      <VoteButton type="down" myVote={myVoteState} handleVote={handleVote} />
    </div>
  );
};

export default Vote;
