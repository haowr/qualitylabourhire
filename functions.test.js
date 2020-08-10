const functions = require('./functions');

test('Adds 2 + 2 to equal 4',()=>{

    expect(functions.add(2,2)).toBe(4);
    //toBe is an example of a "Matcher". Jest has many "Matchers".

})
test("Adds 2+2 equals 4", ()=>{

    expect(functions.addFail(2,2)).toBe(4);

})
test("Adds 2+2 equals 4", ()=>{

    expect(functions.addFail(2,2)).not.toBe(4);

})

// CHECK FOR TRUTHY OF FALSY VALUES
    // toBeNull matches only null
    // toBeUndeined matches only undefined
    // toBeDefined matches the opposite of toBeUndefined
    // toBeTruthy matches anything that an if statement treats as true
    // toBeFalsy matches anything that an if statement treats as false.

test("Ensure Null Is Returned", ()=>{

    expect(functions.isNull()).toBeNull()
})
test("Ensure ballo Is Undefined", ()=>{

    expect(functions.isUndefined()).toBeUndefined()
})
test("Ensure user information is Rosh Shaar",()=>{

    expect(functions.createUser()).toEqual({
        firstName: 'Rosh',
        lastName: 'Shaar'
    })

})
//ARRAYS

test('Admin should be in usernames',()=>{

    usernames = ['john','karin','admin'];
    expect(usernames).toContain('admin');

})

