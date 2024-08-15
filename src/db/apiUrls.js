import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);

  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Unable to create short URL");
  }

  return data;
}

export async function getLongUrl(id) {
  // Fetch the original URL using either the short URL or the custom URL
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  // If there's an error or no data is found, throw an error
  if (error || !data) {
    console.error(
      "Error fetching short link:",
      error ? error.message : "No data found"
    );
    throw new Error("Short URL not found or does not exist.");
  }

  // Return the fetched data
  return data;
}

// export async function getUrl({ id, user_id }) {
//   const { data, error } = await supabase
//     .from("urls")
//     .select("*")
//     .eq("id", id)
//     .eq("user_id", user_id)
//     .single();

//   if (error) {
//     console.error(error.message);
//     throw new Error("Short Url not found");
//   }

//   return data;
// }

export async function getUrl({ id, user_id }) {
  // Fetch the URL record from the database where the id and user_id match
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  // If there's an error or no data is found, throw an error
  if (error || !data) {
    console.error(
      "Error fetching URL:",
      error ? error.message : "No data found"
    );
    throw new Error(
      "Short URL not found or you do not have permission to access it."
    );
  }

  // Return the fetched data
  return data;
}
