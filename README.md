# node-mozlz4a

Library to operate Mozilla Firefox's compressed files (jsonlz4 etc.)

Spec of the format is described at [Firefox's source code](https://dxr.mozilla.org/mozilla-central/rev/2535bad09d720e71a982f3f70dd6925f66ab8ec7/toolkit/components/lz4/lz4.js#54)

## Usage

```javascript
var mozlz4a = require('mozlz4a');

var compressed = fs.readFileSync('sessionstore.jsonlz4');
var content = mozlz4a.decompress(compressed); // returns a Buffer
var sessions = JSON.parse(content.toString('UTF-8'));

...

var updatedContent = Buffer.from(JSON.stringify(sessions));
var compressed = mozlz4a.compress(updatedContent); // requires Buffer, returns Buffer
fs.writeFileSync('sessionstore.jsonlz4.updated', compressed);
```
