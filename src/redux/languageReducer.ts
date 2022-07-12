interface LanguageState {
  language: string;
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "Engilsh", code: "en" },
  ],
};

export default (state = defaultState, action) => {
  return state;
};
