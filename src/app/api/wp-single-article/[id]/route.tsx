export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    // Await the params object to extract the `id`
    const { id } = await context.params;

    // Fetch the single post from the WordPress API using the provided ID
    const response = await fetch(`https://novaramedia.com/wp-json/wp/v2/posts/${id}`);
    if (!response.ok) {
      return new Response("Failed to fetch the article", { status: 500 });
    }

    const article = await response.json();
    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    console.error("Error fetching article:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
