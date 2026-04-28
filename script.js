document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const outputScreen = document.getElementById('output-screen');
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Default creative code example
    codeEditor.value = `متغير الرصيد = 1000;
متغير الهدف = 1500;
متغير الشهر = 1;

اطبع("--- حساب التوفير المتقدم ---");
بينما (الرصيد < الهدف) {
    الرصيد = الرصيد + 150;
    الشهر = الشهر + 1;
}

اطبع("عدد الأشهر المستغرقة:");
اطبع(الشهر - 1);
اطبع("الرصيد النهائي أصبح:");
اطبع(الرصيد);`;

    runBtn.addEventListener('click', async () => {
        const code = codeEditor.value.trim();
        if (!code) return;

        // Start loading state
        runBtn.disabled = true;
        runBtn.style.opacity = '0.7';
        runBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 50 50" width="18" height="18">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            جاري التنفيذ...
        `;

        try {
            const response = await fetch('/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });

            if (!response.ok) {
                throw new Error('تعذر الاتصال بالخادم الداخلي. تأكد من تشغيل السيرفر.');
            }

            const data = await response.json();
            const outputText = data.output || "لا يوجد مخرجات.";
            
            if (outputText.includes('Error:') || outputText.includes('Exception') || outputText.includes('خطأ')) {
                outputScreen.innerHTML = `<span class="error-text">${escapeHtml(outputText)}</span>`;
            } else {
                outputScreen.textContent = outputText;
            }

        } catch (error) {
            outputScreen.innerHTML = `<span class="error-text">${escapeHtml(error.message)}</span>`;
        } finally {
            // End loading state
            runBtn.disabled = false;
            runBtn.style.opacity = '1';
            runBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                تشغيل الكود
            `;
        }
    });

    clearBtn.addEventListener('click', () => {
        outputScreen.textContent = '';
    });

    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }
});
