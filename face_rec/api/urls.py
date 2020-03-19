from django.urls import path
from . import views

urlpatterns = [
    path('identities/', views.IdentityView.as_view(), name= 'identites_list'),
    path('uploads/', views.UploadView.as_view(), name= 'uploads_list'),
]