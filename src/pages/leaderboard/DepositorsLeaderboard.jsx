import LeaderboardPage from '../LeaderboardPage';
import { depositorsLeaderboard } from '../../data/mockData';

export default function DepositorsLeaderboard() {
  const total = depositorsLeaderboard.reduce((s, r) => s + r.amount, 0);
  return (
    <LeaderboardPage
      title="Depositors Leaderboard"
      metricLabel="Amount Deposited"
      metricValue={'$' + total.toLocaleString()}
      data={depositorsLeaderboard}
      valueKey="amount"
      formatValue={(v) => '$' + v.toLocaleString()}
    />
  );
}
