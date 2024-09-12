class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['macaco', 'macaco', 'macaco'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: ['gazela'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['leao'] }
        ];

        this.animais = {
            leao: { tamanho: 3, bioma: ['savana'] },
            leopardo: { tamanho: 2, bioma: ['savana'] },
            crocodilo: { tamanho: 3, bioma: ['rio'] },
            macaco: { tamanho: 1, bioma: ['savana', 'floresta'] },
            gazela: { tamanho: 2, bioma: ['savana'] },
            hipopotamo: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const tamanhoNecessario = this.animais[animal].tamanho * quantidade;
        const biomasPermitidos = this.animais[animal].bioma;

        let recintosViaveis = [];

        this.recintos.forEach(recinto => {
            const espacoOcupado = recinto.animaisExistentes.reduce((total, animalExistente) => {
                return total + (this.animais[animalExistente]?.tamanho || 0);
            }, 0);

            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

            if (biomasPermitidos.includes(recinto.bioma) && espacoLivre >= tamanhoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

const zoo = new RecintosZoo();

console.log(JSON.stringify(zoo.analisaRecintos('macaco', 2), null, 2));
console.log(JSON.stringify(zoo.analisaRecintos('unicornio', 1), null, 2));
console.log(JSON.stringify(zoo.analisaRecintos('gazela', -1), null, 2));
