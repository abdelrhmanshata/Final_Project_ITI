"""
URL configuration for project_backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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

from django.contrib import admin
from django.urls import path, include
import user_authentication_app.views as views
from django.conf import settings
from .settings import *
from django.conf.urls.static import static

from user_authentication_app.views import LogoutView

urlpatterns = [
    path("", views.apiConnection, name="get_category"),
    path("admin/", admin.site.urls),
    path("user/", include("user_authentication_app.urls")),
    path("course/", include("courseListAPI.urls")),
    path("api/",include('payment_app.urls')),
    path("chatapi/",include('realtime_chat.urls')),
    path('review/', include('reviews.urls')),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
