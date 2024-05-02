from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.db import transaction
from core.forms import FormCachorro
from core.models import Cachorro
from django.db.models import Q

url_listagem = '/listagem_cachorro'
url_cadastro = '/cadastro_cachorro'
model = 'Cachorro'


@login_required()
@transaction.atomic()
def cadastro_cachorro(request):
    form_cachorro = FormCachorro(request.POST or None)

    context = {'forms': [form_cachorro],
               'form_action': 'Registrar',
               'title_page': 'Registro',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_cachorro.is_valid():
        form_cachorro.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def listagem_cachorro(request):
    search = request.GET.get('search', '')
    adotado = bool(request.GET.get('adotado', ''))

    cachorros = Cachorro.objects.filter(Q(nome__icontains=search) |
                                        Q(raca__icontains=search) |
                                        Q(cor__icontains=search) |
                                        Q(porte__icontains=search) |
                                        Q(pedigree__icontains=search) |
                                        Q(caracteristicas_extras__icontains=search),
                                        adocao__isnull=(not adotado)
                                        )

    context = {'dados': cachorros,
               'title_page': 'Listagem',
               'btn_action': 'Registrar',
               'model': model,
               'url': url_cadastro,
               'boolean_search_fields': [('Já foi adotado', 'adotado', adotado)],
               'search': search
               }
    return render(request, 'core/cachorro/listagem_cachorro.html', context)


@login_required()
def atualiza_cachorro(request, cachorro_id):
    cachorro = Cachorro.objects.get(id=cachorro_id)
    form_cachorro = FormCachorro(request.POST or None, instance=cachorro)

    context = {'forms': [form_cachorro],
               'form_action': 'Atualizar',
               'title_page': 'Atualização',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_cachorro.is_valid():
        form_cachorro.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def deleta_cachorro(_, cachorro_id):
    cachorro = Cachorro.objects.get(id=cachorro_id)
    cachorro.delete()
    return redirect(url_listagem)

