// @ts-nocheck
import { goto } from "$app/navigation";
import { RefreshToken } from "$lib/stores/auth";
import { GetCookie, logout } from "$lib/stores/cokies";
import { user, updateUser, resetUser } from "$lib/stores/userLogin";
import toast from "svelte-french-toast";

export const Falidate = async () => {
  console.log("masuk falidate");
  let accessKey = GetCookie("accesskey");
  let refreshKey = GetCookie("refreshkey");

  if (refreshKey) {
    // console.log("revresh key ada");
    if (!accessKey) {
      // console.log("access key  tdkada");
      await RefreshToken(refreshKey);
      // await Falidate();
    } else {
      let accessKey = GetCookie("accesskey");
      //   console.log("asccess key ada");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/get_profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessKey,
          },
          credentials: "include",
        }
      );

      const content = await response.json();
      // console.log(content);
      // console.log(content.data);

      updateUser(content.data);

      // console.log(content.data);
      if (content.data.access == 0) {
        toast.error(
          "menunnggu persetujuan akses dari HRGA , mohon hubungi nomor Hrga unntuk meminta akses"
        );
        await logout();
        return false;
      } else {
        return true;
      }
    }
  } else {
    console.log("revers key gaaa ada di validate");
    await logout();
    // resetUser();
    // goto("/login");
    return false;
  }
};
