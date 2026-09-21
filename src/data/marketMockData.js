// Market Admin System Mock Data

export const traders = {
  total: 1247,
  active: 891,
  new: 43,
  activeChange: '+12%',
  newChange: '+8%',
  sparkline: [30, 45, 28, 60, 55, 75, 85, 70, 90, 95, 80, 100],
};

export const volume = {
  unmatched: '$14,230',
  matched: '$8,450',
  totalEarning: '$2,180',
};

export const topMarkets = [
  { name: 'Crypto', volume: 8420 },
  { name: 'Tech', volume: 3240 },
  { name: 'Sports', volume: 1850 },
  { name: 'Politics', volume: 980 },
  { name: 'Finance', volume: 620 },
];

export const highValueTrader = {
  profit: '$3,450',
  overallProfitPct: '+18.4%',
  direction: 'up',
};

export const avgTradeSize = { value: '$124.50' };

export const events = [
  { id: 'EV001', name: 'Will Bitcoin exceed $100k by end of 2026?', market: 'Crypto', topic: 'BTC Price', source: 'Polymarket', operator: 'Admin', volume: '$4,200', expiryDate: '31-12-2026', status: 'Open' },
  { id: 'EV002', name: 'Kraken IPO - Will it happen in 2026?', market: 'Crypto', topic: 'IPO', source: 'Kalshi', operator: 'System', volume: '$2,850', expiryDate: '30-06-2026', status: 'Overdue' },
  { id: 'EV003', name: 'Will Solana price go up or down this week?', market: 'Crypto', topic: 'Altcoin', source: 'Internal', operator: 'Admin', volume: '$1,640', expiryDate: '07-07-2026', status: 'Open' },
  { id: 'EV004', name: 'RAM price growing by 10% in Q3 2026?', market: 'Tech', topic: 'Hardware', source: 'Polymarket', operator: 'System', volume: '$980', expiryDate: '30-09-2026', status: 'Open' },
  { id: 'EV005', name: 'Will India win the next ICC T20 World Cup?', market: 'Sports', topic: 'Cricket', source: 'Internal', operator: 'Admin', volume: '$3,120', expiryDate: '15-10-2026', status: 'Open' },
  { id: 'EV006', name: 'Tesla stock above $300 by September?', market: 'Tech', topic: 'Stocks', source: 'Kalshi', operator: 'System', volume: '$2,200', expiryDate: '30-09-2026', status: 'Overdue' },
  { id: 'EV007', name: 'Will ETH 2.0 full merge complete in 2026?', market: 'Crypto', topic: 'Ethereum', source: 'Polymarket', operator: 'Admin', volume: '$1,875', expiryDate: '31-12-2026', status: 'Open' },
];

export const topics = [
  { id: 'O32F869E01', name: 'IPO', openEvents: 1, createdAt: '26-06-2026', active: true },
  { id: 'O32F869E02', name: 'Celebrities', openEvents: 3, createdAt: '15-05-2026', active: true },
  { id: 'O32F869E03', name: 'Sports', openEvents: 5, createdAt: '10-04-2026', active: true },
  { id: 'O32F869E04', name: 'BTC Price', openEvents: 2, createdAt: '01-03-2026', active: false },
  { id: 'O32F869E05', name: 'Altcoin', openEvents: 4, createdAt: '20-02-2026', active: true },
];

export const markets = [
  { id: '21', name: 'Crypto', source: 'Polymarket', topics: 5, openEvents: 12, createdAt: '01-01-2026', active: true },
  { id: '22', name: 'Tech', source: 'Kalshi', topics: 3, openEvents: 7, createdAt: '15-01-2026', active: true },
  { id: '23', name: 'Sports', source: 'Internal', topics: 8, openEvents: 18, createdAt: '10-02-2026', active: true },
  { id: '24', name: 'Politics', source: 'Polymarket', topics: 2, openEvents: 4, createdAt: '20-03-2026', active: false },
  { id: '25', name: 'Finance', source: 'Kalshi', topics: 4, openEvents: 9, createdAt: '05-04-2026', active: true },
];

export const spotlightEvents = [
  { sno: 1, name: 'Kraken IPO', volume: 38, market: 'Crypto', topic: 'IPO', expiryDate: '30-06-2026', spotlightMarketOnly: false, sp: true },
  { sno: 2, name: 'RAM price growing by 10%', volume: 22, market: 'Tech', topic: 'Hardware', expiryDate: '30-09-2026', spotlightMarketOnly: true, sp: false },
  { sno: 3, name: 'Solana Up or Down', volume: 35, market: 'Crypto', topic: 'Altcoin', expiryDate: '07-07-2026', spotlightMarketOnly: false, sp: true },
  { sno: 4, name: 'India vs Australia Final', volume: 29, market: 'Sports', topic: 'Cricket', expiryDate: '15-10-2026', spotlightMarketOnly: false, sp: false },
  { sno: 5, name: 'Bitcoin $100k milestone', volume: 40, market: 'Crypto', topic: 'BTC Price', expiryDate: '31-12-2026', spotlightMarketOnly: true, sp: true },
  { sno: 6, name: 'Tesla stock rally Q3', volume: 18, market: 'Tech', topic: 'Stocks', expiryDate: '30-09-2026', spotlightMarketOnly: false, sp: false },
];

export const cryptoAssets = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', mapped: true, exchange: 'Binance', pair: 'BTC/USDT' },
  { id: 2, symbol: 'ETH', name: 'Ethereum', mapped: true, exchange: 'Coinbase', pair: 'ETH/USDT' },
  { id: 3, symbol: 'SOL', name: 'Solana', mapped: false, exchange: '-', pair: '-' },
  { id: 4, symbol: 'BNB', name: 'BNB', mapped: true, exchange: 'Binance', pair: 'BNB/USDT' },
  { id: 5, symbol: 'XRP', name: 'XRP', mapped: false, exchange: '-', pair: '-' },
];

export const cryptoTradingReports = [
  { date: '01-07-2026', asset: 'BTC', trades: 142, volume: '$18,430', fees: '$184', pnl: '+$2,340' },
  { date: '02-07-2026', asset: 'ETH', trades: 98, volume: '$9,820', fees: '$98', pnl: '+$1,120' },
  { date: '03-07-2026', asset: 'SOL', trades: 67, volume: '$3,350', fees: '$34', pnl: '-$210' },
  { date: '04-07-2026', asset: 'BTC', trades: 189, volume: '$24,670', fees: '$247', pnl: '+$3,100' },
  { date: '05-07-2026', asset: 'BNB', trades: 54, volume: '$2,700', fees: '$27', pnl: '+$450' },
];

export const parentCategories = [
  { id: 1, name: 'Sports', description: 'All sports-related prediction markets', subCategories: 3, status: 'Active' },
  { id: 2, name: 'Elections', description: 'Political and election outcomes', subCategories: 2, status: 'Active' },
  { id: 3, name: 'Reality Shows', description: 'TV reality show outcomes', subCategories: 1, status: 'Inactive' },
  { id: 4, name: 'Finance', description: 'Stock market and financial predictions', subCategories: 4, status: 'Active' },
];

export const subCategories = [
  { id: 1, icon: 'S', name: 'Football', parentCategory: 'Sports', description: 'Football leagues and cups', leagues: 5, popular: true, status: 'Active' },
  { id: 2, icon: 'C', name: 'Cricket', parentCategory: 'Sports', description: 'International and domestic cricket', leagues: 3, popular: true, status: 'Active' },
  { id: 3, icon: 'B', name: 'Baseball', parentCategory: 'Sports', description: 'MLB and international baseball', leagues: 2, popular: false, status: 'Active' },
  { id: 4, icon: 'T', name: 'Tennis', parentCategory: 'Sports', description: 'Grand slams and ATP/WTA tours', leagues: 4, popular: false, status: 'Inactive' },
];

export const leagues = [
  { id: 1, logo: 'MLB', name: 'Major League Baseball', abbr: 'MLB', subCategory: 'Baseball', year: 2026, fixtures: 162, status: 'Active' },
  { id: 2, logo: 'FIFA', name: 'FIFA World Cup', abbr: 'FWC', subCategory: 'Football', year: 2026, fixtures: 64, status: 'Active' },
  { id: 3, logo: 'IPL', name: 'Indian Premier League', abbr: 'IPL', subCategory: 'Cricket', year: 2026, fixtures: 74, status: 'Active' },
  { id: 4, logo: 'EPL', name: 'English Premier League', abbr: 'EPL', subCategory: 'Football', year: 2026, fixtures: 380, status: 'Inactive' },
  { id: 5, logo: 'WIM', name: 'Wimbledon', abbr: 'WIM', subCategory: 'Tennis', year: 2026, fixtures: 128, status: 'Active' },
];

export const competitors = [
  { id: 1, logo: 'PHI', name: 'Philadelphia Eagles', shortName: 'PHI', type: 'Team', league: 'NFL', status: 'Active' },
  { id: 2, logo: 'MI', name: 'Mumbai Indians', shortName: 'MI', type: 'Team', league: 'IPL', status: 'Active' },
  { id: 3, logo: 'VK', name: 'Virat Kohli', shortName: 'VK', type: 'Player', league: 'IPL', status: 'Active' },
  { id: 4, logo: 'NYY', name: 'New York Yankees', shortName: 'NYY', type: 'Team', league: 'MLB', status: 'Active' },
  { id: 5, logo: 'LEO', name: 'Lionel Messi', shortName: 'LEO', type: 'Player', league: 'FIFA WC', status: 'Active' },
];

export const users = [
  { id: 'USR001', name: 'Alex Johnson', email: 'alex.johnson@email.com', userId: 'AJ7823' },
  { id: 'USR002', name: 'Maria Garcia', email: 'maria.garcia@email.com', userId: 'MG4521' },
  { id: 'USR003', name: 'James Wilson', email: 'james.wilson@email.com', userId: 'JW9034' },
  { id: 'USR004', name: 'Priya Sharma', email: 'priya.sharma@email.com', userId: 'PS6178' },
  { id: 'USR005', name: 'Chen Wei', email: 'chen.wei@email.com', userId: 'CW3345' },
];

export const plReport = {
  totalUserVol: '$284,320',
  feesCollected: '$14,216',
  netPlatformProfit: '$8,920',
  totalMarketCreated: 47,
};

export const reorderMarketsList = [
  { id: '21', name: 'Crypto' },
  { id: '22', name: 'Tech' },
  { id: '23', name: 'Sports' },
  { id: '24', name: 'Politics' },
  { id: '25', name: 'Finance' },
];

export const reorderTopicsList = [
  { id: 'O32F869E01', name: 'IPO' },
  { id: 'O32F869E02', name: 'Celebrities' },
  { id: 'O32F869E03', name: 'Sports' },
  { id: 'O32F869E04', name: 'BTC Price' },
  { id: 'O32F869E05', name: 'Altcoin' },
];
