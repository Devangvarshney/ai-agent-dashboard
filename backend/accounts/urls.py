from django.urls import path
from .views import RegisterView ,UserView
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns=[
    path("register/",RegisterView.as_view(),name="register"),
      path("login/",TokenObtainPairView.as_view(),name="Login"),
        path("token/refresh/",TokenRefreshView.as_view(),name="refresh"),
          path("profile/",UserView.as_view(),name="profile"),
          path("user/", UserView.as_view())

]