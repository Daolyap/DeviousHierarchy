document.querySelectorAll('.hierarchy span').forEach(span => {
    span.addEventListener('click', () => {
        const li = span.parentElement;
        if (li.querySelector('ul')) {
            li.classList.toggle('open');
        }
    });
});