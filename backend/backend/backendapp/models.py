from django.db import models

# Create your models here.
class IG(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
    class Meta():
        verbose_name_plural = "IGs"
    
class Slot(models.Model):
    venue = models.CharField(max_length=30)
    capacity = models.IntegerField()
    startDateTime = models.DateTimeField()
    endDateTime = models.DateTimeField()
    description = models.TextField(max_length=200)
    ig = models.ForeignKey(IG, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.ig}\t{self.startDateTime}\t{self.endDateTime}"
