const inviaEmail = document.getElementById("btn_invia");
const btn_cancellaBozza = document.getElementById('Cancella_bozza');
const email = document.getElementById('mailValue');
const oggetto_mail = document.getElementById('oggettoValue');
const messaggio = document.getElementById('dettagliValue');
inviaEmail.addEventListener('click', function() {
    emailjs.init('dkVykgsHdumN4cCws');
    // Controlla se i campi sono vuoti
    if (email.value === '' || oggetto_mail.value === '' || messaggio.value === '') {
        alert("Per favore, completa tutti i campi prima di inviare l'email.");
        return; // Interrompe l'esecuzione della funzione se i campi sono vuoti
    }
    // Crea un oggetto con i parametri per l'invio dell'email
    const params = {
        email: email.value,
        oggetto_mail: oggetto_mail.value,
        messaggio: messaggio.value,
    }
    // Cambia il testo del pulsante durante l'invio
    inviaEmail.textContent = 'Invio...';
    // Invia l'email tramite EmailJS
    emailjs.send('service_9nsoibj', 'template_9qfnw2v', params)
    .then(function (response) {
        // Resetta i campi del modulo dopo l'invio
        email.value = ''
        oggetto_mail.value = ''
        messaggio.value = ''
        // Mostra un messaggio di successo
        alert("Email inviata con successo!");
        btn_invia.textContent = 'Invia';
    }, function (error) {
        // Mostra un messaggio di errore in caso di fallimento
        alert("Errore durante l'invio dell'email: " + error);
        // Resetta i campi del modulo in caso di errore
        btn_invia.textContent = 'Invia';
    });
})
btn_cancellaBozza.addEventListener('click', function(){
    email.value = ''
    oggetto_mail.value = ''
    messaggio.value = ''
})