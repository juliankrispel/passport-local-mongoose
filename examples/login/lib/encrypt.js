var crypto = require('crypto'),
    assert = require('assert');
    algorithm = 'aes256',

module.exports.encrypt = function(key, value){
    key = new Buffer(key);
    value = new Buffer(value);
    var cipher = crypto.createCipher(algorithm, key);  
    return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
}

module.exports.decrypt = function(decrypted, key){
    key = new Buffer(key);
    var decipher = crypto.createDecipher(algorithm, key);
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}
