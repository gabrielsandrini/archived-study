from django.contrib import admin
from core.models import (Pessoa, Veterinario, Funcionario, Consulta,
                         Vacinacao, Adocao, Vacina, Cachorro)

# Register your models here.
admin.site.register(Pessoa)
admin.site.register(Veterinario)
admin.site.register(Funcionario)
admin.site.register(Consulta)
admin.site.register(Vacina)
admin.site.register(Vacinacao)
admin.site.register(Adocao)
admin.site.register(Cachorro)
