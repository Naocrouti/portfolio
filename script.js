document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    const response = await fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      body: JSON.stringify({ name, email, message })
    });
  
    if (response.ok) {
      alert('Email envoyé avec succès !');
    } else {
      alert('Erreur lors de l’envoi de l’email.');
    }
  });
  