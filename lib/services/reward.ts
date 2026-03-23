export const REWARD_RULES = {
  unlockApprovedCoupon: 0.25,
  successfulFeedback: 0.75,
};

export const calculateReward = (unlocks: number, successes: number) =>
  unlocks * REWARD_RULES.unlockApprovedCoupon + successes * REWARD_RULES.successfulFeedback;
