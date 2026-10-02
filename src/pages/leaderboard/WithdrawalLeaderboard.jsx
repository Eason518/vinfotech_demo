import LeaderboardPage from '../LeaderboardPage';
import { withdrawalLeaderboard } from '../../data/mockData';

export default function WithdrawalLeaderboard() {
  const total = withdrawalLeaderboard.reduce((s, r) => s + (r.amount || 0), 0);
  return (
    <LeaderboardPage
      title="Withdrawal Leaderboard"
      metricLabel="Withdrawal"
      metricValue={'$' + total.toLocaleString()}
      data={withdrawalLeaderboard}
      valueKey="amount"
      formatValue={(v) => '$' + v.toLocaleString()}
    />
  );
}
