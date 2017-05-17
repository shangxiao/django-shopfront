from django.contrib import auth
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST


def profile(request):
    if request.user.is_authenticated:
        return JsonResponse(data={
            'email': request.user.email,
        })
    else:
        return HttpResponse(status=401)


@require_POST
def login(request):
    """
    A simple login view that ah xhr client can call
    """
    user = auth.authenticate(request, email=request.POST.get('email'), password=request.POST.get('password'))
    if user is not None and user.is_active:
        auth.login(request, user)
        return JsonResponse(data={
            'email': user.email,
        })

    return HttpResponse(status=401)
