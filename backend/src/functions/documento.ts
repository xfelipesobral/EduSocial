function verificaSeTodosDigitosIguais(documento: string): boolean {
    return documento.split('').every(digito => digito === documento[0])
}

export function validaCpf(cpf: string): boolean {
    const calculaDigitoVerificador = (inicio: number, fim: number): number => {
        let soma = 0
        let posicao = inicio

        for (let i = 0; i < fim; i++) {
            soma += parseInt(cpf[i]) * posicao
            posicao--
        }

        const resto = soma % 11
        return resto < 2 ? 0 : 11 - resto
    }

    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11) {
        return false
    }

    if (verificaSeTodosDigitosIguais(cpf)) {
        return false
    }

    const primeiroDigito = calculaDigitoVerificador(10, 9)
    const segundoDigito = calculaDigitoVerificador(11, 10)

    return primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10])
}

export function validaRg(rg: string) {
    const calculaDigitoVerificador = (rgSemDigito: string = rg.slice(0, 8)): number => {
        const pesos = [2, 3, 4, 5, 6, 7, 8, 9]
        let soma = 0

        for (let i = 0; i < rgSemDigito.length; i++) {
            soma += parseInt(rgSemDigito[i]) * pesos[i]
        }

        const resto = soma % 11
        return resto === 0 ? 1 : resto === 1 ? 0 : 11 - resto
    }

    rg = rg.replace(/[^\d]+/g, '')

    if (rg.length !== 9) {
        return false
    }

    if (verificaSeTodosDigitosIguais(rg)) {
        return false
    }

    const digitoVerificador = calculaDigitoVerificador()
    return digitoVerificador === parseInt(rg[8])
}

export function validaCnpj(cnpj: string) {
    cnpj = cnpj.replace(/\D+/g, '')

    const calculaDigito = (tamanhoCorte: number) => {
        const fatia = cnpj.slice(0, tamanhoCorte);
        let fator = tamanhoCorte - 7;
        let soma = 0;

        for (let i = tamanhoCorte; i >= 1; i--) {
        const n = parseInt(fatia.charAt(tamanhoCorte - i), 10);
        soma += n * fator--;
        if (fator < 2) fator = 9;
        }

        const resultado = 11 - (soma % 11);
        return resultado > 9 ? 0 : resultado;
    }

    if (verificaSeTodosDigitosIguais(cnpj)) {
        return false
    }

    if (cnpj.length !== 14) {
        return false
    }

    return cnpj.endsWith(`${calculaDigito(12)}${calculaDigito(13)}`)
}

export default function validaDocumento(documento: string): boolean {
    documento = documento.replace(/[^\d]+/g, '')   

    if (documento.length === 11) return validaCpf(documento)
    if (documento.length === 8) return validaRg(documento)
    
    return false
}