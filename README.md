# Node App with Redis

A Simple Management App with Redis. It includes an introduction to Redis and Redis caching.

## What is Redis?

- Open source in-memory data structure store which can be used as a database and/or cache and message broker;
- NoSQL Key/Value Store;
- Supports Multiple Data Structures;
- Built In Replication;
- https://redis.io/

## Advantages of Redis

- Very flexible;
- No Schemas & Column Names;
- Very fast: Can perform around 110,000 SETs per second, and about 81,000 GETs per second;
- Rich Datatype Support;
  Caching & Disk Persistence.

## Redis Data Types

- Strings
- Lists
- Sets
- Sorted Sets
- Hashes (key-value pair)
- Bitmaps
- Hyperlogs
- Geospatial Indexes
- https://redis.io/topics/data-types

## Redis & Security

- Designed to be accessed by trusted clients;
- Do not allow external access / Internet exposure;
- Simple authentication can be setup;
- Can be restricted to certain interfaces;
- Data encryption not supported.

## Installation for Windows (Docker)

- `$ docker pull redis`
- Run an instance of Redis in our local machine: `$ docker run -d -p 6379:6379 --name redis1 redis`
- Check that the Redis container is running: `$ docker ps`
- Check some logs: `$ docker logs redis1`
- Run the CLI: `$ docker exec -it redis1 sh` & after the new hashtag type: `redis-cli`

```
  # redis-cli
  127.0.0.1:6379>
```

- Classic start command: `ping` --> `PONG`

## Redis Commands

### 1. Basic (Strings)

- `ECHO 'Hello World!'` -> `"Hello World"`
- `SET foo 100` -> `OK`
- `GET foo` -> `"100"`
- `INCR foo` -> `(integer) 101`
- `DECR foo` -> `(integer) 100`
- `EXISTS foo` -> `1`
- `EXISTS foo1` -> `0`
- `DEL foo` -> `(integer) 1`
- `GET foo` -> `(nil)`
- Clear all: `FLUSHALL` -> `OK`
- `SET server:name someserver` -> `OK`
- `GET server` -> `(nil)`
- `GET server:name` -> `"someserver"`
- Set an expiration date for a variable:
  - Set and expiry separately:
    - `SET greeting "Hello World"`
    - `EXPIRE greeting 50`
  - Set and expiry together: `SETEX greeting 40 "Hello World"`
  - `TTL greeting` returns the seconds left. Once it's achieved it will return -> `-2` & `(nil)` for the GET.
- Remove the expiration:
  - `PERSIST greeting` -> (integer) 1
  - `TTL greeting` -> (integer) -1
  - `GET greeting` -> "Hello World"
- Set multiple key-value pairs: `MSET key1 "Hello" key2 "World"`
- Append: `APPEND key1 " World"`
- Rename a key: `RENAME key1 greeting`

### 2. List

**Redis Lists** are simply lists of strings, sorted by insertion order. It is possible to add elements to a Redis List pushing new elements on the head (on the **left**) or on the tail (on the **right**) of the list.

- Create and add a value to the list:
  - At the beginning:
    `LPUSH people "David"` -> (integer) 1
    `LPUSH people "Manu"` -> (integer) 2
  - At the end:
    `RPUSH people "Devon"` -> (integer) 3
- Return the full list: `LRANGE people 0 -1` -> 1) "Manu" 2) "David" 3) "Devon"
- Length of the list: `LLEN people`
- Remove the first/left element of the list: `LPOP people` -> "Manu"
- Remove the last/right element of the list: `RPOP people` -> "Devon"
- Insert an element between two elements of a list: `LINSERT people BEFORE "David" "Mary"`

### 3. Sets

**Redis Sets** are an unordered collection of Strings. It is possible to add, remove, and test for existence of members in O(1) (constant time regardless of the number of elements contained inside the Set). They have the desirable property of not allowing repeated members.

- `SADD cars "Ford"` -> (integer) 1
- `SADD cars "Honda"` -> (integer) 1
- `SADD cars "BMW"` -> (integer) 1
- Check if it's a member of a set: `SISMEMBER cars "Ford"` -> 1 ; `SISMEMBER cars "Seat"` -> 0
- Returns all the members of a set: `SMEMBERS cars` -> 1) "BMW" 2) "Honda" 3) "Ford"
- How many members a set has: `SCARD cars` -> 3
- Move a member from a set to another (this will be created if it doesn't exist): `SMOVE cars mycars "Ford"` -> 1
  - `SMEMBERS cars` -> 1) "BMW" 2) "Honda"
  - `SMEMBERS mycars` -> 1) "Ford"
- Remove a member from a set: `SREM cars "BMW"` -> 1
  - `SMEMBERS cars` -> 1) "Honda"

### 4. Sorted Sets

**Redis Sorted Sets** are, similarly to Redis Sets, non repeating collections of Strings. The difference is that every member of a Sorted Set is associated with score, that is used in order to take the sorted set ordered, from the smallest to the greatest score. While members are unique, scores may be repeated.

- `ZADD users 1985 "Manu Kem"` -> 1
- `ZADD users 1987 "David Smith"` -> 1
- `ZADD users 1986 "Devon Fritz"` -> 1
- Get the position of the member: `ZRANK users "David Smith"` -> 1 //index 0
- Get the full set: `ZRANGE users 0 -1` -> 1) "Devon Fritz" 2) "Manu Kem" 3) "David Smith"
- Increment one or more the score of a member: `ZINCRBY users 1 "Manu Kem"` -> 1986

### 5. Hashes

**Redis Hashes** are maps between string fields and string values, so they are the perfect data type to represent objects (e.g. A User with a number of fields like name, surname, age, and so forth

- `HSET user:manu name "Manu Kem"` -> 1
- `HSET user:manu email "manukem@gmail.com"` -> 1
- `HGET user:manu email` -> "manukem@gmail.com"
- `HGETALL user:manu` -> 1) "name" 2) "Manu Kem" 3) "email" 4) "manukem@gmail.com"
- Set multiple values: `HMSET user:mar name "Mar Sans" email "marsans@gmail.com" age "25"` -> OK
- Get all the keys: `HKEYS user:mar` -> 1) "name" 2) "email" 3) "age"
- Get all the values: `HVALS user:mar` -> 1) "Mar Sans" 2) "marsans@gmail.com" 3) "25"
- Increment one or more a value: `HINCRBY user:mar age 2` -> 27
- Delete a key-value: `HDEL user:manu age` -> 1
- Number of key-value pairs that a Hash has: `HLEN user:mar` -> 3

## Redis Persistence

Redis provides a different range of persistence options:

- The RDB persistence performs point-in-time snapshots of your dataset at specified intervals.
- The AOF persistence logs every write operation received by the server, that will be played again at server startup, reconstructing the original dataset. Commands are logged using the same format as the Redis protocol itself, in an append-only fashion. Redis is able to rewrite the log in the background when it gets too big.
- If you wish, you can disable persistence completely, if you want your data to just exist as long as the server is running.
- It is possible to combine both AOF and RDB in the same instance. Notice that, in this case, when Redis restarts the AOF file will be used to reconstruct the original dataset since it is guaranteed to be the most complete.

More Info: https://redis.io/topics/persistence

## Redis Node Cache

1. Create the dependencies:

   - `$ npm i express node-fetch redis method-override`
   - `$ npm i -D nodemon`
   - **method-override** allows us to use HTTP verbs such as PUT or DELETE in forms:
     ```js
     app.use(methodOverride('_method'));
     ```
     ```html
     <form
       method="POST"
       action="/user/delete/{{user.id}}?_method=DELETE"
     ></form>
     ```

2. Set data to Redis with expiration as the data can change: `client.setex(username, 3600, repos);` // (_key, seconds, data_)

   - Example request: `http://localhost:5000/repos/manukempo` -> manukempo has _79_ Github repos
   - Storing result:

     - `$ docker exec -it redis1 sh`
     - `# redis-cli`
     - `127.0.0.1:6379> get manukempo` -> "79"

     ![loadingTimeNoCache](/redis-node-cache/images/loadingTimeNoCache.jpg)

3. Create a piece of _middleware_ to cache the values:

   ```js
   app.get('/repos/:username', cache, getRepos);
   ```

   ![loadingTimeCacheMiddleware](/redis-node-cache/images/loadingTimeCacheMiddleware.jpg)

## Node App with Redis

1. Create the dependencies:

   - `$ npm i express redis express-handlebars`
   - `$ npm i -D nodemon`

2. UI:

   - Free themes for Bootstrap: https://bootswatch.com/
   - https://getbootstrap.com/docs/4.0/examples/starter-template/

3. Create the first users locally:

   - `HMSET user001 first_name "Manu" last_name "Kem" email "manukem@gmail.com" phone "44-123456789"`
   - `HMSET user002 first_name "Mar" last_name "Sans" email "marsans@gmail.com" phone "44-123456790"`

**IMPORTANT:** We need `express.json()` and `express.urlencoded()` for _POST_ and _PUT_ requests, because we are sending data (in the form of some data object) to the server and we are asking the server to accept or store that data, which is enclosed in the body (i.e. req.body). If _extended_ is **false**, you can NOT post "nested objects".
