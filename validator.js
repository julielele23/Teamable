function isinvalidemail(userobject) {
    return !userobject.email.includes("@")
}

function isemptypayload(userobject){
    return Object.keys(userobject).length === 0
}
module.exports = {
    isemptypayload,
    isinvalidemail
}