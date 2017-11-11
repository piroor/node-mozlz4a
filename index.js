const Buffer = require('buffer').Buffer;
const LZ4    = require('lz4');

const MAGIC_NUMBER = new Uint8Array(
  'mozLz40'.split('')
    .map(function(c) { return c.charCodeAt(0); })
    .concat([0])
);
const SIZE_HEADER_BYTES = 4;

exports.decompress = function(compressed) {
  var sizePart = new Uint8Array(compressed)
                  .slice(MAGIC_NUMBER.byteLength, MAGIC_NUMBER.byteLength + SIZE_HEADER_BYTES);
  var sizeBuffer = new ArrayBuffer(SIZE_HEADER_BYTES);
  var sizeView   = new Uint8Array(sizeBuffer);
  for (var i = 0; i < SIZE_HEADER_BYTES; i++) {
    sizeView[i] = sizePart[i];
  }
  var decompressedBufferSize = new DataView(sizeBuffer).getUint32(0, true);

  compressed = compressed.slice(MAGIC_NUMBER.byteLength + SIZE_HEADER_BYTES, compressed.length);
  var decompressed = Buffer.alloc(decompressedBufferSize);
  var decompressedSize = LZ4.decodeBlock(compressed, decompressed);

  return decompressed.slice(0, decompressedSize);
};

exports.compress = function(content) {
  content = Buffer.from(content);
  var compressed     = new Buffer(LZ4.encodeBound(content.length));
  var compressedSize = LZ4.encodeBlock(content, compressed);
  compressed = compressed.slice(0, compressedSize);

  var magicNumber = Buffer.from(MAGIC_NUMBER);

  var size     = new ArrayBuffer(4);
  var sizeView = new DataView(size);
  sizeView.setUint32(0, content.byteLength, true);
  size = Buffer.from(size);

  return Buffer.concat(
    [magicNumber, size, compressed],
    magicNumber.byteLength + size.byteLength + compressed.byteLength
  );
};
