import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('__at');

  return new Response(JSON.stringify({ token }), {
    headers: {
      'content-type': 'application/json'
    }
  });
}
