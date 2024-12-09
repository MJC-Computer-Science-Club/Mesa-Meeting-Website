from django.contrib import admin
from .models import Hub, HubMembership, Message

# Register your models here.
admin.site.register(Hub)
admin.site.register(HubMembership)
admin.site.register(Message)