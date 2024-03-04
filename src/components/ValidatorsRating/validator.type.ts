export interface Validator {
  name: string
  staked: number
  staked_usd: number
  apr: number 
  apr_30days: number 
  apr_365days: number 
  executed_rewards: number
  consensus_rewards: number
  produced_blocks: number
}