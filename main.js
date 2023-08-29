// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory (number, dna) {
  return {
    number,                                               // new intance of newAequor is created
    dna,
    mutate(){
      const randIndex = Math.floor(Math.random() * this.dna.length)
      let newBase = returnRandBase()
      while(this.dna[randIndex] === newBase){
        newBase = returnRandBase()
      }
      const newDna = [...dna]
      newDna[randIndex] = newBase
      return newDna
    },
    compareDNA(mutatedDna){                                 // comparison between pAequor instance
      let similarities = 0                                  // and mutated instance
      for(let i = 0; i < dna.length; i++){
        dna[i] === mutatedDna[i] ? similarities++ : null
      }
      return `specimen #1 and specimen #2 have ${(similarities / dna.length) * 100}% DNA in common`
    },
    willLikelySurvive(){              // function to check if 'C' and 'G' are present in proportions over 60%    
      return dna.filter((i)=> i === 'C' || i === 'G').length/dna.length * 100 > 60 ? true : false
    }
  }
}

const newAequor = pAequorFactory(5, mockUpStrand()) 
const mutatedAequor = {  
  ...newAequor,
  dna: newAequor.mutate()         // mutated the existing instance and asigned to a new object
}
    
function survivingAequors(){      // function to create 30 pAequors most like to survive
  let survivors = []
  let notSurvivors = []
  for (let i = 0; survivors.length < 30; i++){
    const testAq = pAequorFactory(i, mockUpStrand())
    testAq.willLikelySurvive() === true ? survivors.push(testAq) : notSurvivors.push(testAq)
  }
  return survivors
}
console.log(survivingAequors())