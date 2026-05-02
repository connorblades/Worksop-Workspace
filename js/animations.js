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

}());
