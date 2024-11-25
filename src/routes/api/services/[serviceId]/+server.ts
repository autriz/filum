import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    let id = params["serviceId"];

    // return json(data)
    return new Response("", { status: 204 });
}