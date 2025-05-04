const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { name, email, message } = JSON.parse(event.body);

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        name,
        email,
        message
      }
    })
  });

  // Récupère le message de réponse ou l'erreur
  const text = await response.text();

  // Vérifie si la réponse est ok (code 2xx)
  return {
    statusCode: response.status,
    body: response.ok
      ? JSON.stringify({ success: true }) // Si c'est OK, on renvoie un succès
      : JSON.stringify({ error: text })   // Sinon, on renvoie l'erreur
  };
};
