# node-mozlz4a

Library to operate Mozilla Firefox's compressed files (jsonlz4 etc.)

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
