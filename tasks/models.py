from django.db import models

class tasks(models.Model):
    title=models.CharField(max_length=200)
    descripcion=models.TextField(blank=True)
    done=models.BooleanField(default=False)
    
    
    def __str__(self):
        return self.title
    
    
   
    
    
    
    
    
    
