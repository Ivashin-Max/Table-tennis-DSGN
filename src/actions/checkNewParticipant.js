
export const checkNewParticipant = (fioArr, nameToCheck) => {
  let result = null

  for (let i = 0; i < fioArr.length; i++) {
    const element = fioArr[i];
    if (element.fio1.toLowerCase() === nameToCheck.toLowerCase()) {
      result = true;
      break
    }
    result = false
  }
  return result
}