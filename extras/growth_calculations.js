exports.calculate_monthly = function(number){
    let a = number**30;
    a = Math.round((a + Number.EPSILON) * 100) / 100;
    return Math.round((a - 1) *100);
}
exports.calculate_growth = function(number){
    return Math.round(((number - 1)*100 + Number.EPSILON) * 100) / 100;
}
exports.numberWithCommas = function(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}