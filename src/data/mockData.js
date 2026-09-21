export const users = [
  { id: 'UID001', username: 'rahul_k', fullName: 'Rahul Kumar', email: 'rahul.kumar@gmail.com', phone: '+91 9876543210', city: 'Mumbai', status: 'Active', wallet: 1250.00, flag: false, joinDate: '2024-01-15', kycStatus: 'Verified', doc: 'Aadhar Card' },
  { id: 'UID002', username: 'priya_s', fullName: 'Priya Sharma', email: 'priya.s@gmail.com', phone: '+91 9823456789', city: 'Delhi', status: 'Active', wallet: 3400.50, flag: false, joinDate: '2024-01-20', kycStatus: 'Verified', doc: 'PAN Card' },
  { id: 'UID003', username: 'amit_p', fullName: 'Amit Patel', email: 'amit.patel@yahoo.com', phone: '+91 9012345678', city: 'Ahmedabad', status: 'Pending Docs', wallet: 0, flag: false, joinDate: '2024-02-01', kycStatus: 'Pending', doc: 'Passport' },
  { id: 'UID004', username: 'sneha_m', fullName: 'Sneha Mehta', email: 'sneha.mehta@hotmail.com', phone: '+91 9711234567', city: 'Pune', status: 'Active', wallet: 750.00, flag: true, joinDate: '2024-02-10', kycStatus: 'Verified', doc: 'Aadhar Card' },
  { id: 'UID005', username: 'vijay_r', fullName: 'Vijay Reddy', email: 'vijay.r@gmail.com', phone: '+91 9634567890', city: 'Hyderabad', status: 'Active', wallet: 5200.75, flag: false, joinDate: '2024-02-15', kycStatus: 'Verified', doc: 'PAN Card' },
  { id: 'UID006', username: 'pooja_n', fullName: 'Pooja Nair', email: 'pooja.nair@gmail.com', phone: '+91 9512345678', city: 'Kochi', status: 'Flagged', wallet: 120.00, flag: true, joinDate: '2024-02-20', kycStatus: 'Rejected', doc: 'Voter ID' },
  { id: 'UID007', username: 'arjun_b', fullName: 'Arjun Bose', email: 'arjun.bose@gmail.com', phone: '+91 9456789012', city: 'Kolkata', status: 'Active', wallet: 8900.00, flag: false, joinDate: '2024-03-01', kycStatus: 'Verified', doc: 'Aadhar Card' },
  { id: 'UID008', username: 'kavita_d', fullName: 'Kavita Desai', email: 'kavita.d@gmail.com', phone: '+91 9345678901', city: 'Surat', status: 'Pending Docs', wallet: 0, flag: false, joinDate: '2024-03-05', kycStatus: 'Pending', doc: 'Driving License' },
  { id: 'UID009', username: 'rakesh_t', fullName: 'Rakesh Tiwari', email: 'rakesh.t@gmail.com', phone: '+91 9234567890', city: 'Lucknow', status: 'Active', wallet: 2100.25, flag: false, joinDate: '2024-03-10', kycStatus: 'Verified', doc: 'Aadhar Card' },
  { id: 'UID010', username: 'anita_g', fullName: 'Anita Gupta', email: 'anita.g@gmail.com', phone: '+91 9123456789', city: 'Jaipur', status: 'Active', wallet: 650.00, flag: false, joinDate: '2024-03-12', kycStatus: 'Verified', doc: 'PAN Card' },
];
export const withdrawals = [
  { id: 'WD001', userId: 'UID001', username: 'rahul_k', fullName: 'Rahul Kumar', currency: 'INR', amount: 500.00, processingCharge: 10.00, actualPayable: 490.00, addedDate: '2024-03-20 10:30', status: 'Pending', paymentMode: 'UPI' },
  { id: 'WD002', userId: 'UID002', username: 'priya_s', fullName: 'Priya Sharma', currency: 'INR', amount: 1000.00, processingCharge: 15.00, actualPayable: 985.00, addedDate: '2024-03-20 11:15', status: 'Pending', paymentMode: 'Bank Transfer' },
  { id: 'WD003', userId: 'UID005', username: 'vijay_r', fullName: 'Vijay Reddy', currency: 'INR', amount: 2500.00, processingCharge: 25.00, actualPayable: 2475.00, addedDate: '2024-03-19 15:45', status: 'Approved', paymentMode: 'UPI' },
  { id: 'WD004', userId: 'UID007', username: 'arjun_b', fullName: 'Arjun Bose', currency: 'INR', amount: 3000.00, processingCharge: 30.00, actualPayable: 2970.00, addedDate: '2024-03-19 09:00', status: 'Approved', paymentMode: 'Bank Transfer' },
  { id: 'WD005', userId: 'UID004', username: 'sneha_m', fullName: 'Sneha Mehta', currency: 'INR', amount: 200.00, processingCharge: 5.00, actualPayable: 195.00, addedDate: '2024-03-18 14:20', status: 'Rejected', paymentMode: 'UPI' },
  { id: 'WD006', userId: 'UID009', username: 'rakesh_t', fullName: 'Rakesh Tiwari', currency: 'INR', amount: 800.00, processingCharge: 12.00, actualPayable: 788.00, addedDate: '2024-03-18 16:00', status: 'Pending', paymentMode: 'UPI' },
];
export const transactions = [
  { id: 'TXN001', userId: 'UID001', username: 'rahul_k', orderId: 'ORD001', transactionId: 'TXR123456789', description: 'Deposit', gameType: 'Cricket', contest: 'IPL T20 #A1', paymentMode: 'UPI', paymentType: 'Credit', amount: 500.00, date: '2024-03-20 10:00' },
  { id: 'TXN002', userId: 'UID002', username: 'priya_s', orderId: 'ORD002', transactionId: 'TXR234567890', description: 'Contest Join', gameType: 'Cricket', contest: 'IPL T20 #B2', paymentMode: 'Wallet', paymentType: 'Debit', amount: -250.00, date: '2024-03-20 10:30' },
  { id: 'TXN003', userId: 'UID005', username: 'vijay_r', orderId: 'ORD003', transactionId: 'TXR345678901', description: 'Winning', gameType: 'Cricket', contest: 'IPL T20 #C3', paymentMode: 'Wallet', paymentType: 'Credit', amount: 1500.00, date: '2024-03-19 22:00' },
  { id: 'TXN004', userId: 'UID007', username: 'arjun_b', orderId: 'ORD004', transactionId: 'TXR456789012', description: 'Deposit', gameType: '-', contest: '-', paymentMode: 'Net Banking', paymentType: 'Credit', amount: 5000.00, date: '2024-03-19 08:45' },
  { id: 'TXN005', userId: 'UID003', username: 'amit_p', orderId: 'ORD005', transactionId: 'TXR567890123', description: 'Contest Join', gameType: 'Football', contest: 'EPL #D4', paymentMode: 'Wallet', paymentType: 'Debit', amount: -100.00, date: '2024-03-18 19:15' },
  { id: 'TXN006', userId: 'UID009', username: 'rakesh_t', orderId: 'ORD006', transactionId: 'TXR678901234', description: 'Refund', gameType: 'Cricket', contest: 'IPL T20 #E5', paymentMode: 'Wallet', paymentType: 'Credit', amount: 100.00, date: '2024-03-18 20:00' },
  { id: 'TXN007', userId: 'UID010', username: 'anita_g', orderId: 'ORD007', transactionId: 'TXR789012345', description: 'Deposit', gameType: '-', contest: '-', paymentMode: 'UPI', paymentType: 'Credit', amount: 1000.00, date: '2024-03-17 12:30' },
];
export const winningBalances = [
  { id: 'UID005', username: 'vijay_r', fullName: 'Vijay Reddy', email: 'vijay.r@gmail.com', mobile: '+91 9634567890', winningBalance: 5200.75 },
  { id: 'UID007', username: 'arjun_b', fullName: 'Arjun Bose', email: 'arjun.bose@gmail.com', mobile: '+91 9456789012', winningBalance: 8900.00 },
  { id: 'UID001', username: 'rahul_k', fullName: 'Rahul Kumar', email: 'rahul.kumar@gmail.com', mobile: '+91 9876543210', winningBalance: 1250.00 },
  { id: 'UID002', username: 'priya_s', fullName: 'Priya Sharma', email: 'priya.s@gmail.com', mobile: '+91 9823456789', winningBalance: 3400.50 },
  { id: 'UID009', username: 'rakesh_t', fullName: 'Rakesh Tiwari', email: 'rakesh.t@gmail.com', mobile: '+91 9234567890', winningBalance: 2100.25 },
];
export const promoCodes = [
  { id: 'PC001', code: 'WELCOME50', type: 'Percentage', value: 50, minDeposit: 100, maxBonus: 500, usedCount: 234, totalLimit: 1000, expiryDate: '2024-12-31', status: 'Active' },
  { id: 'PC002', code: 'FLAT100', type: 'Flat', value: 100, minDeposit: 500, maxBonus: 100, usedCount: 89, totalLimit: 500, expiryDate: '2024-06-30', status: 'Active' },
  { id: 'PC003', code: 'IPL2024', type: 'Percentage', value: 25, minDeposit: 200, maxBonus: 1000, usedCount: 567, totalLimit: 2000, expiryDate: '2024-05-31', status: 'Expired' },
  { id: 'PC004', code: 'NEWUSER', type: 'Flat', value: 50, minDeposit: 100, maxBonus: 50, usedCount: 123, totalLimit: 9999, expiryDate: '2025-12-31', status: 'Active' },
];
export const roles = [
  { id: 1, name: 'Super Admin', permissions: ['All'], createdAt: '2024-01-01', status: 'Active' },
  { id: 2, name: 'Content Manager', permissions: ['CMS', 'Signup Page', 'Assets Upload'], createdAt: '2024-01-10', status: 'Active' },
  { id: 3, name: 'Finance Manager', permissions: ['Withdrawal List', 'Transaction List', 'Winning Balance'], createdAt: '2024-01-15', status: 'Active' },
  { id: 4, name: 'Support Agent', permissions: ['Manage User', 'User Report'], createdAt: '2024-02-01', status: 'Active' },
];
export const games = [
  { id: 1, order: 1, name: 'Cricket', description: 'Fantasy Cricket - Pick your dream XI', gameUrl: '/games/cricket', launchType: 'In-App', image: '🏏', dimension: '1920x1080', status: 'Active', category: 'Sports' },
  { id: 2, order: 2, name: 'Football', description: 'Fantasy Football - Build your squad', gameUrl: '/games/football', launchType: 'In-App', image: '⚽', dimension: '1920x1080', status: 'Active', category: 'Sports' },
  { id: 3, order: 3, name: 'Kabaddi', description: 'Fantasy Kabaddi - Pick the raiders', gameUrl: '/games/kabaddi', launchType: 'In-App', image: '🤸', dimension: '1920x1080', status: 'Active', category: 'Sports' },
  { id: 4, order: 4, name: 'Basketball', description: 'Fantasy Basketball - Draft your lineup', gameUrl: '/games/basketball', launchType: 'In-App', image: '🏀', dimension: '1920x1080', status: 'Inactive', category: 'Sports' },
  { id: 5, order: 5, name: 'Baseball', description: 'Fantasy Baseball - Build your roster', gameUrl: '/games/baseball', launchType: 'External', image: '⚾', dimension: '1920x1080', status: 'Inactive', category: 'Sports' },
];
export const paymentGateways = [
  { id: 1, title: 'Razorpay', description: 'Payment gateway for Indian market', image: '💳', depositEnabled: true, withdrawalEnabled: true, status: 'Active' },
  { id: 2, title: 'PayU', description: 'Alternative payment processing', image: '💰', depositEnabled: true, withdrawalEnabled: false, status: 'Active' },
  { id: 3, title: 'Paytm', description: 'Paytm wallet integration', image: '📱', depositEnabled: true, withdrawalEnabled: true, status: 'Active' },
  { id: 4, title: 'Manual PG', description: 'Manual payment processing by admin', image: '🏦', depositEnabled: false, withdrawalEnabled: true, status: 'Active', isManual: true },
];
export const avatars = [
  { id: 1, emoji: '🦁', name: 'Lion', status: 'Active' },
  { id: 2, emoji: '🐯', name: 'Tiger', status: 'Active' },
  { id: 3, emoji: '🦅', name: 'Eagle', status: 'Active' },
  { id: 4, emoji: '🐬', name: 'Dolphin', status: 'Active' },
  { id: 5, emoji: '🦊', name: 'Fox', status: 'Active' },
  { id: 6, emoji: '🐺', name: 'Wolf', status: 'Active' },
  { id: 7, emoji: '🦈', name: 'Shark', status: 'Active' },
  { id: 8, emoji: '🐻', name: 'Bear', status: 'Hidden' },
  { id: 9, emoji: '🦋', name: 'Butterfly', status: 'Hidden' },
  { id: 10, emoji: '🐉', name: 'Dragon', status: 'Active' },
  { id: 11, emoji: '🦒', name: 'Giraffe', status: 'Active' },
  { id: 12, emoji: '🐘', name: 'Elephant', status: 'Active' },
];
export const dashboardStats = {
  totalUsers: 48293, activeUsers: 31204, totalDeposits: 2847650, totalWithdrawals: 1923400,
  totalContests: 1847, pendingWithdrawals: 23, todayNewUsers: 148, todayDeposits: 84320,
};
export const chartData = {
  userGrowth: [
    { month: 'Oct', users: 12400 }, { month: 'Nov', users: 18200 }, { month: 'Dec', users: 22100 },
    { month: 'Jan', users: 28900 }, { month: 'Feb', users: 35600 }, { month: 'Mar', users: 48293 },
  ],
  depositVsWithdrawal: [
    { month: 'Oct', deposits: 380000, withdrawals: 210000 }, { month: 'Nov', deposits: 510000, withdrawals: 290000 },
    { month: 'Dec', deposits: 620000, withdrawals: 380000 }, { month: 'Jan', deposits: 490000, withdrawals: 310000 },
    { month: 'Feb', deposits: 580000, withdrawals: 350000 }, { month: 'Mar', deposits: 667650, withdrawals: 383400 },
  ],
  gameDistribution: [
    { name: 'Cricket', value: 68 }, { name: 'Football', value: 18 }, { name: 'Kabaddi', value: 10 }, { name: 'Others', value: 4 },
  ],
};
export const notifications = [
  { id: 1, title: 'IPL Season Special!', body: 'Join now and get 50% bonus on your first deposit this IPL season!', type: 'Promotional', sent: '2024-03-15', status: 'Sent', reach: 48293 },
  { id: 2, title: 'New Contest Alert', body: 'A new mega contest with Rs.10 lakh prize pool is live now!', type: 'Contest', sent: '2024-03-18', status: 'Sent', reach: 31204 },
  { id: 3, title: 'KYC Reminder', body: 'Complete your KYC to unlock withdrawal features.', type: 'Reminder', sent: '-', status: 'Draft', reach: 0 },
];
export const userReports = [
  { id: 'UID001', username: 'rahul_k', fullName: 'Rahul Kumar', email: 'rahul.kumar@gmail.com', phone: '+91 9876543210', city: 'Mumbai', totalContests: 47, totalDeposit: 6200.00, totalWinnings: 5100.00, referrals: 8 },
  { id: 'UID002', username: 'priya_s', fullName: 'Priya Sharma', email: 'priya.s@gmail.com', phone: '+91 9823456789', city: 'Delhi', totalContests: 82, totalDeposit: 12400.00, totalWinnings: 9800.00, referrals: 15 },
  { id: 'UID005', username: 'vijay_r', fullName: 'Vijay Reddy', email: 'vijay.r@gmail.com', phone: '+91 9634567890', city: 'Hyderabad', totalContests: 134, totalDeposit: 28000.00, totalWinnings: 31200.00, referrals: 22 },
  { id: 'UID007', username: 'arjun_b', fullName: 'Arjun Bose', email: 'arjun.bose@gmail.com', phone: '+91 9456789012', city: 'Kolkata', totalContests: 96, totalDeposit: 18500.00, totalWinnings: 22100.00, referrals: 11 },
  { id: 'UID009', username: 'rakesh_t', fullName: 'Rakesh Tiwari', email: 'rakesh.t@gmail.com', phone: '+91 9234567890', city: 'Lucknow', totalContests: 31, totalDeposit: 4100.00, totalWinnings: 3200.00, referrals: 5 },
];
export const depositReports = [
  { userId: 'UID002', username: 'priya_s', fullName: 'Priya Sharma', totalDepositAmount: 12400.00, depositCount: 18, lastDeposit: '2024-03-19', avgDeposit: 688.89 },
  { userId: 'UID005', username: 'vijay_r', fullName: 'Vijay Reddy', totalDepositAmount: 28000.00, depositCount: 32, lastDeposit: '2024-03-20', avgDeposit: 875.00 },
  { userId: 'UID007', username: 'arjun_b', fullName: 'Arjun Bose', totalDepositAmount: 18500.00, depositCount: 24, lastDeposit: '2024-03-19', avgDeposit: 770.83 },
  { userId: 'UID001', username: 'rahul_k', fullName: 'Rahul Kumar', totalDepositAmount: 6200.00, depositCount: 12, lastDeposit: '2024-03-20', avgDeposit: 516.67 },
  { userId: 'UID009', username: 'rakesh_t', fullName: 'Rakesh Tiwari', totalDepositAmount: 4100.00, depositCount: 9, lastDeposit: '2024-03-17', avgDeposit: 455.56 },
];
export const cmsPages = [
  { id: 1, title: 'About Us', slug: 'about-us', lastUpdated: '2024-03-10', status: 'Published' },
  { id: 2, title: 'Terms & Conditions', slug: 'terms-conditions', lastUpdated: '2024-02-28', status: 'Published' },
  { id: 3, title: 'Privacy Policy', slug: 'privacy-policy', lastUpdated: '2024-02-28', status: 'Published' },
  { id: 4, title: 'How to Play', slug: 'how-to-play', lastUpdated: '2024-03-05', status: 'Published' },
  { id: 5, title: 'Responsible Gaming', slug: 'responsible-gaming', lastUpdated: '2024-01-15', status: 'Draft' },
  { id: 6, title: 'FAQ', slug: 'faq', lastUpdated: '2024-03-12', status: 'Published' },
];
