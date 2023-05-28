from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('ig-list/', views.ig_list),
    path('slot-list/', views.slot_list),
    path('ig/<str:name>', views.ig_detail),
    path('slot/<int:id>', views.slot_detail),
]