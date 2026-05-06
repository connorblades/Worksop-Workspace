(function () {
  'use strict';

  /* ── 1. Directional reveals (animate-left / animate-right / animate-scale / animate-fade) ── */
  var dirObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        dirObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-left, .animate-right, .animate-scale, .animate-fade')
    .forEach(function (el) { dirObserver.observe(el); });

  /* ── 2. Scroll progress bar ── */
  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  /* ── 3. Parallax for [data-parallax] ── */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (parallaxEls.length) {
    function updateParallax() {
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var speed = parseFloat(el.dataset.parallax) || 0.25;
        var offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = 'translateY(' + offset.toFixed(2) + 'px)';
      });
    }
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  /* ── 4. Magnetic buttons ── */
  document.querySelectorAll('.btn-magnetic').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      var y = (e.clientY - rect.top - rect.height / 2) * 0.22;
      btn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  /* ── 5. Lazy-load office reel video when it enters viewport ── */
  var reelVideo = document.querySelector('.office-reel-video[data-src]');
  if (reelVideo) {
    var reelObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var src = reelVideo.dataset.src;
          if (src) {
            var source = reelVideo.querySelector('source');
            if (source) source.src = src;
            reelVideo.load();
            reelVideo.play().catch(function () {});
          }
          reelObserver.unobserve(reelVideo);
        }
      });
    }, { threshold: 0.2 });
    reelObserver.observe(reelVideo);
  }

  /* ── 6. Webhook capture: POST waitlist + contact to Go High Level ────
     The page's own submit handler still owns the UX (button text +
     modal close). This listener fires in the capture phase so it
     runs first, snapshots the form, fires off the webhook POST as
     fire-and-forget. URL-encoded body avoids a CORS preflight.

     The `tags` field is a comma-separated string GHL can route
     directly into Contact tags via a webhook-trigger workflow. */
  var WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/3Ow2c51hQvMKxgtUBSvX/webhook-trigger/17baff3f-5e42-4aed-ab29-d12fa0c12f06';

  /* Dropdown value -> human-readable tag for GHL */
  var INTEREST_TAGS = {
    'hot-desk':         'Hot Desk',
    'hot-desk-weekly':  'Hot Desk Weekly',
    'private-office':   'Private Office',
    'not-sure':         'Undecided'
  };

  /* Form source -> tag prefix so you can segment website leads
     from any other GHL inbound source */
  var SOURCE_TAGS = {
    'waitlist': 'Website Waitlist',
    'contact':  'Website Contact'
  };

  function postLead(form, source) {
    var params = new URLSearchParams();
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && el.value && !el.disabled) params.append(el.name, el.value);
    });

    /* Build tag list: source tag + interest tag (if a dropdown
       option is selected). GHL accepts a comma-separated string. */
    var tags = [];
    if (SOURCE_TAGS[source]) tags.push(SOURCE_TAGS[source]);
    var typeEl = form.elements['type'];
    if (typeEl && typeEl.value && INTEREST_TAGS[typeEl.value]) {
      tags.push(INTEREST_TAGS[typeEl.value]);
    }
    if (tags.length) params.append('tags', tags.join(','));

    params.append('source', source);
    params.append('page', location.pathname);
    params.append('referrer', document.referrer || '');
    params.append('submitted_at', new Date().toISOString());

    try {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        mode: 'no-cors',
        keepalive: true
      }).catch(function () { /* swallow — UX already optimistic */ });
    } catch (e) { /* legacy browsers */ }
  }

  function bindLeadForm(id, source) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function () {
      postLead(form, source);
    }, { capture: true });
  }

  bindLeadForm('waitlist-form', 'waitlist');
  bindLeadForm('contact-form',  'contact');

}());
