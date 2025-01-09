"use client";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

import { UserInput, assign, loadInputsFromStorage } from "@/utils/utils";

type ResultRowProps = {
  first_user: UserInput;
  second_user: UserInput;
};

type UserPair = {
  first_user: UserInput;
  second_user: UserInput;
};

const ResultRow: React.FC<ResultRowProps> = ({ first_user, second_user }) => {
  return (
    <div className="w-full flex gap-4 items-center">
      <div className="flex-1 flex justify-center border p-2 rounded-lg">
        <p>{first_user.name}</p>
      </div>
      <p>{"->"}</p>
      <div className="flex-1 flex justify-center border p-2 rounded-lg">
        <p>{second_user.name}</p>
      </div>
    </div>
  );
};

const makePairsText = (pairs: UserPair[]) => {
  return pairs
    .map((pair) => `${pair.first_user.name} -> ${pair.second_user.name}`)
    .join("\n");
};

export default function ResultPage() {
  const [userPairs, setUserPairs] = useState<UserPair[]>([]);

  useEffect(() => {
    const inputs = loadInputsFromStorage().filter(
      (input) => input.name.trim().length > 0
    );

    const pairs = assign(inputs);

    setUserPairs(pairs);
  }, []);

  const shuffle = () => {
    const inputs = loadInputsFromStorage().filter(
      (input) => input.name.trim().length > 0
    );

    const pairs = assign(inputs);

    setUserPairs(pairs);
  };

  const onCopy = () => {
    const pairsText = makePairsText(userPairs);

    navigator.clipboard.writeText(pairsText);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <h1 className="" style={{ fontSize: "5rem" }}>
        結果
      </h1>
      <Button fullWidth color="primary" size="lg" onPress={() => shuffle()}>
        シャッフル
      </Button>
      <Button fullWidth color="success" onPress={() => onCopy()}>
        クリップボードにコピー
      </Button>
      <div className="w-full flex flex-col gap-5">
        {userPairs.map((pair, index) => (
          <ResultRow
            key={index}
            first_user={pair.first_user}
            second_user={pair.second_user}
          />
        ))}
      </div>
    </div>
  );
}
