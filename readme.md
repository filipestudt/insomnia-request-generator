# insomnia-request-generator

> Generate a .json file to be imported on Insomnia with all application routes and parameters

## Usage

```
npm install insomnia-request-generator
```

```js
var userRoutes = require('./src/routes/user-route');
app.use('/routes', userRoutes);

// Use after all routes are loaded
// After used once to generate the routes.json file this lines could be removed

const insomniaRequestGenerator = require('insomnia-request-generator');
insomniaRequestGenerator(app);
```