from django.urls import path
from logic import views


urlpatterns=[
    path('api/register/',views.farmer_register),
    path('api/login/',views.farmer_login),
    #Buyer
    path('api/buyer-register/',views.buyer_registration),
    path('api/buyer-login/',views.buyer_login)

]