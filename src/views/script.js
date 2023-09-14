document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const userData = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch('/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }
  
        const data = await response.json();
        console.log('Usuario registrado:', data);
        // Aquí puedes mostrar un mensaje de éxito o redirigir a otra página
      } catch (error) {
        console.error('Error:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    });
  });
  