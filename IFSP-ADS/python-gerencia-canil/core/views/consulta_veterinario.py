from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.db import transaction
from core.forms import FormConsultaVeterinario
from core.models import Consulta
from django.db.models import Q

url_listagem = '/listagem_consulta'
url_cadastro = '/cadastro_consulta'
model = 'Consulta'


@login_required()
@transaction.atomic()
def cadastro_consulta_veterinario(request):
    form_consulta_veterinario = FormConsultaVeterinario(request.POST or None)

    context = {'forms': [form_consulta_veterinario],
               'form_action': 'Registrar',
               'title_page': 'Registro',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_consulta_veterinario.is_valid():
        form_consulta_veterinario.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def listagem_consulta_veterinario(request):
    search = request.GET.get('search', '')

    consultas = Consulta.objects.filter(Q(veterinario__crmv__icontains=search) |
                                        Q(veterinario__pessoa__nome__icontains=search) |
                                        Q(veterinario__pessoa__cpf__icontains=search) |
                                        Q(cachorro__nome__icontains=search)
                                        )

    context = {'dados': consultas,
               'title_page': 'Listagem',
               'btn_action': 'Registrar',
               'model': model,
               'url': url_cadastro,
               'search': search
               }

    return render(request, 'core/consulta/listagem_consulta.html', context)


@login_required()
def atualiza_consulta_veterinario(request, consulta_id):
    consulta = Consulta.objects.get(id=consulta_id)
    form_consulta_veterinario = FormConsultaVeterinario(request.POST or None, instance=consulta)

    context = {'forms': [form_consulta_veterinario],
               'form_action': 'Atualizar',
               'title_page': 'Atualização',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_consulta_veterinario.is_valid():
        form_consulta_veterinario.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def deleta_consulta_veterinario(_, consulta_id):
    consulta = Consulta.objects.get(id=consulta_id)
    consulta.delete()
    return redirect(url_listagem)
