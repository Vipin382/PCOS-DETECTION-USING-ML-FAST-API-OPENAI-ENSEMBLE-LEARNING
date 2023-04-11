import React, { createContext, useContext, useState } from "react";
import { useRecoilValue } from "recoil";
import { dietState } from "../atom";

interface DietWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = (props: DietWrapperProps) => {
  const value = useRecoilValue(dietState);
  const diet = window.localStorage.getItem("diet");
  const havePcos = window.localStorage.getItem("havePcos");
  if (diet) {
    return <div>{props.children}</div>;
  } else {
    return <div>Fill form again</div>;
  }
};

export default AuthWrapper;
