from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.db import transaction
from core.models import Adocao
from core.forms import FormAdocao
from django.db.models import Q

url_listagem = '/listagem_adocao'
url_cadastro = '/cadastro_adocao'
model = 'Adoção'


@login_required()
@transaction.atomic()
def cadastro_adocao(request):
    form_adocao = FormAdocao(request.POST or None)

    context = {'forms': [form_adocao],
               'form_action': 'Registrar',
               'title_page': 'Registro',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_adocao.is_valid():
        form_adocao.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def listagem_adocao(request):
    search = request.GET.get('search', '')

    adocoes = Adocao.objects.filter(Q(cachorro__nome__icontains=search) |
                                    Q(guardiao__nome__contains=search) |
                                    Q(guardiao__cpf__icontains=search))

    context = {'dados': adocoes,
               'title_page': 'Listagem',
               'btn_action': 'Registrar',
               'model': model,
               'url': url_cadastro,
               'search': search
               }

    return render(request, 'core/adocao/listagem_adocao.html', context)


@login_required()
def atualiza_adocao(request, adocao_id):
    adocao = Adocao.objects.get(id=adocao_id)
    form_adocao = FormAdocao(request.POST or None, instance=adocao)

    context = {'forms': [form_adocao],
               'form_action': 'Atualizar',
               'title_page': 'Atualização',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_adocao.is_valid():
        form_adocao.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def deleta_adocao(_, adocao_id):
    adocao = Adocao.objects.get(id=adocao_id)
    adocao.delete()
    return redirect(url_listagem)

