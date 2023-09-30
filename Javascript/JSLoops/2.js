// #2 Condicionales avanzados
const alumns = [
    {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
		{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
		{name: 'Juan Miranda', T1: false, T2: true, T3: true},
		{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
		{name: 'Raquel Benito', T1: true, T2: true, T3: true}
]

for (let a = 0; a < alumns.length; a++) {
    const claves = Object.keys(alumns[a]);
    const valores = Object.values(alumns[a]);
    aprobados = 0
    for (let b = 0; b < claves.length; b++) {
    // console.log(`${claves[b]}: ${valores[b]}`);
        valores[b] == true ? aprobados++ : null;
    // console.log(aprobados)
    }
    aprobados >= 2 ? alumns[a].isApproved = true : alumns[a].isApproved = false;
}
console.log(alumns)
