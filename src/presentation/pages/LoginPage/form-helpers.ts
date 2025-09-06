export const FIELD_NAMES: {
  USERNAME: "username";
  PASSWORD: "password";
} = {
  USERNAME: "username",
  PASSWORD: "password",
};

export type LoginFormValues = {
  [FIELD_NAMES.USERNAME]: string;
  [FIELD_NAMES.PASSWORD]: string;
};
