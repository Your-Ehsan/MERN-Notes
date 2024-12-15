import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAvatarFallback(name) {
  // Split the name into an array of words
  const nameParts = name.split(" ");

  // Get the first letter of the first part (first name)
  let initials = nameParts[0].charAt(0).toUpperCase();

  // If there's a second part (last name), get the first letter of the last name
  if (nameParts.length > 1) {
    initials += nameParts[1].charAt(0).toUpperCase();
  }

  return initials;
}

export const saveAuthToken = (token) => {
  // Create a cookie with a name of 'authToken' and the token value
  // Set it to expire in 2 days (you can modify the expiration duration)
  const expires = new Date();
  expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
  document.cookie = `authToken=${token}; expires=${expires.toUTCString()}; path=/`;
};

export const getAuthToken = () => {
  const name = "authToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length); // Return the token
    }
  }
  return null; // Return an empty string if the token is not found
};

export const deleteAuthToken = () => {
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
};
