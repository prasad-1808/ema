"""
Development settings
"""
from .base import *

DEBUG = True

# Development-specific apps
INSTALLED_APPS += [
    'django_extensions',
]

# Allow all origins in development
CORS_ALLOW_ALL_ORIGINS = True

# Development REST Framework settings
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]
