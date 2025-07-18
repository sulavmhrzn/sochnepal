from django.db import models

from apps.accounts.models import User


class Category(models.Model):
    name = models.CharField(max_length=50)
    name_nepali = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=255, default="#FFFFFF")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"

    @property
    def report_count(self):
        return self.reports.count()


class Status(models.TextChoices):
    PENDING = "pending", "Pending"
    IN_PROGRESS = "in_progress", "In Progress"
    RESOLVED = "resolved", "Resolved"
    REJECTED = "rejected", "Rejected"


class Report(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="reports"
    )
    status = models.CharField(
        max_length=50, choices=Status.choices, default=Status.PENDING
    )
    image = models.ImageField(
        upload_to="report_images/",
        null=True,
        blank=True,
        default="default_images/no_image_available.jpg",
    )
    location_lat = models.FloatField()
    location_lng = models.FloatField()
    address = models.TextField(max_length=255, null=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="reports"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_flagged = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    @property
    def upvotes_count(self):
        return self.upvotes.count()

    class Meta:
        verbose_name = "report"
        verbose_name_plural = "reports"
        ordering = ["-created_at"]


class UpVote(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name="upvotes")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="upvotes")
