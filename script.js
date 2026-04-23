// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.15, rootMargin: '-50px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ===== NETWORK CANVAS =====
const canvas = document.getElementById('networkCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let nodes = [], W, H, animFrame;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNodes(count = 40) {
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(17,34,64,${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(74,154,222,0.5)';
      ctx.fill();
    });
    animFrame = requestAnimationFrame(draw);
  }

  resize();
  createNodes();
  draw();
  window.addEventListener('resize', () => { resize(); createNodes(); });
}

// ===== CONTACT FORM (Web3Forms) =====
const form = document.getElementById('contactForm');
const formFields = document.getElementById('formFields');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');

// ⚠️ Reemplaza esto con tu Access Key de web3forms.com
const WEB3FORMS_KEY = '05689d10-95be-42e3-a8e6-40c86c57d45e';

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;

    const formData = {
      access_key: WEB3FORMS_KEY,
      subject: `Nueva consulta de ${form.nombre.value} - Nexova`,
      from_name: 'Nexova Web',
      nombre: form.nombre.value,
      empresa: form.empresa?.value || '',
      email: form.email.value,
      telefono: form.telefono?.value || '',
      message: form.mensaje.value,
      botcheck: ''
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (result.success) {
        formFields.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        throw new Error(result.message || 'Error al enviar');
      }
    } catch (err) {
      alert('Hubo un problema al enviar el mensaje. Por favor escríbenos directamente a nexova.industries@gmail.com');
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}
