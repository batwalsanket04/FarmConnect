from django.urls import path
from logic import views


urlpatterns=[
    path('api/register/',views.farmer_register),
    path('api/login/',views.farmer_login)
]