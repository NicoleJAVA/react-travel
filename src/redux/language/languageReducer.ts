import i18n from "i18next";
import {
  ADD_LANGUAGE,
  CHANGE_LANGUAGE,
  languageActionTypes,
} from "./languageActions";

export interface LanguageState {
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

export default (state = defaultState, action: languageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload);

      return { ...state, language: action.payload };
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
};
