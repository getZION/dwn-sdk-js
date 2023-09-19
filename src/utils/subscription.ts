import { SubscriptionQueryMessage } from "../types/subscription-types.js";
import { SubscriptionQuery } from "../interfaces/subscription-query.js";
/**
 * Class containing useful utilities related to the Subscription interface.
 */
export class Subscription {

}

type SubscriptionConfig = {
};

export class SubscriptionManager {

  // subscriptions stored a internal protocol 
  constructor() {

  }

  public static async getSubscriptionsForContext(message: SubscriptionQueryMessage) {
    let subscriptionsQuery: SubscriptionQuery;
    subscriptionsQuery = await SubscriptionQuery.parse(message);
      // fetch all published records matching the query
    const queryFilter = {
      ...Records.convertFilter(filter),
      interface         : DwnInterfaceName.Subscription,
      method            : DwnMethodName.Request,
      isLatestBaseState : true
    };
    
    const messageSort = this.convertDateSort(dateSort);
    return this.messageStore.query(tenant, [ queryFilter ], messageSort, pagination);

  }

}
