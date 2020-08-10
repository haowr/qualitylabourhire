//PASSING TEST
const functions = {

    add: (num1,num2)=> num1 + num2,
    addFail: (num1,num2)=> num1 + num2 +1,
    isNull: ()=>null,
    isUndefined: ()=> {
        const ballo = undefined;
        return ballo
    },
    createUser: ()=>{

        const user = {
            firstName :'Rosh'
        }
        //SYTAX TO ADD TO AN OBJECT
        user['lastName'] = 'Shaar';
        return user;

    }
    


}
//FAILING TEST
const functions2 = {

    add: (num1,num2)=> num1 + num2 +1,
    


}
module.exports = functions;