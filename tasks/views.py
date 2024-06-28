from rest_framework import viewsets
from .serializer import tasksSerializer
from .models import tasks

class tasksview (viewsets.ModelViewSet):
    serializer_class = tasksSerializer
    queryset = tasks.objects.all()
    
    