from django.urls import path
from .views import *
from .views import RegisterView, LoginView, UserView, LogoutView, ForgetPasswordView,ResetPasswordView,Print_All_Teachers,Print_All_Students, Print_All_Users,Get_Specific_User,Update_User,Delete_User,Get_Approved_User



urlpatterns = [
    path('register',RegisterView.as_view()),  
    path('login',LoginView.as_view()),    
    path('user',UserView.as_view()),    
    path('logout',LogoutView.as_view()),    
    path('forgot',ForgetPasswordView.as_view()),
    path('reset',ResetPasswordView.as_view()),    
    path('Print_All_Teachers/',Print_All_Teachers,name='Print_All_Teachers'),
    path('Print_All_Students/',Print_All_Students,name='Print_All_Students'),
    path('Print_All_Users/',Print_All_Users,name='Print_All_Users'),
    path('Get_Specific_User/<int:id>',Get_Specific_User,name='Get_Specific_User'),
    path('Update_User/<int:id>',Update_User,name='Update_User'),
    path('Delete_User/<int:id>',Delete_User,name='Delete_User'),
    
    path('Get_Approved_User/<int:userId>/<int:isApprove>',Get_Approved_User,name='Get_Approved_User'),
    
     path('getUserImage/<int:userID>', getUserImage, name='getUserImage'),
]