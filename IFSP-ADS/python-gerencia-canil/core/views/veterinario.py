from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.db import transaction
from core.forms import FormPessoa, FormVeterinario, UserCreateForm
from core.models import Veterinario
from django.db.models import Q

url_listagem = '/listagem_veterinario'
url_cadastro = '/cadastro_veterinario'
model = 'Veterinário'


@login_required()
@transaction.atomic()
def cadastro_veterinario(request):
    form_pessoa = FormPessoa(request.POST or None)
    form_credenciais = UserCreateForm(request.POST or None)
    form_veterinario = FormVeterinario(request.POST or None)

    context = {'forms': [form_pessoa, form_credenciais, form_veterinario],
               'form_action': 'Registrar',
               'title_page': 'Registro',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_pessoa.is_valid() and form_credenciais.is_valid() and form_veterinario.is_valid():

        pessoa = form_pessoa.save()

        credenciais = form_credenciais.save()

        crmv = form_veterinario.data['crmv']

        veterinario = Veterinario(pessoa=pessoa, credenciais=credenciais, crmv=crmv)
        veterinario.save()

        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def listagem_veterinario(request):
    search = request.GET.get('search', '')

    veterinarios = Veterinario.objects.filter(Q(pessoa__nome__icontains=search) |
                                              Q(pessoa__cpf__icontains=search) |
                                              Q(crmv__icontains=search))

    context = {'dados': veterinarios,
               'title_page': 'Listagem',
               'btn_action': 'Registrar',
               'model': model,
               'url': url_cadastro,
               'search': search
               }

    return render(request, 'core/veterinario/listagem_veterinario.html', context)


@login_required()
def atualiza_veterinario(request, veterinario_id):
    veterinario = Veterinario.objects.get(id=veterinario_id)
    form_pessoa = FormPessoa(request.POST or None, instance=veterinario.pessoa)
    form_credenciais = UserCreateForm(request.POST or None, instance=veterinario.credenciais)
    form_veterinario = FormVeterinario(request.POST or None, instance=veterinario)

    context = {'forms': [form_pessoa, form_credenciais, form_veterinario],
               'form_action': 'Atualizar',
               'title_page': 'Atualização',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_pessoa.is_valid() and form_credenciais.is_valid() and form_veterinario.is_valid():
        form_pessoa.save()
        form_credenciais.save()
        form_veterinario.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def deleta_veterinario(_, veterinario_id):
    veterinario = Veterinario.objects.get(id=veterinario_id)
    veterinario.credenciais.delete()
    veterinario.delete()
    return redirect(url_listagem)