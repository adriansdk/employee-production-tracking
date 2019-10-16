import data from "../seed/seeds.json";

//std, sum, mean average, maximum, minumum, 

console.log(data)

let bigArr = []


for (let i = 0; i < data.length; i++) {
    let horasSum = 0;
    let horas = data[i].horas
    for (let j = 0; j < horas.length; j++) {
        horasSum += horas[j]
    }
    let averageHoras = horasSum / horas.length
    horas.push(horasSum, averageHoras)
    horas.unshift(data[i].funcionario)
    bigArr.push(data[i].horas)
}

let x = 1;
while (x < 3) {
    let sum = 0;
    for (let a = 0; a < bigArr.length; a++) {
        console.log(bigArr[a])
        console.log(bigArr[a][x])
        sum += bigArr[a][x]
    }
    bigArr.push(sum)
    x++
}

console.log(bigArr)
