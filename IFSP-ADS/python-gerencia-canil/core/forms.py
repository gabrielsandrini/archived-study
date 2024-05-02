from django.forms import ModelForm, ChoiceField, ModelChoiceField, MultiValueField
from core.models import (Pessoa, Veterinario, Cachorro,
                         Consulta, Vacina, Vacinacao, Adocao)
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserCreateForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "password1", "password2")


class FormPessoa(ModelForm):
    class Meta:
        model = Pessoa
        fields = '__all__'


class FormVeterinario(ModelForm):
    class Meta:
        model = Veterinario
        fields = ('crmv', )


class FormCachorro(ModelForm):
    PORTE_LIST = [
        ('Pequeno', 'Pequeno'),
        ('Médio', 'Médio'),
        ('Grande', 'Grande')
    ]
    porte = ChoiceField(choices=PORTE_LIST)

    class Meta:
        model = Cachorro
        fields = '__all__'


class FormConsultaVeterinario(ModelForm):

    class Meta:
        model = Consulta
        fields = '__all__'


class FormVacina(ModelForm):
    class Meta:
        model = Vacina
        fields = ('descricao', )


class FormVacinacao(ModelForm):
    vacina = ModelChoiceField(queryset=Vacina.objects.filter(deleted_at=None))

    class Meta:
        model = Vacinacao
        fields = '__all__'


class FormAdocao(ModelForm):
    cachorros_adotados = Adocao.objects.all().only('cachorro_id')
    cachorro = ModelChoiceField(queryset=Cachorro.objects.filter(adocao__isnull=True))

    class Meta:
        model = Adocao
        fields = '__all__'
