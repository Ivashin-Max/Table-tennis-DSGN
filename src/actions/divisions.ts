export const getDivisionName = (divisionId: number | string, allDivisions: any[]) => {

  const neededDivision = allDivisions.find((el: any) => el.id === divisionId)
  // if (neededDivision.division_name !== typeof DivisionName)
  return neededDivision.division_name
}