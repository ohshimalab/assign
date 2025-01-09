"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { InputRowProps, UserInput, loadInputsFromStorage } from "@/utils/utils";

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
  const router = useRouter();

  useEffect(() => {
    loadInputs();
  }, []);

  const saveInputs = (inputs: UserInput[]) => {
    localStorage.setItem("userInputs", JSON.stringify(inputs));
  };
  const loadInputs = () => {
    const inputs = loadInputsFromStorage();

    setInputs(inputs);
  };
  const onInputChange = (id: string, value: string) => {
    setInputs((prevInputs) => {
      const newInputs = prevInputs.map((input) => {
        if (input.id === id) {
          return { ...input, name: value };
        } else {
          return input;
        }
      });

      saveInputs(newInputs);

      return newInputs;
    });
  };
  const onAddInput = () => {
    setInputs((prevInputs) => {
      const newInputs = [
        ...prevInputs,
        {
          id: uuidv4(),
          name: "",
        },
      ];

      saveInputs(newInputs);

      return newInputs;
    });
  };
  const onDeleteInput = (id: string) => {
    setInputs((prevInputs) => {
      const newInputs = prevInputs.filter((input) => input.id !== id);

      saveInputs(newInputs);

      return newInputs;
    });
  };

  const onSubmit = () => {
    if (inputs.filter((input) => input.name.trim().length > 0).length < 2) {
      alert("2つ以上の名前を入力してください");

      return;
    }
    router.push("/result");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button fullWidth color="primary" size="lg" onPress={onSubmit}>
        シャッフル
      </Button>
      {/* <Button fullWidth color="secondary" size="lg" variant="bordered">
        共有
      </Button> */}
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
