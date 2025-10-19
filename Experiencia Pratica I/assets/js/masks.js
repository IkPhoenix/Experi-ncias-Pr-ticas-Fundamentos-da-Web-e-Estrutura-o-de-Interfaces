// Máscaras simples e acessíveis para CPF, telefone e CEP + data máxima de nascimento
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
      const raw = el.value;
      const masked = formatter(raw);
      el.value = masked;
      // Tenta manter o cursor em posição próxima (simples)
      if(document.activeElement === el){
        el.selectionStart = el.selectionEnd = Math.min(start + 1, el.value.length);
      }
    });
  }
  function onlyDigits(v){ return v.replace(/\D+/g, ''); }
  function cpfFormat(v){
    v = onlyDigits(v).slice(0,11);
    if(v.length > 9) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    if(v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    if(v.length > 3) return v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    return v;
  }
  function telFormat(v){
    v = onlyDigits(v).slice(0,11);
    if(v.length > 10){ // celular com 9 dígitos
      return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    if(v.length > 6){
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    if(v.length > 2){
      return v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    return v;
  }
  function cepFormat(v){
    v = onlyDigits(v).slice(0,8);
    if(v.length > 5) return v.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    return v;
  }
  document.addEventListener('DOMContentLoaded', function(){
    setMaxDate();
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    if(cpf) mask(cpf, cpfFormat);
    if(tel) mask(tel, telFormat);
    if(cep) mask(cep, cepFormat);
  });
})();
