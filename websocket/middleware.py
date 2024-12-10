# your_app/middleware.py
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs

class QueryAuthMiddleware:
    """
    Custom middleware to authenticate users using a token passed in the WebSocket URL query string.
    """
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope["query_string"].decode()
        query_params = parse_qs(query_string)
        token_key = query_params.get("token", [None])[0]

        if token_key:
            try:
                token = await database_sync_to_async(Token.objects.get)(key=token_key)
                scope["user"] = token.user
            except Token.DoesNotExist:
                scope["user"] = AnonymousUser()
        else:
            scope["user"] = AnonymousUser()

        return await self.inner(scope, receive, send)