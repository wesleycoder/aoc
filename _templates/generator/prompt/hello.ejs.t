---
to: _templates/<%= name %>/<%= action || 'new' %>/<%= name %>.ejs.t
---
---
to: <%= name %>.js
---
const hello = ```
Hello!
This is your first prompt based hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
```

console.log(hello)
