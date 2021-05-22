
How to use:

Install dependencies with 'yarn' if not running inside the dev container
Run e2e tests with 'yarn test:e2e', tests are basic but important to make sure the actual API is useful 
Run unit tests with 'yarn test'. these tests go deeper into the correctnes of the LRU. 
Start the server in production with 'yarn start' or for development with 'yarn dev'

TODO:
ship!
add support for ttl on top of lru
add locking to make lru cache thread safe
add the ability to use async getter functions when calling getOrSet (cache calls getter, if the return value is a promise it is awaited) 
replace the lionked list with a cache oblivious data structure to improve performance

DONE:

build an in memory lru cache. 
expose cache interface via http 

