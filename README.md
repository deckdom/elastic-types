[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fsinexist%2Felastic-types%2Fbadge%3Fref%3Dmaster&style=for-the-badge)](https://github.com/SiNEXiST/elastic-types/actions)
[![Release Version](https://img.shields.io/github/release/sinexist/elastic-types.svg?style=for-the-badge)](https://www.npmjs.com/package/elastic-types)
[![License](https://img.shields.io/github/license/sinexist/elastic-types.svg?style=for-the-badge)](https://github.com/sinexist/elastic-types/blob/master/LICENSE)

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
import { TermQuery } from 'elastic-types/queries';

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