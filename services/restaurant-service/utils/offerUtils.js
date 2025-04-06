import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateRestaurantOffersStatus(restaurantId) {
    const hasOffers = await prisma.article.findFirst({
        where: {
            categories: {
                some: {
                    restaurant_id: restaurantId
                }
            },
            has_offer: true
        }
    });

    await prisma.restaurant.update({
        where: { restaurant_id: restaurantId },
        data: { offers_available: !!hasOffers }
    });
}

export { updateRestaurantOffersStatus }; 