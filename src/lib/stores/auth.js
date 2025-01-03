import { GetCookie, logout, SetCookie } from "$lib/stores/cokies";

export const RefreshToken = async (/** @type {string} */ refreshToken) => {
  const responsenya = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    }
  );

  if (responsenya.ok) {
    const data = await responsenya.json();
    const accessKey = data.data.access_token;
    const expired_at = data.data.expired_at;
    SetCookie("accesskey", accessKey, expired_at);
    // console.log('access key from generate acceskey UTH', data.data.access_token)
    // console.log('access key from generate acceskey UTH', expired_at)
  } else {
    logout();
  }
};
