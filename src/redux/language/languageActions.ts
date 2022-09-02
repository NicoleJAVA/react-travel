export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}

interface AddeLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string; code: string };
}

export type languageActionTypes = ChangeLanguageAction | AddeLanguageAction;

export const changeLanguageActionCreator = (
  languageCode: "zh" | "en"
): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
};

export const addLanguageActionCreator = (
  name: string,
  code: string
): AddeLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
};
