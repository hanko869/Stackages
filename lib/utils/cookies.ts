export function setCookie(name: string, value: string) {
  const secure = window.location.protocol === "https:" ? "Secure;" : "";

  document.cookie = `${name}=${value}; path=/; max-age=31536000; ${secure} SameSite=Lax`;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
}
