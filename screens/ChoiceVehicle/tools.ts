const randomInt = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min));

const rangeAlphabet = [randomInt(0, 15), randomInt(16, 31)];

const createUUID = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

const randomStr = (length: number) => {
  let result = "";
  const dictionary = alphabet.join("");

  for (var i = 0; i < length; i++) {
    result += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }

  return result;
};

export interface IFakeVehicleData {
  dictionary: string[];
  fakeData: {
    title: string;
    data: {
      uuid: string;
      value: string;
    }[];
  }[];
}

export const generateFakeVehicleData = (): IFakeVehicleData => {
  const [from, to] = rangeAlphabet;
  const dictionary = alphabet.slice(from, to);
  const fakeData = dictionary.map((letter) => ({
    title: letter,
    data: Array.from({ length: randomInt(4, 12) }, (_, index) => ({
      uuid: createUUID(),
      value: letter + randomStr(index++),
    })),
  }));

  return {
    fakeData,
    dictionary,
  };
};

export const alphabet = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ж",
  "З",
  "И",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ы",
  "Ь",
  "Ъ",
  "Э",
  "Ю",
  "Я",
];
