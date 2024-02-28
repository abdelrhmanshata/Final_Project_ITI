from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','name','email','password','phonenumber','classroom','gradelevels','image','address','identificationcard','educationstage','usertype']
        extra_kwargs={
            'password' : {'write_only':True}
        }

    def create(self, validated_data):
        password=validated_data.pop('password',None)  
        instance= self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    def validate_identificationcard(self, data):
        """
        Check if the user type is teacher, only then allow identification card field
        and if identification card is provided, check if it is exactly 14 digits long.
        """
        usertype = self.initial_data.get('usertype')
        identificationcard = self.initial_data.get('identificationcard')

        if usertype == 'teacher' and identificationcard is None:
            raise serializers.ValidationError("A teacher must provide an identification card.")
        
        if identificationcard is not None and len(identificationcard) != 14:
            raise serializers.ValidationError("Identification card must be exactly 14 digits long.")

        return data
   