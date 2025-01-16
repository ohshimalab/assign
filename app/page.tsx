"use client";
import { Button } from "@nextui-org/button";
import { Checkbox, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { InputRowProps, UserInput, loadInputsFromStorage } from "@/utils/utils";

const InputRow: React.FC<InputRowProps> = ({
  userInput,
  onChange,
  onDelete,
  onToggle,
}) => {
  return (
    <div
      className={`w-full flex gap-4 items-center ${userInput.enabled ? "" : "opacity-60"}`}
    >
      <Checkbox
        isSelected={userInput.enabled}
        onChange={(e) => onToggle(e.target.checked)}
      />
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
  const onToggleInput = (id: string, enabled: boolean) => {
    setInputs((prevInputs) => {
      const newInputs = prevInputs.map((input) => {
        if (input.id === id) {
          return { ...input, enabled };
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
          enabled: true,
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
    if (
      inputs.filter((input) => input.name.trim().length > 0 && input.enabled)
        .length < 2
    ) {
      alert("２人以上選択してください");

      return;
    }
    router.push("/result");
  };

  const isAllEnabled = inputs.every((input) => input.enabled);

  const onSelectAll = () => {
    setInputs((prevInputs) => {
      const newInputs = prevInputs.map((input) => {
        return { ...input, enabled: true };
      });

      saveInputs(newInputs);

      return newInputs;
    });
  };

  const onDeselectAll = () => {
    setInputs((prevInputs) => {
      const newInputs = prevInputs.map((input) => {
        return { ...input, enabled: false };
      });

      saveInputs(newInputs);

      return newInputs;
    });
  };

  const onToggleAll = () => {
    if (isAllEnabled) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button fullWidth color="primary" size="lg" onPress={onSubmit}>
        シャッフル
      </Button>
      <Button
        fullWidth
        color="secondary"
        size="lg"
        variant="bordered"
        onPress={onToggleAll}
      >
        {isAllEnabled ? "全て選択解除" : "全て選択"}
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
          onToggle={(enabled) => onToggleInput(input.id, enabled)}
        />
      ))}
      <Button fullWidth color="success" size="lg" onPress={() => onAddInput()}>
        追加
      </Button>
    </section>
  );
}
