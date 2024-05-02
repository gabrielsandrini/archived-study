from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Pessoa(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11, unique=True)
    email = models.EmailField(blank=True, null=True)
    telefone = models.CharField(max_length=10, blank=True, null=True)
    celular = models.CharField(max_length=11, blank=True, null=True)
    endereco = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nome + ' - ' + self.cpf

    class Meta:
        verbose_name_plural = 'Pessoas'


class Funcionario(models.Model):
    credenciais = models.OneToOneField(User, on_delete=models.CASCADE)
    pessoa = models.OneToOneField(Pessoa, on_delete=models.CASCADE)

    def __str__(self):
        return self.pessoa.nome + ' - ' + self.pessoa.cpf

    class Meta:
        verbose_name_plural = 'Funcionarios'


class Veterinario(models.Model):
    credenciais = models.OneToOneField(User, on_delete=models.CASCADE)
    pessoa = models.OneToOneField(Pessoa, on_delete=models.CASCADE)
    crmv = models.CharField(max_length=45, unique=True)

    def __str__(self):
        return self.pessoa.nome + ' - ' + self.pessoa.cpf

    class Meta:
        verbose_name_plural = 'Veterinarios'


class Cachorro(models.Model):
    nome = models.CharField(max_length=45)
    raca = models.CharField(max_length=45, blank=True, null=True)
    cor = models.CharField(max_length=80)
    porte = models.CharField(max_length=45)
    data_nascimento = models.DateField(blank=True, null=True)
    pedigree = models.CharField(max_length=45, unique=True, blank=True, null=True)
    caracteristicas_extras = models.TextField(blank=True, null=True)

    def __str__(self):
        raca = self.raca + ' 'if self.raca else ''
        return self.nome + ' - ' + raca + str(self.cor)

    class Meta:
        verbose_name_plural = 'Cachorros'


class Adocao(models.Model):
    cachorro = models.ForeignKey(Cachorro, on_delete=models.CASCADE)
    guardiao = models.ForeignKey(Pessoa, on_delete=models.SET_NULL, null=True)
    data = models.DateField()

    def __str__(self):
        guardiao = str(self.guardiao) + ' - ' if self.guardiao else ""
        return guardiao + str(self.cachorro)

    class Meta:
        verbose_name_plural = 'Adocoes'


class Vacina(models.Model):
    descricao = models.CharField(max_length=60)
    deleted_at = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.descricao

    class Meta:
        verbose_name_plural = 'Vacinas'


class Vacinacao(models.Model):
    vacina = models.ForeignKey(Vacina, on_delete=models.DO_NOTHING, null=True)
    cachorro = models.ForeignKey(Cachorro, on_delete=models.CASCADE)
    data = models.DateField()

    def __str__(self):
        vacina = ' - ' + self.vacina.descricao if self.vacina else " "
        return str(self.cachorro) + vacina + " - " + str(self.data)

    class Meta:
        verbose_name_plural = 'Vacinacoes'


class Consulta(models.Model):
    veterinario = models.ForeignKey(Veterinario, on_delete=models.SET_NULL, null=True)
    cachorro = models.ForeignKey(Cachorro, on_delete=models.CASCADE)
    data = models.DateField()
    medicacao = models.TextField(null=True, blank=True)
    observacoes = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.cachorro) + ' - ' + str(self.data)

    class Meta:
        verbose_name_plural = 'Consultas'

