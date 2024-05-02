from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.db import transaction
from core.forms import FormPessoa
from core.models import Pessoa, Funcionario, Veterinario
from django.db.models import Q

url_listagem = '/listagem_pessoa'
url_cadastro = '/cadastro_pessoa'
model = 'Guardião'


@login_required()
@transaction.atomic()
def cadastro_pessoa(request):
    form_pessoa = FormPessoa(request.POST or None)

    context = {'forms': [form_pessoa],
               'form_action': 'Registrar',
               'title_page': 'Registro',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_pessoa.is_valid():
        form_pessoa.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def listagem_pessoa(request):
    search = request.GET.get('search', '')

    pessoas = Pessoa.objects.filter(Q(nome__icontains=search) |
                                    Q(cpf__icontains=search))

    context = {'dados': pessoas,
               'title_page': 'Listagem',
               'btn_action': 'Registrar',
               'model': model,
               'url': url_cadastro,
               'search': search
               }

    return render(request, 'core/pessoa/listagem_pessoa.html', context)


@login_required()
def atualiza_pessoa(request, pessoa_id):
    pessoa = Pessoa.objects.get(id=pessoa_id)
    form_pessoa = FormPessoa(request.POST or None, instance=pessoa)

    context = {'forms': [form_pessoa],
               'form_action': 'Atualizar',
               'title_page': 'Atualização',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_pessoa.is_valid():
        form_pessoa.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
@transaction.atomic()
def deleta_pessoa(_, pessoa_id):
    pessoa = Pessoa.objects.get(id=pessoa_id)

    funcionario = Funcionario.objects.filter(pessoa_id=pessoa.id)
    veterinario = Veterinario.objects.filter(pessoa_id=pessoa.id)

    if funcionario:
        funcionario[0].credenciais.delete()
    elif veterinario:
        veterinario[0].credenciais.delete()

    pessoa.delete()
    return redirect(url_listagem)
