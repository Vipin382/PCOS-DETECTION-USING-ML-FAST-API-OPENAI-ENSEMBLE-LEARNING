import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

interface DietAtomWrapper {
  havePcos: boolean;
  dietPlan: String;
}

const data: DietAtomWrapper = {
  havePcos: false,
  dietPlan: "",
};
export const dietState = atom({
  key: "dietData", // unique ID (with respect to other atoms/selectors)
  default: data, // default value (aka initial value)
});
