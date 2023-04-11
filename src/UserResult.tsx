import { useRecoilValue } from "recoil";
import { dietState } from "./atom";

const UserResult = () => {
  const diet = window.localStorage.getItem("diet");
  const havePcos = window.localStorage.getItem("havePcos");

  return (
    <div>
      <p className="text-center uppercase font-bold text-5xl mt-10">{Boolean(havePcos) ? `you have pcos` : `you don't have pcos`}</p>
      <div className="m-6"></div>
      <div className="mx-auto w-10/12 break-words">{diet}</div>
    </div>
  );
};

export default UserResult;
