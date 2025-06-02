// Sample donation data structure
interface Donation {
  id: string;
  amount: number;
  timestamp: Date;
  donorName?: string;
  message?: string;
}

// In-memory storage for donations (replace with database in production)
let donations: Donation[] = []; // Start with empty donations

// Get total funds raised
export const getTotalFundsRaised = (): number => {
  return donations.reduce((total, donation) => total + donation.amount, 0);
};

// Add a new donation
export const addDonation = (amount: number, donorName?: string, message?: string): Donation => {
  const newDonation: Donation = {
    id: Math.random().toString(36).substr(2, 9),
    amount,
    timestamp: new Date(),
    donorName,
    message,
  };
  
  donations.push(newDonation);
  return newDonation;
};

// Get all donations
export const getAllDonations = (): Donation[] => {
  return [...donations];
};

// Get recent donations
export const getRecentDonations = (limit: number = 5): Donation[] => {
  return [...donations]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
}; 