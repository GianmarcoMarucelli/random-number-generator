import { json } from "stream/consumers";

function RNGDec(min: number, max: number, precision: number) {
    const stringErr: string = `il numero di precision '${precision}' deve essere un numero intero positivo diverso da 0!!`; 
    if(Math.sign(precision) != 1) {
        throw new Error(stringErr);
    }else if(!Number.isInteger(precision)) {
        throw new Error(stringErr);        
    }
    const rng = Math.random();
    let app = (rng * (max - min) + min).toPrecision(precision + 1);
    return app;
}

function RNG(min: number , max: number) {
    const rng = Math.random();
    return Math.trunc(rng * (max - min) + min);
}

function RNGSequence(len: number, min: number, max: number): number[] { 

    if ( len > max - min) {
        throw new Error(`non posso trovare ${len} numeri tra ${min} e ${max}`);
    }
    const res: number[] = [];
    while (res.length < len) {
        const rn = RNG(min, max);
        if (res.includes(rn)) {
            continue
        }
    res.push(rn); 
    }
    return res;
}

function createRuota(ruotaname: string, estrazioni: number[]) {
    const ruotadiv = document.createElement("div");
    ruotadiv.className = `ruota ${ruotaname.toLowerCase()}`;
    const nameh2 = document.createElement("h2");
    nameh2.innerText = ruotaname;
    nameh2.className = "ruota-titolo";
    ruotadiv.appendChild(nameh2);

for (const numb of estrazioni) {
    const numbP = document.createElement("p");
    numbP.innerText = "" + numb;
    const numbDiv = document.createElement("div");
    numbDiv.className = "ruota-estrazione";
    numbDiv.appendChild(numbP);
    ruotadiv.appendChild(numbDiv);
    }
    return ruotadiv;
}
const ruote = [
    'BARI',
    'CAGLIARI', 
    'FIRENZE', 
    'GENOVA', 
    'MILANO', 
    'NAPOLI', 
    'PALERMO',       
    'ROMA',         
    'TORINO',      
    'VENEZIA',      
    'NAZIONALE',];

const estrazioni: { 
    [ruota: string]: number[] 
} = {};

for(const ruota of ruote) {
    const estrazione = RNGSequence(5, 1, 91);
    estrazioni[ruota] = estrazione;
}
console.log();

const container = document.getElementById("cnt");
 if (container) {
     const pre = document.createElement("pre");
     for (const ruota of ruote) {
         const ruotaEstrazioni = estrazioni[ruota]
         const ruotadiv = createRuota(ruota, ruotaEstrazioni);
         container.appendChild(ruotadiv);
     }
     
 }
