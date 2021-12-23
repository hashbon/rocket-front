import { useSelector } from "react-redux";
import { Order, Offer } from "../store/actions/orders-actions/orders-actions.model";

export default () => {
  const offers: Offer[] = useSelector((state: any) => state.orders.exchangerOffers);

  const getOfferById = (_id: number) => offers.filter(({ id }: Offer) => id === _id)[0] || false;

  const getCountersForOffer = (offer: Offer) => {
    if (!offer) {
      return {
        paid: 0,
        reserved: 0,
        left: 0,
      };
    }

    let paid = 0;
    let reserved = 0;

    offer.orders.forEach((order: Order) => {
      if (order.complete) {
        // eslint-disable-next-line no-plusplus
        return paid++;
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (order.reservedUntil && order.reservedUntil > currentTimestamp) {
        // eslint-disable-next-line no-return-assign
        return (reserved += order.amount);
      }
      return false;
    });

    return {
      paid,
      reserved,
      left: offer.amount - paid,
    };
  };

  return {
    offers,
    getOfferById,
    getCountersForOffer,
  };
};
