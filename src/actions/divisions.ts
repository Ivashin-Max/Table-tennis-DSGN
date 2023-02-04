export const getDivisionName = (
  cityId: number,
  zoneId: number,
  divisionId: number,
  allDivisions: any[]
) => {
  const neededCity = allDivisions?.find((el: any) => el.id === cityId);
  const neededZone = neededCity?.find((el: any) => el.id === zoneId);
  const neededDivision = neededZone?.find((el: any) => el.id === divisionId);

  return neededDivision.division_name;
};
