(function(){
  function parseHash(){
    var raw = location.hash.replace(/^#/, '');
    var parts = raw.split('#'); // handle extra anchor after route
    var left = parts[0] || '/';
    var anchor = parts[1] || '';
    var qparts = left.split('?');
    var path = qparts[0] || '/';
    var query = (qparts[1]||'').split('&').reduce(function(acc,p){
      var kv = p.split('=');
      if(kv[0]) acc[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]||'');
      return acc;
    }, {});
    return { path: path || '/', anchor: anchor, query: query };
  }
  function navigate(){
    var info = parseHash();
    var fn = routes[info.path] || routes['/404'];
    render(fn(), info);
  }

  function toast(msg, timeout){ timeout = timeout || 3500; var area = document.getElementById('toasts'); if(!area) return;
    var el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; area.appendChild(el);
    setTimeout(function(){ el.style.opacity = '0'; setTimeout(function(){ el.remove(); }, 400); }, timeout);
  }

  var KEY = 'sem_amanha_forms_v1';
  function loadState(){ try{ return JSON.parse(localStorage.getItem(KEY) || '{}'); }catch(e){ return {}; } }
  function saveState(data){ localStorage.setItem(KEY, JSON.stringify(data)); }

  function cpfIsValid(cpf){
    cpf = (cpf||'').replace(/\D+/g,''); if(!cpf||cpf.length!==11) return false;
    if(/^(\d)\1+$/.test(cpf)) return false;
    var soma=0; for(var i=0;i<9;i++) soma+=parseInt(cpf.charAt(i))*(10-i);
    var resto = 11-(soma%11); var dig1 = (resto>=10)?0:resto;
    soma=0; for(i=0;i<10;i++) soma+=parseInt(cpf.charAt(i))*(11-i);
    resto = 11-(soma%11); var dig2 = (resto>=10)?0:resto;
    return (parseInt(cpf.charAt(9))===dig1)&&(parseInt(cpf.charAt(10))===dig2);
  }

  var Templates = {
    home: function(){ return '\
      <section class="hero">\
        <div>\
          <h1>Missão, visão e valores</h1>\
          <p class="mb-2"><strong>Missão:</strong> semear oportunidades por meio de educação, cultura e empreendedorismo.</p>\
          <div class="badges mb-3">\
            <span class="badge">Transparência</span>\
            <span class="badge">Equidade</span>\
            <span class="badge">Inovação social</span>\
          </div>\
          <a class="btn btn-primary" href="#/projetos">Conheça nossos projetos</a>\
          <a class="btn btn-ghost" href="#/cadastro">Participar</a>\
        </div>\
        <figure>\
          <img src="assets/img/hero.svg" alt="Ilustração de voluntários e educadores">\
        </figure>\
      </section>\
      <section class="section">\
        <div class="alert alert-info">Relatórios de transparência disponíveis em breve.</div>\
      </section>'; },
    projetos: function(){ 
      var data=[
        {img:'projeto-educacao.svg', title:'Trilha Tech Jovem', tags:['Educação','Tecnologia','15–24'], cta1:'Mentorar'},
        {img:'projeto-renda.svg', title:'Mulheres que Empreendem', tags:['Renda','Empreendedorismo','Mulheres'], cta1:'Dar uma oficina'},
        {img:'projeto-cultura.svg', title:'Arte & Esporte', tags:['Cultura','Esporte','Infância'], cta1:'Voluntariar'}
      ];
      return '\
      <nav aria-label="Trilha de navegação" class="breadcrumb">\
        <ol><li><a href="#/">Início</a></li><li aria-current="page">Projetos</li></ol>\
      </nav>\
      <h1 class="mb-3">Projetos sociais</h1>\
      '+ data.map(function(p){ return '\
        <article class="card mt-3">\
          <img src="assets/img/'+p.img+'" alt="'+p.title+'">\
          <div class="card-body">\
            <h2>'+p.title+'</h2>\
            <div class="badges">'+ p.tags.map(function(t){return '<span class="badge">'+t+'</span>'}).join('') +'</div>\
            <div class="flex gap-2 mt-2 wrap">\
              <a class="btn btn-primary" href="#/cadastro#voluntariado">'+p.cta1+'</a>\
              <a class="btn btn-ghost" href="#/cadastro#doacao">Doar</a>\
            </div>\
          </div>\
        </article>'; }).join('');
    },
    cadastro: function(){ return '\
      <h1>Cadastro</h1>\
      <section id="voluntariado" class="mt-3">\
        <h2>Quero ser voluntário(a)</h2>\
        <form id="form-vol" class="form" novalidate>\
          <fieldset><legend>Dados pessoais</legend>\
            <div class="grid">\
              <div class="col-6 md-col-12"><div class="field">\
                <label for="nome">Nome completo</label>\
                <input id="nome" name="nome" type="text" placeholder="Seu nome" required minlength="3" />\
                <small class="help">Como está no documento.</small>\
              </div></div>\
              <div class="col-6 md-col-12"><div class="field">\
                <label for="email">E-mail</label>\
                <input id="email" name="email" type="email" placeholder="voce@exemplo.com" required />\
              </div></div>\
              <div class="col-4 md-col-6 xs-col-12"><div class="field">\
                <label for="cpf">CPF</label>\
                <input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" required />\
                <small class="help">Formato: 000.000.000-00</small>\
              </div></div>\
              <div class="col-4 md-col-6 xs-col-12"><div class="field">\
                <label for="telefone">Telefone</label>\
                <input id="telefone" name="telefone" type="tel" placeholder="(11) 90000-0000" required />\
              </div></div>\
              <div class="col-4 md-col-12"><div class="field">\
                <label for="nascimento">Data de Nascimento</label>\
                <input id="nascimento" name="nascimento" type="date" required />\
              </div></div>\
            </div>\
          </fieldset>\
          <fieldset><legend>Endereço</legend>\
            <div class="grid">\
              <div class="col-3 md-col-6 xs-col-12"><div class="field">\
                <label for="cep">CEP</label>\
                <input id="cep" name="cep" type="text" placeholder="00000-000" required />\
              </div></div>\
              <div class="col-9 md-col-6 xs-col-12"><div class="field">\
                <label for="endereco">Endereço</label>\
                <input id="endereco" name="endereco" type="text" placeholder="Rua, número, complemento" required>\
              </div></div>\
              <div class="col-6 xs-col-12"><div class="field">\
                <label for="cidade">Cidade</label>\
                <input id="cidade" name="cidade" type="text" placeholder="Sua cidade" required>\
              </div></div>\
              <div class="col-6 xs-col-12"><div class="field">\
                <label for="estado">Estado</label>\
                <select id="estado" name="estado" required>\
                  <option value="">Selecione</option>\
                  <option>AC</option><option>AL</option><option>AP</option><option>AM</option>\
                  <option>BA</option><option>CE</option><option>DF</option><option>ES</option>\
                  <option>GO</option><option>MA</option><option>MT</option><option>MS</option>\
                  <option>MG</option><option>PA</option><option>PB</option><option>PR</option>\
                  <option>PE</option><option>PI</option><option>RJ</option><option>RN</option>\
                  <option>RS</option><option>RO</option><option>RR</option><option>SC</option>\
                  <option>SP</option><option>SE</option><option>TO</option>\
                </select>\
              </div></div>\
            </div>\
          </fieldset>\
          <fieldset><legend>Preferências</legend>\
            <div class="grid">\
              <div class="col-6 xs-col-12"><div class="field">\
                <label for="area">Área de interesse</label>\
                <select id="area" name="area" required>\
                  <option value="">Selecione</option>\
                  <option>Educação</option><option>Cultura</option><option>Esportes</option>\
                  <option>Comunicação</option><option>Captação de recursos</option>\
                </select>\
              </div></div>\
              <div class="col-6 xs-col-12"><div class="field">\
                <label for="mensagem">Mensagem</label>\
                <textarea id="mensagem" name="mensagem" rows="4" placeholder="Conte um pouco sobre você"></textarea>\
              </div></div>\
            </div>\
          </fieldset>\
          <div class="flex gap-2">\
            <button class="btn btn-primary" type="submit">Enviar inscrição</button>\
            <button class="btn btn-ghost" type="reset">Limpar</button>\
          </div>\
        </form>\
      </section>\
      <section id="doacao" class="mt-4">\
        <h2>Quero doar</h2>\
        <div class="alert alert-success">Suas doações mantêm nossos projetos ativos. Obrigado!</div>\
        <form id="form-doacao" class="form mt-2">\
          <fieldset><legend>Dados do doador</legend>\
            <div class="grid">\
              <div class="col-8 md-col-12"><div class="field">\
                <label for="email-doacao">E-mail</label>\
                <input id="email-doacao" name="email" type="email" required placeholder="voce@exemplo.com">\
              </div></div>\
              <div class="col-4 md-col-6 xs-col-12"><div class="field">\
                <label for="valor">Valor (R$)</label>\
                <input id="valor" name="valor" type="number" required min="5" step="1" placeholder="50">\
              </div></div>\
              <div class="col-4 md-col-6 xs-col-12"><div class="field">\
                <label for="recorrencia">Recorrência</label>\
                <select id="recorrencia" name="recorrencia" required>\
                  <option value="">Selecione</option>\
                  <option>Única</option><option>Mensal</option><option>Trimestral</option><option>Anual</option>\
                </select>\
              </div></div>\
            </div>\
          </fieldset>\
          <div class="flex gap-2">\
            <button class="btn btn-primary" type="submit">Continuar</button>\
            <a class="btn btn-ghost" href="#/cadastro#doacao">Ver chave PIX</a>\
          </div>\
        </form>\
      </section>\
      <div id="modal-pix" class="modal" role="dialog" aria-modal="true" aria-labelledby="pix-title">\
        <div class="modal-dialog">\
          <h3 id="pix-title">Doação via PIX</h3>\
          <p>Chave: <strong>doacoes@sementesdoamanha.org.br</strong></p>\
          <p><a class="btn btn-primary" href="#">Copiar chave</a> <a class="btn btn-ghost" href="#">Fechar</a></p>\
        </div>\
      </div>'; },
    notFound: function(){ return '<h1>Página não encontrada</h1>'; }
  };

  function onlyDigits(v){ return (v||'').replace(/\D+/g,''); }
  function maskCpf(v){ v=onlyDigits(v).slice(0,11);
    if(v.length>9) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/,'$1.$2.$3-$4');
    if(v.length>6) return v.replace(/(\d{3})(\d{3})(\d{0,3})/,'$1.$2.$3');
    if(v.length>3) return v.replace(/(\d{3})(\d{0,3})/,'$1.$2'); return v; }
  function maskTel(v){ v=onlyDigits(v).slice(0,11);
    if(v.length>10) return v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3');
    if(v.length>6) return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
    if(v.length>2) return v.replace(/(\d{2})(\d{0,5})/,'($1) $2'); return v; }
  function maskCep(v){ v=onlyDigits(v).slice(0,8); if(v.length>5) return v.replace(/(\d{5})(\d{0,3})/,'$1-$2'); return v; }
  function ageFrom(dateStr){ if(!dateStr) return 0; var d=new Date(dateStr); if(isNaN(d.getTime())) return 0;
    var t=new Date(); var age=t.getFullYear()-d.getFullYear(); var m=t.getMonth()-d.getMonth();
    if(m<0||(m===0&&t.getDate()<d.getDate())) age--; return age; }

  function initForms(){
    var date = document.getElementById('nascimento'); if(date) date.max = new Date().toISOString().split('T')[0];
    var cpfEl=document.getElementById('cpf'); if(cpfEl) cpfEl.addEventListener('input', function(e){ e.target.value = maskCpf(e.target.value); });
    var telEl=document.getElementById('telefone'); if(telEl) telEl.addEventListener('input', function(e){ e.target.value = maskTel(e.target.value); });
    var cepEl=document.getElementById('cep'); if(cepEl) cepEl.addEventListener('input', function(e){ e.target.value = maskCep(e.target.value); });

    var vol=document.getElementById('form-vol');
    if(vol){
      vol.addEventListener('submit', function(e){
        e.preventDefault();
        var errs=[];
        var nome = (vol.querySelector('#nome')||{}).value||'';
        var email = (vol.querySelector('#email')||{}).value||'';
        var cpf = (vol.querySelector('#cpf')||{}).value||'';
        var tel = (vol.querySelector('#telefone')||{}).value||'';
        var nasc = (vol.querySelector('#nascimento')||{}).value||'';
        var cep = (vol.querySelector('#cep')||{}).value||'';
        var estado = (vol.querySelector('#estado')||{}).value||'';

        if((nome.trim()).length<3) errs.push('Nome deve ter ao menos 3 caracteres.');
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('E-mail inválido.');
        if(!cpfIsValid(cpf)) errs.push('CPF inválido.');
        var telDigits = onlyDigits(tel); if(!(telDigits.length===10||telDigits.length===11)) errs.push('Telefone deve ter 10 ou 11 dígitos.');
        if(onlyDigits(cep).length!==8) errs.push('CEP deve ter 8 dígitos.');
        if(ageFrom(nasc)<16) errs.push('Idade mínima: 16 anos para voluntariado.');
        if(!estado) errs.push('Selecione um estado.');

        if(errs.length){ errs.forEach(toast); return; }
        var data={}; Array.from(new FormData(vol).entries()).forEach(function(kv){ data[kv[0]]=kv[1]; });
        var st=loadState(); st.volunteer=data; saveState(st);
        toast('Inscrição enviada com sucesso!'); vol.reset();
      });
    }

    var doa=document.getElementById('form-doacao');
    if(doa){
      doa.addEventListener('submit', function(e){
        e.preventDefault();
        var email = (doa.querySelector('#email-doacao')||{}).value||'';
        var val = parseFloat((doa.querySelector('#valor')||{}).value||'0');
        var rec = (doa.querySelector('#recorrencia')||{}).value||'';
        var errs=[];
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('E-mail de doação inválido.');
        if(!(val>=5)) errs.push('Valor mínimo para doação é R$ 5.');
        if(!rec) errs.push('Selecione a recorrência.');
        if(errs.length){ errs.forEach(toast); return; }
        var st=loadState(); st.donation={email:email,val:val,rec:rec}; saveState(st);
        toast('Doação registrada (simulação).'); doa.reset();
      });
    }
  }

  var app = document.getElementById('app');
  function render(html, info){
    app.setAttribute('aria-busy','true'); app.innerHTML=html; app.setAttribute('aria-busy','false');
    if(info.path === '/cadastro'){ initForms(); }
    var targetId = info.anchor || info.query.sec || '';
    if(targetId){
      var el = document.getElementById(targetId);
      if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  }

  var routes = {
    '/': function(){ return Templates.home(); },
    '/projetos': function(){ return Templates.projetos(); },
    '/cadastro': function(){ return Templates.cadastro(); },
    '/sobre': function(){ return '<h1>Sobre</h1><p>Atuamos desde 2014 com educação, cultura e renda.</p>'; },
    '/contato': function(){ return '<h1>Contato</h1><p>E-mail: contato@sementesdoamanha.org.br</p>'; },
    '/404': function(){ return Templates.notFound(); }
  };

  window.addEventListener('hashchange', navigate);
  window.addEventListener('load', navigate);
})();