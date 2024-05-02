from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from core.forms import FormVacina
from core.models import Vacina
from datetime import date

url_listagem = '/listagem_vacina'
url_cadastro = '/cadastro_vacina'
model = 'Vacina'


@login_required()
def cadastro_vacina(request):
    form_vacina = FormVacina(request.POST or None)

    context = {'forms': [form_vacina],
               'form_action': 'Registrar',
               'title_page': 'Registro',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_vacina.is_valid():
        form_vacina.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def listagem_vacina(request):
    search = request.GET.get('search', '')
    is_deletada = bool(request.GET.get('deletadas', ''))

    vacinas = Vacina.objects.filter(deleted_at__isnull=not is_deletada,
                                    descricao__icontains=search)
    context = {'dados': vacinas,
               'title_page': 'Listagem',
               'btn_action': 'Registrar',
               'model': model,
               'url': url_cadastro,
               'boolean_search_fields': [('Deletadas', 'deletadas', is_deletada)],
               'search': search
               }
    return render(request, 'core/vacina/listagem_vacina.html', context)


@login_required()
def atualiza_vacina(request, vacina_id):
    vacina = Vacina.objects.get(id=vacina_id)
    form_vacina = FormVacina(request.POST or None, instance=vacina)

    context = {'forms': [form_vacina],
               'form_action': 'Atualizar',
               'title_page': 'Atualização',
               'btn_action': 'Listagem',
               'model': model,
               'url': url_listagem}

    if form_vacina.is_valid():
        form_vacina.save()
        return redirect(url_listagem)

    return render(request, 'core/cadastro_e_atualizacao.html', context)


@login_required()
def deleta_vacina(_, vacina_id):
    vacina = Vacina.objects.get(id=vacina_id)
    vacina.deleted_at = date.today()
    vacina.save()
    return redirect(url_listagem)