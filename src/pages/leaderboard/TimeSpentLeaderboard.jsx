import LeaderboardPage from '../LeaderboardPage';
import { timeSpentLeaderboard } from '../../data/mockData';

export default function TimeSpentLeaderboard() {
  const total = timeSpentLeaderboard[0]?.timeSpent || '00:00:00';
  return (
    <LeaderboardPage
      title="Time Spent Leaderboard"
      metricLabel="Total Time Spent"
      metricValue={total + ' Hr'}
      downloadable={false}
      data={timeSpentLeaderboard}
      valueKey="timeSpent"
    />
  );
}
