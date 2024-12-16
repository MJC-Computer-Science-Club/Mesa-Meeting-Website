from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from asgiref.sync import async_to_sync, sync_to_async
from rest.serializers import MessageSerializer
from hub.models import Hub, Message, HubChannel
from django.contrib.auth.models import User
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if not self.channel_layer:
            print("Channel layer is not configured!")
            await self.close()
            return
        

        self.hub_channel_name = self.scope['url_route']['kwargs']['channel_id']
        self.hub_group_name = f"channel_{self.hub_channel_name}"

        print(f"Connecting to group: {self.hub_group_name}")
        print(f"Channel name: {self.hub_channel_name}")

        # Join the hub group
        await self.channel_layer.group_add(
            self.hub_group_name,
            self.channel_name
        )

        await self.accept()

        print(f"Added {self.hub_channel_name} to group {self.hub_group_name}")

    async def disconnect(self, close_code):
        print("DISCONNECTED!!!!!!!!!!!!!1")
        await self.channel_layer.group_discard(
            self.hub_group_name,
            self.channel_name
        )


        # await self.accept()

    async def receive(self, text_data):
            text_data_json = json.loads(text_data)
            print(text_data_json)
            user = await sync_to_async(User.objects.get)(username=self.scope["user"])
            # user = self.scope["user"]  # Assuming authenticated user is available
            channel_name = text_data_json["channel"]
            content = text_data_json["content"]

            # Ensure the hub exists asynchronously
            mchannel = await sync_to_async(HubChannel.objects.get)(id=channel_name)

            # Save the message to the database
            new_message = await sync_to_async(Message.objects.create)(
                hubChannels=mchannel, user=user, content=content
            )

            # Serialize the saved message
            serialized_message = await sync_to_async(MessageSerializer)(new_message)
            message_data = serialized_message.data

            await self.channel_layer.group_send(
                self.hub_group_name,
                {
                    'type': "chat.message",
                    'hubChannels': mchannel.id,
                    'user': user.username,
                    'content': content,
                    'created_at': message_data["created_at"],
                }
            )
            print("Broadcasted!")

    async def chat_message(self, event):
        # Send the message to WebSocket
        print("sent!")
        await self.send(text_data=json.dumps({
            'hubChannels': event.get('channel_id'),
            'user': event['user'],
            'content': event['content']
        }))
