function confirmarDelete(identificador, url){
    const message = `Você realmente deseja deletar ${identificador} ?`
    const isToDelete = window.confirm(message);
    if(isToDelete){
        window.location.href = url;
    }
}