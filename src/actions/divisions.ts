export const getDivisionName = (divisionId: number | string, allDivisions: any[]) => {

  const neededDivision = allDivisions.find((el: any) => el.id === divisionId)
  return neededDivision.division_name
}