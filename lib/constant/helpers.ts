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
        return "0 - 25000";
    } else if (+salary > 25000 && +salary <= 40000) {
        return "25000 - 40000";
    } else if (+salary > 40000 && +salary <= 80000) {
        return "40000 - 80000";
    } else if (+salary > 80000 && +salary <= 120000) {
        return "80000 - 120000";
    } else if (+salary > 120000 && +salary <= 200000) {
        return "120000 - 200000";
    } else if (+salary > 200000) {
        return "200000 - 500000+";
    }
    return "Unknown salary"; 
}