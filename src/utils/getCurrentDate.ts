export const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getCurrentDate = () => {
  const today = new Date();
  // On récupère l'année et le mois
  const year = today.getFullYear();

  let month = String(today.getMonth() + 1).padStart(2, "0");

  const fromDate = `${year}-${month}-01`;
  // Le dernier jour du mois
  const lastDayDate = new Date(year, today.getMonth() + 1, 0);
  const lastDay = String(lastDayDate.getDate()).padStart(2, "0");
  const lastDayFormatted = `${year}-${month}-${lastDay}`;
  return {
    today: today,
    year: year,
    month: month,
    fromDate: fromDate,
    toDate: lastDayFormatted,
    lastDay: lastDay,
  };
};
