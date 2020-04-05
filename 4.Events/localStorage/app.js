const toogleSwtich = document.querySelector('input[type="checkbox"]');

toogleSwtich.addEventListener('click', function(e){
    document.body.className = toogleSwtich.checked ? 'dark' : '';
    localStorage.setItem('darkModeEnabled', toogleSwtich.checked);
});