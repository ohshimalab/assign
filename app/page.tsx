"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export interface UserInput {
  id: string;
  name: string;
}

type InputRowProps = {
  userInput: UserInput;
  onChange: (value: string) => void;
  onDelete: () => void;
};

const InputRow: React.FC<InputRowProps> = ({
  userInput,
  onChange,
  onDelete,
}) => {
  return (
    <div className="w-full flex gap-4 items-center">
      <Input
        placeholder="名前を入力"
        size="lg"
        value={userInput.name}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button color="danger" size="lg" onPress={() => onDelete()}>
        削除
      </Button>
    </div>
  );
};

export default function Home() {
  const [inputs, setInputs] = useState<UserInput[]>([]);

  const onInputChange = (id: string, value: string) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
          return { ...input, name: value };
        } else {
          return input;
        }
      });
    });
  };
  const onAddInput = () => {
    setInputs((prevInputs) => {
      return [
        ...prevInputs,
        {
          id: uuidv4(),
          name: "",
        },
      ];
    });
  };
  const onDeleteInput = (id: string) => {
    return setInputs((prevInputs) => {
      return prevInputs.filter((input) => input.id !== id);
    });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button fullWidth color="primary" size="lg">
        実行
      </Button>
      <Button fullWidth color="secondary" size="lg" variant="bordered">
        共有
      </Button>
      {inputs.map((input) => (
        <InputRow
          key={input.id}
          userInput={input}
          onChange={(value) => onInputChange(input.id, value)}
          onDelete={() => onDeleteInput(input.id)}
        />
      ))}
      <Button fullWidth color="success" size="lg" onPress={() => onAddInput()}>
        追加
      </Button>
    </section>
  );
}
