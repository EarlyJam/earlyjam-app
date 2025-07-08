import { v4 } from "uuid";

import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import client from "@/helpers/client";

export async function signInWithPassword(email: string, password: string) {
  const response = await client.auth.signInWithPassword({
    email,
    password
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

export async function signup(
  email: string,
  password: string,
  options: { emailRedirectTo?: string; data: Record<string, unknown> }
) {
  await client.auth.signUp({
    email,
    password,
    options
  });
}

export async function resendVerificationEmail(email: string) {
  await client.auth.resend({
    type: "signup",
    email
  });
}

export async function signInWithGoogle(redirect?: string) {
  await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}${redirect ?? ""}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent"
      }
    }
  });
}

export async function signUpWithGoogle(type: string) {
  const state = v4();
  localStorage.setItem(LOCAL_STORAGE_KEYS.oauthState, state);
  await client.auth
    .signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/oauth-callback?type=${type}&state=${state}`,
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    })
    .catch((error: unknown) => {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.oauthState);
      throw error;
    });
}

export async function logout() {
  await client.auth.signOut();
}

export async function sendResetPasswordEmail(email: string) {
  await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
}

export async function updateUserPassword(password: string) {
  await client.auth.updateUser({
    password
  });
}

export async function getSession() {
  const { error, data } = await client.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function isAuthenticated() {
  const session = await getSession();

  return !!session;
}

export async function getAuthUser() {
  const {
    data: { user }
  } = await client.auth.getUser();

  return user ?? undefined;
}
