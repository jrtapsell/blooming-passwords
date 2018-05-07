const bf = require("./bloomLibrary");
const crypto = require('crypto');

const bloom2 = bf.readFromFile();

function lookupPassword(password) {
    const hash = crypto
      .createHash('sha1')
      .update(password)
      .digest("hex")
      .toUpperCase();

    return lookupHash(hash)
}

function lookupHash(hash) {
    return bloom2.test(hash);
}

module.exports = {
    lookupHash,
    lookupPassword
};