import { getReviewsForService, saveReviewForService, updateReviewForService } from "$lib/server/api/review";
import { insertReviewSchema, updateReviewSchema, type Review, type ReviewInsert, type ReviewUpdate } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { randomUUID } from 'crypto';
import cat from "lucide-svelte/icons/cat";

export async function GET ({ params }) {
    try {

        const reviews: Review[] = await getReviewsForService(params.serviceId);
        
        if(!reviews){
            return json({ message: 'Reviews not found' }, { status: 404 });
        }

        return json(reviews);

    } catch(error) {
        console.error(error);
        return json({message: 'Server error'}, {status: 500})
    }
}

export async function POST ({params, request, locals}) {
    
    if(!locals.session || !locals.user){
        return json({message:"Forbidden"}, {status:403});
    }

    const review = await request.json();
    const newReview: ReviewInsert = {...review, id: randomUUID(), serviceId: params["serviceId"], userId: locals.user.id};

    try {
        const validatedReview = insertReviewSchema.parse(newReview);
        return await saveReviewForService(validatedReview);
    } catch(error) {
        console.error(error);
        return json({message: "Server error"}, {status: 500});
    }
}