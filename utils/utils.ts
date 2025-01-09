export interface UserInput {
  id: string;
  name: string;
}

export type InputRowProps = {
  userInput: UserInput;
  onChange: (value: string) => void;
  onDelete: () => void;
};

export const loadInputsFromStorage = (): UserInput[] => {
  const data = localStorage.getItem("userInputs");

  if (data) {
    return JSON.parse(data);
  }

  return [];
};

export const assign = (inputs: UserInput[]) => {
  if (inputs.filter((input) => input.name.trim().length > 0).length < 2) {
    return [];
  }
  const shuffled = inputs.sort(() => Math.random() - 0.5);
  const result = [];

  for (let i = 0; i < shuffled.length - 1; i += 1) {
    result.push({
      first_user: shuffled[i],
      second_user: shuffled[i + 1],
    });
  }
  result.push({
    first_user: shuffled[shuffled.length - 1],
    second_user: shuffled[0],
  });

  return result;
};
