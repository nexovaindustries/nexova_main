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

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formFields = document.getElementById('formFields');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;

    const data = {
      nombre: form.nombre.value,
      empresa: form.empresa?.value || '',
      email: form.email.value,
      telefono: form.telefono?.value || '',
      mensaje: form.mensaje.value
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        formFields.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        throw new Error('Error al enviar');
      }
    } catch (err) {
      // Fallback: open mailto
      window.location.href = `mailto:nexova.industries@gmail.com?subject=Consulta de ${data.nombre}&body=${encodeURIComponent(data.mensaje)}`;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}
