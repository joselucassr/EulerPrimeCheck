const fs = require('fs');
const readline = require('readline');

const primeEuler = async () => {
  let primeArray = [];
  async function processLineByLine() {
    const fileStream = fs.createReadStream('primes-to-100k.txt');
    // const fileStream = fs.createReadStream('primes-to-11.txt');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      primeArray.push(parseInt(line));
    }
  }

  await processLineByLine();

  let sumList = {};

  let boolCheck = true;
  for (let i = 0; i < primeArray.length; i++) {
    let p = primeArray[i];
    sumList[p] = [];
    for (let x = i + 1; i < primeArray.length; x++) {
      let q = primeArray[x];

      if (p === undefined || q === undefined) break;

      const Phi = (p, q) => {
        return (p - 1) * (q - 1);
      };

      let phiRes = Phi(p, q);

      let checkSum = p + q;

      let resSum = -phiRes + p * q + 1;

      sumList[p].push(resSum);
      if (checkSum !== resSum) boolCheck = false;
    }
  }
  console.log(boolCheck);

  // Print the list for manual check
  // console.log(sumList);
};

primeEuler();
