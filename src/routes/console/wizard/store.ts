import { writable } from 'svelte/store';

export type Collborator = {
    email: string;
    role: string;
    isAdmin?: boolean;
};

export type Tier = 'tier-0' | 'tier-1' | 'tier-2';

export const createOrganization = writable<{
    id?: string;
    name: string;
    billingPlan: Tier;
    paymentMethodId: string;
    billingBudget?: number;
    collaborators?: Collborator[];
}>({
    id: null,
    name: null,
    billingPlan: 'tier-1',
    paymentMethodId: null,
    collaborators: []
});