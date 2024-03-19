from django.apps import AppConfig
from suit.apps import DjangoSuitConfig


class ReviewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reviews'


class SuitConfig(DjangoSuitConfig):
    layout = 'horizontal'
    # layout = 'vertical'
