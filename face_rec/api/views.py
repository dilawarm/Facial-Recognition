from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import IdentitySerializer
from .models import Identity
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import face_recognition
import os
import cv2
import numpy as np
import pickle

class IdentityView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Identity.objects.all()
        serializer = IdentitySerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = IdentitySerializer(data=request.data)
        if posts_serializer.is_valid():
            name = request.data["name"]
            filename = request.data["image"]
            posts_serializer.save()
            feed_ai(name, filename)
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def homepage(request):
    options = ["Create identity", "Find identity"]
    return Response(status=status.HTTP_200_OK, data={"data": options})

def feed_ai(name, filename):
    try:
        known_faces = pickle.load(open("api/data/known_faces.pkl","rb"))
        known_identities = pickle.load(open("api/data/known_identities.pkl","rb"))
    except EOFError:
        known_faces = []
        known_identities = []
    
    print(known_faces)
    print(known_identities)
    img = face_recognition.load_image_file(f"media/post_images/{filename}")
    img_encoded = face_recognition.face_encodings(img)[0] # We assume that there is only one face of identity per image.
    known_faces.append(img_encoded)
    known_identities.append(name)

    pickle.dump(known_faces, open("api/data/known_faces.pkl", "wb"))
    pickle.dump(known_identities, open("api/data/known_identities.pkl", "wb"))