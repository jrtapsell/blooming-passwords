const BLOOM = require("./bloomLibrary");

bloom = BLOOM.newBloom();


const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('/mnt/27a29e63-f36c-4b5d-a9f7-a65986205bc9/pwned/pwned-passwords-2.0.txt')
});

let lines = 0;
lineReader.on('line', function (line) {
    const parts = line.split(":");
    bloom.add(parts[0]);
    lines++;
});

const interval = setInterval(() => {
    console.log(lines)
}, 1000);

// Add some elements to the filter.
//bloom.add("foo");
//bloom.add("bar");

// Test if an item is in our filter.
// Returns true if an item is probably in the set,
// or false if an item is definitely not in the set.

lineReader.on("close", function () {
    clearInterval(interval);
    BLOOM.writeToFile(bloom);
});
