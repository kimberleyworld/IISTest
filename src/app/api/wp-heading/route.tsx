// app/api/heading/route.ts

export async function GET() {
  let heading = 'If I Speak'; // Default fallback heading
  try {
    const response = await fetch('https://novaramedia.com/wp-json/wp/v2/categories?slug=if-i-speak');
    
    if (!response.ok) {
      throw new Error('Failed to fetch heading');
    }
    
    const data = await response.json();
    heading = data[0]?.name || heading; 
    
    return new Response(JSON.stringify({ heading }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ heading }), { status: 200 });
  }
}
