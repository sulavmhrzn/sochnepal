from apps.reports.models import Category
from django.core.management.base import BaseCommand
from django.db import transaction


class Command(BaseCommand):
    help = "Populate default categories for reports"

    def add_arguments(self, parser):
        parser.add_argument(
            "--overwrite",
            action="store_true",
            help="Overwrite existring categories",
        )

    def handle(self, *args, **options):
        categories_data = [
            {
                "name": "Roads & Transportation",
                "name_nepali": "सडक र यातायात",
                "slug": "roads_transportation",
                "description": "Road conditions, traffic issues, public transport problems",
                "color": "#DC2626",
            },
            {
                "name": "Water Supply",
                "name_nepali": "पानी आपूर्ति",
                "slug": "water_supply",
                "description": "Water shortage, quality issues, pipe leaks, contamination",
                "color": "#2563EB",
            },
            {
                "name": "Electricity & Power",
                "name_nepali": "बिजुली र उर्जा",
                "slug": "electricity_power",
                "description": "Power outages, electrical hazards, street lighting",
                "color": "#F59E0B",
            },
            {
                "name": "Waste Management",
                "name_nepali": "फोहोर व्यवस्थापन",
                "slug": "waste_management",
                "description": "Garbage collection, waste disposal, recycling issues",
                "color": "#059669",
            },
            {
                "name": "Drainage & Sewage",
                "name_nepali": "नाली र फोहोर पानी",
                "slug": "drainage_sewage",
                "description": "Blocked drains, sewage overflow, flooding issues",
                "color": "#7C3AED",
            },
            {
                "name": "Healthcare",
                "name_nepali": "स्वास्थ्य सेवा",
                "slug": "healthcare",
                "description": "Hospital issues, medical facility problems, health concerns",
                "color": "#DC2626",
            },
            {
                "name": "Education",
                "name_nepali": "शिक्षा",
                "slug": "education",
                "description": "School infrastructure, educational facility issues",
                "color": "#2563EB",
            },
            {
                "name": "Public Safety",
                "name_nepali": "सार्वजनिक सुरक्षा",
                "slug": "public_safety",
                "description": "Crime, safety hazards, emergency response issues",
                "color": "#DC2626",
            },
            {
                "name": "Environment & Pollution",
                "name_nepali": "वातावरण र प्रदूषण",
                "slug": "environment_pollution",
                "description": "Air pollution, noise pollution, environmental degradation",
                "color": "#059669",
            },
            {
                "name": "Parks & Recreation",
                "name_nepali": "पार्क र मनोरञ्जन",
                "slug": "parks_recreation",
                "description": "Park maintenance, recreational facilities, playgrounds",
                "color": "#10B981",
            },
            {
                "name": "Housing & Construction",
                "name_nepali": "आवास र निर्माण",
                "slug": "housing_construction",
                "description": "Illegal construction, housing issues, building code violations",
                "color": "#F59E0B",
            },
            {
                "name": "Food Safety",
                "name_nepali": "खाना सुरक्षा",
                "slug": "food_safety",
                "description": "Food quality, restaurant hygiene, market sanitation",
                "color": "#EF4444",
            },
            {
                "name": "Animal Welfare",
                "name_nepali": "जनावर कल्याण",
                "slug": "animal_welfare",
                "description": "Stray animals, animal cruelty, pet-related issues",
                "color": "#8B5CF6",
            },
            {
                "name": "Digital Services",
                "name_nepali": "डिजिटल सेवा",
                "slug": "digital_services",
                "description": "Online services, digital infrastructure, internet connectivity",
                "color": "#3B82F6",
            },
            {
                "name": "Other",
                "name_nepali": "अन्य",
                "slug": "other",
                "description": "Other civic issues not covered in specific categories",
                "color": "#6B7280",
            },
        ]

        created_count = updated_count = 0

        with transaction.atomic():
            for category_data in categories_data:
                slug = category_data["slug"]
                if options["overwrite"]:
                    category, created = Category.objects.update_or_create(
                        slug=slug, defaults=category_data
                    )
                    if created:
                        created_count += 1
                        self.stdout.write(
                            self.style.SUCCESS(f"Created category: {category.name}")
                        )
                    else:
                        updated_count += 1
                        self.stdout.write(
                            self.style.WARNING(f"Updated category: {category.name}")
                        )
                else:
                    category, created = Category.objects.get_or_create(
                        slug=slug, defaults=category_data
                    )
                    if created:
                        created_count += 1
                        self.stdout.write(
                            self.style.SUCCESS(f"Created category: {category.name}")
                        )
                    else:
                        self.stdout.write(
                            self.style.WARNING(
                                f"Category already exists: {category.name}"
                            )
                        )
            self.stdout.write(
                self.style.SUCCESS(
                    f"\nSummary: {created_count} created, {updated_count} updated"
                )
            )
