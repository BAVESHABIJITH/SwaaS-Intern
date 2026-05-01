// // let num : number = 7;
// // console.log(num);


// // let userName : string = "Baveshabijith";
// // console.log(userName);


// // let isDone : boolean = true;
// // console.log(isDone);

// // let name : string = "";
// // console.log(typeof name);
// // // let price : number = 100.99;
// // // console.log(typeof price);
// // // console.log(typeof num);
// // // console.log(typeof userName);
// // // console.log(price);
// // // console.log(typeof isDone);
// // // console.log(isDone);


// // type ID = number | string;

// // let uID1 : ID = 101;
// // let uID2 : ID = "A301";
// // console.log(typeof uID1);
// // console.log(typeof uID2);

// enum operation{
//     True,
//     False
// };

// let op = operation.True;
// console.log(op);
// console.log(operation[op]);

// function throwError(){
//     throw new Error("Stopped");
// }

// function fun() : never{
//     try{
//         while(true){
//         console.log("Hey...");
//     }
//     }
//     catch(error : any){
//         throwError();
//     }
// }
// fun();

function add(a : number,b : number) : number{
    return a+b;
}

console.log(add(1,2));