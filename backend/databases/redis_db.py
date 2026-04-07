from redis_om import get_redis_connection

redis_sync = get_redis_connection( # for messaging system
    host="redis-local",
    port=6379,
    decode_responses=True
)