"""
URL configuration for mesa project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework import routers

from django.contrib import admin
from django.urls import path, include
from homepage import views as homepageViews
from rest import views as restViews
from django.urls import re_path
from rest import views

router = routers.DefaultRouter()
# router.register(r'users', restViews.UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path("", homepageViews.index, name="index"),
    path("rest/", include(router.urls)),
    path('api_auth/', include("rest_framework.urls", namespace="rest_framework")),
    path("", include("frontend.urls")),
    re_path("account_creation/", views.signup),
    re_path("login/", views.login),
    re_path("gethubs", views.list_user_hubs),
    re_path("getspecifichub", views.list_specific_hub),
    re_path("postMessage", views.post_Message_To_Hub)
]

urlpatterns += router.urls