export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    // gets the time in mili
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};