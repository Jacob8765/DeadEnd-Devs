import { api } from "@/utils/api";
import type { VoteType } from "../types/voteType";
import { useRef } from "react";

const Vote = ({ postID, voteCount, myVote }: VoteType) => {
  const mutateVote = api.handleVote.mutateVote.useMutation();
  //const { data: voteCountData } = api.handleVote.voteCount.useQuery({ postID });

  // Check if the vote count data is available
  const { upvotes = 0, downvotes = 0 } = voteCount;
  const myVoteDynamic = useRef(myVote);
  console.log(myVote);

  const handleVote = async (typeOfVote: string) => {
    if (mutateVote.isLoading) return;
    try {
      if (myVoteDynamic.current?.typeOfVote === typeOfVote) {
        myVoteDynamic.current = null;
      } else if (!myVoteDynamic.current) {
        myVoteDynamic.current = { typeOfVote };
      } else {
        myVoteDynamic.current.typeOfVote = typeOfVote;
      }
      console.log("my vote", myVote);

      await mutateVote.mutateAsync({
        postID,
        typeOfVote,
      });
    } catch (error) {
      // Show some UI error
      console.log(error);
    }
  };

  // Check if the vote count data is available
  // if (voteCountData === undefined) {
  //   return <p>Loading vote counts...</p>;
  // }

  return (
    <div>
      <button
        className={
          myVoteDynamic.current?.typeOfVote === "up"
            ? "bg-zinc-700"
            : "text-black"
        }
        onClick={() => void handleVote("up")}
      >
        ^
      </button>
      <p>upvote: {Number(upvotes)}</p>
      <br />
      <p>downvote: {Number(downvotes)}</p>
      <br />
      <button
        className={
          myVoteDynamic.current?.typeOfVote === "down"
            ? "bg-zinc-700"
            : "text-black"
        }
        onClick={() => void handleVote("down")}
      >
        v
      </button>
    </div>
  );
};

export default Vote;
