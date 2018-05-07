const bf = require("bloomfilter");
const fs = require("fs");

const SETTINGS = {
    BLOOM_SIZE: 4e9,
    BLOOM_HASHES: 6
};

const nullCallback = () => {};

function writeToFile(bloom) {
    const arrayBuffer = bloom.buckets;
    const blob        = Buffer.from(arrayBuffer.buffer);
    fs.writeFile("bloom.dat", blob, nullCallback);
}

function readFromFile() {
    const blob = fs.readFileSync("bloom.dat");

    let array = new Uint32Array(blob.buffer);
    return new bf.BloomFilter(array, SETTINGS.BLOOM_HASHES);
}

function newBloom() {
    return new bf.BloomFilter(
      SETTINGS.BLOOM_SIZE,
      SETTINGS.BLOOM_HASHES
    );
}

module.exports = {
    writeToFile,
    readFromFile,
    newBloom
};