/*
    We operate under the assumption that everything that is passed to r() is in fact solvable.
    We know that we only want A valid solution not ALL valid solutions, thus working backwards will be a lot more efficient. NOTE: I tested both ways, and my hypothesis was correct.
*/
console.time('Execution time');
const rules = [

    ['BBA', 'AB'],
    ['AAB', 'BB'],
    ['A', 'AAB'],
];

function getIndices(s, m){

    let indices = [];
    for(let i = 0; i < s.length; i++){

        if(s.substr(i, m.length) == m)
            indices.push(i);
    }
    return indices;
}

// function r(c, f, n, steps=""){


//     if(c==f && n==0){
//         res = steps;
//         console.timeEnd("Execution time");
//         console.log(steps);
//         process.exit(0);
//     }
//     if(n==0){
//         return false;
//     }

//     for(let [key, value] of rules){

//         for(let index of getIndices(c, key)){

//             const toUse = c.substring(0, index) + value + c.substring(index+key.length);

//             const temp = steps + "\n" + c + " -> " + toUse;

//             if(r(toUse, f, n-1, temp))
//                 return true;
            
//         }
//     }
// }

/*
    Note that here we want to make it LOOK like we are not working backwards, meaning that we wwant the user to input it as if the first argument was the starting value.
    f : finishing string
    c : current string
    n : depth of recursion
    steps : the steps taken to get to solution
*/
function r(f, c, n, steps=""){

    //This is the exit condition, pretty self explanatory.
    if(c==f && n==0){
        res = steps;
        console.timeEnd("Execution time");
        const a = steps.split("\n").reverse();
        a.pop();
        console.log(a);
        process.exit(0);
    }
    //Even though we operate uner the assumption that there will be a solution, we put this here so that the system doesn't use more ressources than it needs
    if(n==0){
        return;
    }

    //We go through the rules one by one and check if the value is found within
    for(let [key, value] of rules){

        for(let index of getIndices(c, value)){

            const toUse = c.substring(0, index) + key + c.substring(index+value.length);
            const temp = steps +"\n" + toUse + " -> " + c;

            r(f, toUse, n-1, temp);
        }
    }
}

r('AAA', 'BAABBB', 12);