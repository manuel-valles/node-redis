# What is Redis?

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

## Main Redis Commands

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
-
