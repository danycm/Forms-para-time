document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('survey-form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = {
                bi_tool: formData.get('bi_tool'),
                metrics: formData.getAll('metrics'),
                hours: formData.get('hours-input'),
                challenge: formData.get('challenge-textarea'),
                timestamp: new Date().toISOString()
            };

            try {
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Obrigado por suas respostas!');
                    form.reset();
                } else {
                    alert('Houve um erro ao enviar suas respostas. Tente novamente.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Houve um erro ao enviar suas respostas. Tente novamente.');
            }
        });
    }
});
