// import pkg from 'enquirer';
// const { Input } = pkg;

// export async function prompt(m,i){
//     const prompt = new Input({
//     message: m,
//     initial: i
//     });
//     let answer_
//     await prompt.run()
//     .then((answer => {answer_= answer}))
//     .catch(console.log);
//     return answer_
// }


let test = [1,2,3];
let test2 = [1,2,3,4];

export function compareMult(promptAnswers,rightAnswers){
    for(let i= 0;  i<= rightAnswers.length; i++){
        if(promptAnswers[i] != rightAnswers[i])
        {
            return false
        }
    }
    return true
}
