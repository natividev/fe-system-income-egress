"use client";
export const SetLocalStorage = (token: string) => {
  try {
    console.log("guardando setLocalStorage....", token);
    localStorage.setItem("accessToken", token);
  } catch (error) {
    console.log({ setLocalStorage: error });
  }
};

export const GetLocalStorage = () => {
  console.log(
    ":::::::::::::::::::::::::::::::::: getLocalStorage ::::::::::::::::::::::::::::::::::",
    localStorage.getItem("accessToken")
  );

  return localStorage.getItem("accessToken");
};
