const crypto = require('crypto');

ChaveDeCriptografia='0123'

function Criptografar_Dados(Dados){
    const cipher = crypto.createCipher('aes-256-cbc', ChaveDeCriptografia);
    let Critografada = cipher.update(Dados, 'utf8', 'hex');
    Critografada += cipher.final('hex');
    return Critografada;
}

function Descriptografar_Dados(Dado_Critografado){
    const decipher = crypto.createDecipher('aes-256-cbc', ChaveDeCriptografia);
    let Descriptografado = decipher.update(Dado_Critografado, 'hex', 'utf8');
    Descriptografado += decipher.final('utf8');
    return Descriptografado;
}

module.exports={
    Criptografar_Dados,
    Descriptografar_Dados,
}