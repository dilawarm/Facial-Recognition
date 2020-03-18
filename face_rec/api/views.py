from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import IdentitySerializer
from .models import Identity
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

class IdentityView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Identity.objects.all()
        serializer = IdentitySerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        print(request.data["image"])
        posts_serializer = IdentitySerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def homepage(request):
    options = ["Create identity", "Find identity"]
    return Response(status=status.HTTP_200_OK, data={"data": options})