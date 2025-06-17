from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(UserManager):
    use_in_migrations = True

    def _create_user_object(
        self, email, first_name, last_name, password=None, **extra_fields
    ):
        email = self.normalize_email(email)
        user = self.model(
            email=email, first_name=first_name, last_name=last_name, **extra_fields
        )
        user.password = make_password(password)
        return user

    def _create_user(self, email, first_name, last_name, password, **extra_fields):
        """
        Create and save a user with the given email, first_name, last_name and password.
        """
        user = self._create_user_object(
            email, first_name, last_name, password, **extra_fields
        )
        user.save(using=self._db)
        return user

    def create_user(self, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        return self._create_user(email, first_name, last_name, password, **extra_fields)

    create_user.alters_data = True

    def create_superuser(self, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        return self._create_user(email, first_name, last_name, password, **extra_fields)

    create_superuser.alters_data = True


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(blank=False)
    last_name = models.CharField(blank=False)
    is_verified = models.BooleanField(default=False)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    location = models.CharField(max_length=255, blank=True, null=True)
    phone_number = PhoneNumberField(region="NP", blank=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = "profile"
        verbose_name_plural = "profiles"
