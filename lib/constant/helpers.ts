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