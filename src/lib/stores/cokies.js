import { goto } from "$app/navigation";
import { writable } from "svelte/store";
import { loadinge } from "./load";
import { currentOpenProfile, open_profile } from "$lib/stores/general";
import { resetUser, updateUser } from "./userLogin";

export let logout_ = writable(true);

export const SetCookie = (
  /** @type {string} */ name,
  /** @type {any} */ value,
  /** @type {number} */ mili_secon
) => {
  var expires = "";
  if (mili_secon) {
    var date = new Date();
    date.setTime(date.getTime() + mili_secon);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const DelCookie = (/** @type {string} */ name) => {
  var expires = "";

  var date = new Date();
  date.setTime(date.getTime());
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + ("asda" || "") + expires + "; path=/";
  console.log("dell cokie");
};

export const GetCookie = (/** @type {string} */ name) => {
  var nameEQ = name + "=";

  if (document && document.cookie) {
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

let message = "";

export const generateAccesToken = async (/** @type {any} */ act) => {
  const refresh_token = act;
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        refresh_token,
      }),
    }
  );

  const content = await response.json();
  const actNew = content.data.access_token;
  const expired_at = content.data.expired_at;
  console.log(content.data.access_token);

  SetCookie("accesskey", actNew, expired_at);
};

export const logout = async () => {
  // @ts-ignore
  logout_ = false;
  console.log("masuk logout" + logout_);
  resetUser();
  const refresh_token = GetCookie("refreshkey");
  if (refresh_token) {
    // const postLogout = await fetch(
    //   `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
    //   {
    //     method: "POST",
    //     headers: {
    //       accept: "*/*",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       refresh_token,
    //     }),
    //   }
    // );
    // clear profile
    await clear_cookie();
    // console.log("clear kuki lolos");

    // console.log("FETCH LOGOUT", postLogout)
  }
  // console.log("logout beres");
  currentOpenProfile(false);
  goto("/login");
  // loadinge(false);
};

const clear_cookie = async () => {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  // console.log("clear kuki");
};