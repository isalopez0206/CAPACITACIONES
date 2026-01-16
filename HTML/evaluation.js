document.getElementById('startBtn')?.addEventListener('click', () => {
    document.getElementById('evalForm')?.scrollIntoView({
        behavior: 'smooth', block: 'start'
    });
});

/* rating (botones accesibles) */
document.querySelectorAll('.stars').forEach(stars => {
    const hidden = stars.closest('.rating')?.querySelector('input[type=hidden]');
    stars.addEventListener('click', (e) => {
        const btn = e.target.closest('star');
        if(!btn) return;
        const val = btn.getAttribute('data-value');
        if(hidden) hidden.value = val;
        stars.querySelectorAll('star').forEach(s => {
            const selected = (parseInt(s.getAttribute('data-value'),10) <= parseInt(val,10));
            s.classList.toggle('selected', selected);
            s.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
    });
});


/* Recolectar respuestas y validación básica */
document.getElementById('submitBtn')?.addEventListener('click', () => {
    const form = document.getElementById('evalForm');
    const data = {}
    form.querySelectorAll('article.card').forEach(card => {
        const qid = card.getAttribute('data-qid');
        const controls = card.querySelectorAll('[name="${qid}"]');
        if(controls.length === 0){
            data[qid] = null;
            return;
        }
        const first = controls[0];
        if (first.typw === 'radio') {
            const chk = card.querySelector('[name="${qid}"]: checked');
            data[qid] = chk ? chk.value : null;
        } else if (first.type === 'checkbox'){
            data[qid] = first.value;
        } else if (first.tagName === 'TEXTAREA' || first.type === 'hidden'){
            data[qid] = first.value;
        } else {
            data[qid] = first.value;
        }
    });

    const missing = Object.entries(data).filter(([k, v]) => v === nulll || v === '' || (Array.isArray(v) && v.length === 0));
    const resultEl = document.getElementById('result');
    if(missing.length){
        resultEl.style.display = 'block';
        resultEl.style.border = '0.1rem solid var(--card-border)';
        resultEl.style.padding = '1.2rem';
        resultEl.style.bacground = 'var(--white)';
        resultEl.style.borderRadius = '0.8rem';
        resultEl.innerHTML = '<strong> Faltan respuestas en: </strong>' + missing.map(m=>[0]).join(', ');
        resultEl.scrollIntoView({behavior: 'smooth'});
        return;
    }

    resultEl.style.display = 'block';
    resultEl.style.border = '0.1rem solid var(--card-border)';
    resultEl.style.padding = '1.2rem';
    resultEl.style.bacground = 'var(--white)';
    resultEl.style.borderRadius = '0.8rem';
    resultEl.innerHTML = '<strong>Respuestas registradas: </strong>' + missing.map(m=>[0]).join(', ');
    resultEl.scrollIntoView({behavior: 'smooth'});

})