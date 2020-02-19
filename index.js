/*
    We operate under the assumption that everything that is passed to r() is in fact solvable.
    We know that we only want A valid solution not ALL valid solutions, thus working backwards will be a lot more efficient. NOTE: I tested both ways, and my hypothesis was correct.
*/
const readline = require('readline');
const rl = readline.createInterface({input : process.stdin, output : process.stdout});

(async _ =>{

    const rules = [];
    for(let i = 1; i < 4; i++){
        const temp = await question(`Rule ${i}?`);
        rules.push(temp.split` `);
    }

    const [depth, start, end] = (await question("Depth, start and end?")).split` `;
    console.log

    rl.close();

    console.time("Execution time");
    r(start,end,depth,rules);
})();

function getIndices(s, m){

    let indices = [];
    for(let i = 0; i < s.length; i++){

        if(s.substr(i, m.length) == m)
            indices.push(i);
    }
    return indices;
}

/*
    Note that here we want to make it LOOK like we are not working backwards, meaning that we wwant the user to input it as if the first argument was the starting value.
    f : finishing string
    c : current string
    n : depth of recursion
    steps : the steps taken to get to solution
*/
function r(f, c, n, rules, steps=""){

    //This is the exit condition, pretty self explanatory.
    if(c==f && n==0){
        res = steps;
        console.timeEnd("Execution time");
        const a = steps.split("\n").reverse();
        a.pop();
        console.log(a.join('\n'));
        process.exit(0);
    }
    //Even though we operate under the assumption that there will be a solution, we put this here so that the system doesn't use more ressources than it needs
    if(n==0){
        return;
    }

    //We go through the rules one by one and check if the value is found within
    let ruleIndex = 1;
    for(let [key, value] of rules){

        for(let index of getIndices(c, value)){

            const toUse = c.substring(0, index) + key + c.substring(index+value.length);
            //const temp = steps +"\n" + toUse + " -> " + c;
            const temp = steps + "\n" + ruleIndex + " " + (index+1) + " " + c; 

            r(f, toUse, n-1, rules, temp);
        }
        ruleIndex++;
    }
}
//Credits : Stefan Musarra
async function question (prompt) {
    const answer = await new Promise((resolve, reject) =>{
      rl.question(`${prompt}\n`, (answer) => {
        resolve(answer);
      });
    })
    return answer;
}