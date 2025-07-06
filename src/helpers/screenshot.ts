export async function createScreenshot(url: string) {
  const apiUrl = new URL("https://shot.screenshotapi.net/screenshot");
  apiUrl.searchParams.set("token", import.meta.env.VITE_SCREENSHOT_API_TOKEN as string);
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("output", "json");
  apiUrl.searchParams.set("file_type", "png");
  apiUrl.searchParams.set("full_page", "true");
  apiUrl.searchParams.set("lazy_load", "true");
  const response = await fetch(apiUrl.toString());

  return (await response.json()) as { screenshot: string };
}
