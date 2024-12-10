from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from asgiref.sync import async_to_sync, sync_to_async
from rest.serializers import MessageSerializer
from hub.models import Hub, Message
from django.contrib.auth.models import User
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        if not self.channel_layer:
            print("Channel layer is not configured!")
            await self.close()
            return

        await self.accept()

        self.hub_name = self.scope['url_route']['kwargs']['hub_name']
        self.hub_group_name = f"hub_{self.hub_name}"

        # Join the hub group
        await self.channel_layer.group_add(
            self.hub_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        # Leave the hub group
        await self.channel_layer.group_discard(
            self.hub_group_name,
            self.channel_name
        )


        # await self.accept()

    async def receive(self, text_data):
            text_data_json = json.loads(text_data)
            print("FREEEEEEEEEEEEEEEEEEEEEEED" , self.scope["user"])
            user = await sync_to_async(User.objects.get)(username=self.scope["user"])
            # user = self.scope["user"]  # Assuming authenticated user is available
            hub_name = text_data_json["hub"]
            content = text_data_json["content"]

            # Ensure the hub exists asynchronously
            hub = await sync_to_async(Hub.objects.get)(name=hub_name)

            # Save the message to the database
            new_message = await sync_to_async(Message.objects.create)(
                hub=hub, user=user, content=content
            )

            # Serialize the saved message
            serialized_message = await sync_to_async(MessageSerializer)(new_message)
            message_data = serialized_message.data

            # Broadcast the message to the group
            await self.channel_layer.group_send(
                self.hub_group_name,
                {
                    'type': "chat_message",
                    'hub': hub.name,
                    'user': user.username,
                    'content': content,
                    'created_at': message_data["created_at"],
                }
            )
    async def chat_message(self, event):
        # Send the message to WebSocket
        print("!!!!!!!!!!!!!", event)
        await self.send(text_data=json.dumps({
            'user': event['user'],
            'content': event['content']
        }))
