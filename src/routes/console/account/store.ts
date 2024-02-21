import { page } from '$app/stores';
import { derived } from 'svelte/store';
import type { Models } from '@appwrite.io/console';

export const factors = derived(page, ($page) => $page.data.factors as Models.MfaFactors);
