(function(){
  function setMaxDate(){
    const date = document.getElementById('nascimento');
    if(!date) return;
    const today = new Date().toISOString().split('T')[0];
    date.max = today;
  }
  function mask(el, formatter){
    el.addEventListener('input', () => {
      const start = el.selectionStart;
      const masked = formatter(el.value);
      el.value = masked;
      if(document.activeElement === el){
        el.selectionStart = el.selectionEnd = Math.min(start + 1, el.value.length);
      }
    });
  }
  const onlyDigits = v => v.replace(/\D+/g, '');
  const cpf = v => {
    v = onlyDigits(v).slice(0,11);
    if(v.length > 9) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    if(v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    if(v.length > 3) return v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    return v;
  };
  const tel = v => {
    v = onlyDigits(v).slice(0,11);
    if(v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    if(v.length > 6) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    if(v.length > 2) return v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    return v;
  };
  const cep = v => {
    v = onlyDigits(v).slice(0,8);
    if(v.length > 5) return v.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    return v;
  };
  document.addEventListener('DOMContentLoaded', () => {
    setMaxDate();
    ['cpf','telefone','cep'].forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      mask(el, id==='cpf'?cpf:id==='telefone'?tel:cep);
    });
  });
})();