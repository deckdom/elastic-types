# ElasticSearch Types

TypeScript Typings for all Queries, Aggregations, Requests and Responses
to easily work with it, without the guess work!

## Installation

Simply install it as a dev-dependency with your preferred package-manager:

```sh
npm i -D elastic-types
yarn add -D elastic-types
```

Then import the Types you need and easily stick your queries together!

```typescript
import { TermQuery } from 'elastic-types';

const validQuery: TermQuery = {
    term: {
        value: 'some cool text',
    }
};

const invalidQuery: TermQuery = {
    term: {
        value: ['arrays', 'are', 'invalid']
    }
};
```