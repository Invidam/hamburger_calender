import { LocalStroage } from "./LocalStorage";

export const isLoggedin = () => !LocalStroage.accessToken().isEmpty();
