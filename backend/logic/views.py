from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import Farmer
from .serializer import FarmerSerializer
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt


@api_view(['POST'])
def farmer_register(request):
    data = request.data

    if Farmer.objects.filter(f_email=data.get('f_email')).exists():
        return Response({"error": "Email already exists"}, status=400)

    if not data.get('f_password'):
        return Response({"error": "Password required"}, status=400)

    data['f_password'] = make_password(data.get('f_password'))

    serializer = FarmerSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Registered successfully"}, status=201)

    return Response(serializer.errors, status=400)

@api_view(['POST'])
@csrf_exempt
def farmer_login(request):
    email=request.data.get('f_email')
    password=request.data.get('f_password')

    try:
        user=Farmer.objects.get(f_email=email)
    except Farmer.DoesNotExist:
        return Response({"error":"user not found "},status=404)
    
    if not check_password(password,user.f_password):
        return Response({"error":"Invalid Password"},status=400)
    
    refresh=RefreshToken.for_user(user)

    return Response({
        "message":"Login Successfully...",
        "access":str(refresh.access_token),
        "refresh":str(refresh)
    })