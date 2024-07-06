import client from "@/helpers/client";

export const signInWithPassword = async (email: string, password: string) => {
  const response = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const signup = async (
  email: string,
  password: string,
  options: { emailRedirectTo?: string; data: Record<string, unknown> },
) => {
  await client.auth.signUp({
    email,
    password,
    options,
  });
};

export const signInWithGoogle = async () => {
  await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.protocol}//${location.host}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
};

export const logout = async () => {
  await client.auth.signOut();
};

export const getSession = async () => {
  const { error, data } = await client.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
};

export const isAuthenticated = async () => {
  const session = await getSession();

  return !!session;
};
