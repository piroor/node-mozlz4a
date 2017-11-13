#!/usr/bin/env node
const fs     = require('fs');
const Buffer = require('buffer').Buffer;
const mozlz4a = require('mozlz4a');

var source = fs.readFileSync(process.argv[2])
var compressed = mozlz4a.compress(source);
var outfile = process.argv[3] || '-';
if (outfile == '-') {
  process.stdout.write(compressed);
}
else {
  fs.writeFileSync(outfile, compressed);
}
