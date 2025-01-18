export function isIdentical(first: any, second: any) {
    let identical
    if (first == second) {
        identical = true
    }
    
    if (first != second) {
        identical = false
    }
    return identical;
}



export function setSalaryLine(salary: string) {
    if (+salary <= 25000) {
        return "0 - 25.000";
    } else if (+salary > 25000 && +salary <= 40000) {
        return "25.000 - 40.000";
    } else if (+salary > 40000 && +salary <= 80000) {
        return "40.000 - 80.000";
    } else if (+salary > 80000 && +salary <= 120000) {
        return "80.000 - 120.000";
    } else if (+salary > 120000 && +salary <= 200000) {
        return "120.000 - 200.000";
    } else if (+salary > 200000) {
        return "200.000 - 500.000+";
    }
    return "Unknown salary"; 
}

export function extractFirstTwoDigits(inputString: string) {
    const match = inputString.match(/\d{1,2}/); 
    return match ? parseInt(match[0], 10) : null;
  }