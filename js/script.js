// Substitua pela sua chave real da API do Gemini
const API_KEY = 'AIzaSyAd8MFfaVlrBYrIX01LatFeHSnEuUznUIY';

document.getElementById('generateBtn').addEventListener('click', async () => {
    const promptText = document.getElementById('aiPrompt').value.trim();
    const tipo = document.getElementById('serviceType').value;
    const output = document.getElementById('generatedContent');

    // Verificações simples
    if (!promptText || !tipo) {
        output.innerHTML = '<p style="color:red;">Por favor, preencha o prompt e selecione o tipo de recurso.</p>';
        return;
    }

    output.innerHTML = '<p>Gerando recurso com IA, por favor aguarde...</p>';

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: `Tipo de Recurso: ${tipo}\n${promptText}` }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.status}`);
        }

        const data = await response.json();

        // Tratamento de resposta do Gemini
        const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (result) {
            output.innerHTML = `<p>${result.replace(/\n/g, '<br>')}</p>`;
        } else {
            output.innerHTML = '<p style="color:red;">A resposta da IA veio vazia. Tente novamente com outro prompt.</p>';
        }

    } catch (error) {
        console.error('Erro ao chamar a API Gemini:', error);
        output.innerHTML = `<p style="color:red;">Erro ao gerar recurso: ${error.message}</p>`;
    }
});
