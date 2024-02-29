import { queries, queryParamToMap } from '$lib/components/filters';
import { CARD_LIMIT } from '$lib/constants';
import {
    View,
    getLimit,
    getPage,
    getQuery,
    getSearch,
    getView,
    pageToOffset
} from '$lib/helpers/load';
import { sdk } from '$lib/stores/sdk';
import { Query, type Models } from '@appwrite.io/console';

// checkout messaging/+layout.ts

export const load = async ({ url, route }) => {
    const page = getPage(url);
    const search = getSearch(url);
    const view = getView(url, route, View.Grid);
    const limit = getLimit(url, route, CARD_LIMIT);
    const offset = pageToOffset(page, limit);
    const query = getQuery(url);

    const parsedQueries = queryParamToMap(query || '[]');
    queries.set(parsedQueries);

    // TODO: remove when the API is ready with data
    // This allows us to mock w/ data and when search returns 0 results
    let messages: {
        messages: Models.Message[];
        total: number;
    } = { messages: [], total: 0 };

    const params = [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc(''),
        ...parsedQueries.values()
    ];

    if (search) {
        params['search'] = search;
    }

    const response = await sdk.forProject.messaging.listMessages(params);

    messages = { messages: response.messages, total: response.total };

    return {
        offset,
        limit,
        search,
        query,
        page,
        view,
        messages
    };
};
