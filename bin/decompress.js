#!/usr/bin/env node
const fs     = require('fs');
const Buffer = require('buffer').Buffer;
const mozlz4a = require('mozlz4a');

var source = fs.readFileSync(process.argv[2])
var decompressed = mozlz4a.decompress(source);
var outfile = process.argv[3] || '-';
if (outfile == '-') {
  process.stdout.write(decompressed);
}
else {
  fs.writeFileSync(outfile, decompressed);
}
