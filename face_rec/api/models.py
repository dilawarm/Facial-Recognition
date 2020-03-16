from django.db import models

class Identity(models.Model):
    name = models.CharField(max_length=100, default='')
    image = models.ImageField(upload_to='post_images')

    def __str__(self):
        return self.name