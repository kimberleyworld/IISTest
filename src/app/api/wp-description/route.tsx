// app/api/heading/route.ts

export async function GET() {
    let description = ' Backup If I Speak is a podcast from Moya Lothian-McLean and Ash Sarkar where the personal meets the political. Every week they tackle social dilemmas, cultural phenomena and the frustrations of modern life.'; // Default fallback description

  try {
    const response = await fetch('https://novaramedia.com/wp-json/wp/v2/categories?slug=if-i-espeak');
    
    if (!response.ok) {
      throw new Error('Failed to fetch heading');
    }
    
    const data = await response.json();
    // added a hard coded description incase description field is empty
    description = data[0]?.description || description; 
    console.log('description:', description);
    return new Response(JSON.stringify({ description }), { status: 200 });
  } catch (error) {
    console.error(error);
    // added a hard coded description incase API Call fails
    return new Response(JSON.stringify({ description }), { status: 200 });
  }
}
