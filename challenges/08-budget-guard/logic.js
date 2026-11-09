// Budget Guard logic. Plain functions with no page code, so
// `npm run check budget` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
// Amounts are whole SEK. An application looks like application-draft.json; a call like one entry of calls.json.
//
// Problem codes: 'duration', 'partners' (fewer than minPartners, or no company when needsCompany),
// 'overhead:<partner name>' (overhead above maxOverheadShare of personnel),
// 'funding-rate:<partner name>' (requested above cost × fundingRate[type]), 'total-grant' (above maxGrant).

/** personnel + overhead + other for one partner. */
export function partnerCost(_partner) {
  throw new Error('TODO: implement partnerCost() in logic.js');
}

/** { totalCost, totalRequested, coFunding } where coFunding = totalCost - totalRequested. */
export function summarize(_application) {
  throw new Error('TODO: implement summarize() in logic.js');
}

/** Broken rules for this call → array of problem codes (empty when the budget fits). */
export function checkBudget(_application, _call) {
  throw new Error('TODO: implement checkBudget() in logic.js');
}

/**
 * Ids of calls the application can apply to on date today (ISO): deadline on or after today,
 * no budget problems, at least one shared topic. Most shared topics first, then earliest deadline.
 */
export function eligibleCalls(_calls, _application, _today) {
  throw new Error('TODO: implement eligibleCalls() in logic.js');
}
