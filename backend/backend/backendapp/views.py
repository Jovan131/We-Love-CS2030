from django.shortcuts import render
from django.http import JsonResponse
from .models import IG, Slot
from .serializers import IGSerializer, SlotSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET', 'POST'])
def ig_list(request):
    if request.method == 'GET':
        igs = IG.objects.all()
        serializer = IGSerializer(igs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = IGSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def slot_list(request):
    if request.method == 'GET':
        slots = Slot.objects.all()
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = SlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def ig_detail(request, name):
    try:
        ig = IG.objects.get(name=name)
    except IG.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = IGSerializer(ig)
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = IGSerializer(ig, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == "DELETE":
        ig.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'PUT', 'DELETE'])
def slot_detail(request, id):
    try:
        slot = Slot.objects.get(pk=id)
    except Slot.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = SlotSerializer(slot)
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = SlotSerializer(slot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == "DELETE":
        slot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)