const  {isinvalidemail, isemptypayload} = require("../validator")
test("valid email", function(){
    const testpayload = {
        name: "test name",
        email: "example@gmail.com",
        interests: "testing"
    } 
    const testresult =isinvalidemail(testpayload)
    expect(testresult).toBe(false)
})


test("invalid email", function(){
    const testpayload = {
        name: "test name",
        email: "examplegmail.com",
        interests: "testing"
    } 
    const testresult =isinvalidemail(testpayload)
    expect(testresult).toBe(true)
})


test("emptpayload", function(){
    const testpayload = {}
        
    const testresult =isemptypayload(testpayload)
    expect(testresult).toBe(true)
})


test("non empty payload", function(){
    const testpayload = {
        name: "test name",
        email: "examplegmail.com",
        interests: "testing"
    } 
    const testresult =isemptypayload(testpayload)
    expect(testresult).toBe(false)
})
