const crypto = require('crypto');

function Criptografar_Dados(Dados,ChaveCrypto){
    const cipher = crypto.createCipher('aes-256-cbc', ChaveCrypto);
    let Critografada = cipher.update(Dados, 'utf8', 'hex');
    Critografada += cipher.final('hex');
    return Critografada;
}

function Descriptografar_Dados(Dado_Critografado,ChaveCrypto){
    try{
        const decipher = crypto.createDecipher('aes-256-cbc', ChaveCrypto);
        let Descriptografado = decipher.update(Dado_Critografado, 'hex', 'utf8');
        Descriptografado += decipher.final('utf8');
        return Descriptografado;
    }catch(e){
        return null
    }
}

module.exports={
    Criptografar_Dados,
    Descriptografar_Dados,
}