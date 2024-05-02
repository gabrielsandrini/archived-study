from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from core.forms import FormVacinacao
from core.models import Vacinacao
from django.db.models import Q

url_listagem = '/listagem_vacinacao'
url_cadastro = '/cadastro_vacinacao'
model = 'Vacinação'


@login_required()
def cadastro_vacinacao(request):
    form_vacinacao = FormVacinacao(request.POST or None)

    context = {'forms': [form_vacinacao],
               'form_action': 'Registrar',
               'title_page': 'Registro',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_vacinacao.is_valid():
        form_vacinacao.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def listagem_vacinacao(request):
    search = request.GET.get('search', '')

    vacinacoes = Vacinacao.objects.filter(Q(cachorro__nome__icontains=search) |
                                          Q(vacina__descricao__icontains=search))

    context = {'dados': vacinacoes,
               'title_page': 'Listagem',
               'btn_action': 'Registrar',
               'model': model,
               'url': url_cadastro,
               'search': search
               }

    return render(request, 'core/vacinacao/listagem_vacinacao.html', context)


@login_required()
def atualiza_vacinacao(request, vacinacao_id):
    vacinacao = Vacinacao.objects.get(id=vacinacao_id)
    form_vacinacao = FormVacinacao(request.POST or None, instance=vacinacao)

    context = {'forms': [form_vacinacao],
               'form_action': 'Atualizar',
               'title_page': 'Atualização',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_vacinacao.is_valid():
        form_vacinacao.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def deleta_vacinacao(_, vacinacao_id):
    vacinacao = Vacinacao.objects.get(id=vacinacao_id)
    vacinacao.delete()
    return redirect(url_listagem)
