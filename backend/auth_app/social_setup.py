from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
from django.conf import settings

def create_social_apps():
    try:
        site = Site.objects.get_current()

        if not SocialApp.objects.filter(provider='github').exists():
            github = SocialApp.objects.create(
                provider='github',
                name='GitHub',
                client_id=settings.SOCIALACCOUNT_PROVIDERS['github']['APP']['client_id'],
                secret=settings.SOCIALACCOUNT_PROVIDERS['github']['APP']['secret'],
            )
            github.sites.add(site)

        if not SocialApp.objects.filter(provider='google').exists():
            google = SocialApp.objects.create(
                provider='google',
                name='Google',
                client_id=settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id'],
                secret=settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['secret'],
            )
            google.sites.add(site)

    except Exception as e:
        print("Social App setup failed:", str(e))
