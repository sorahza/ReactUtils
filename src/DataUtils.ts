import { FieldValues } from "react-hook-form";

export function createApi(baseurl: string) {
  // const baseurl = import.meta.env.VITE_API_URL;
  async function fetchData<T>(url: string): Promise<T> {
    url = baseurl + url;
    const r = await fetch(url);
    const data = await r.json();
    return data;
  }

  async function deleteData<T>(url: string): Promise<T> {
    url = baseurl + url;
    const r = await fetch(url, { method: "DELETE" });
    const data = await r.json();
    return data;
  }
  async function postData<T>(url: string, form: FieldValues): Promise<T> {
    url = baseurl + url;
    const r = await fetch(url, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const data = await r.json();
    return data;
  }
  return { fetchData, postData, deleteData };
}
