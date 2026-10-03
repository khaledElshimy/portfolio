/* Progressive enhancement only — every feature here degrades to working HTML. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var prefersReduced = function () { return reduced.matches; };

  /* ---------------------------------------------------------------- header */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.setAttribute('data-stuck', String(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------------------------------------- mobile menu */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.mobile-menu');

  if (menuBtn && menu) {
    var setMenu = function (open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menu.setAttribute('data-open', String(open));
      menu.hidden = false; // visibility handled in CSS so the transition can run
      if (open) {
        var first = menu.querySelector('a, button');
        if (first) first.focus();
      }
    };

    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // Keep state sane when resizing up to desktop.
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setMenu(false);
    });
  }

  /* -------------------------------------------------------- scroll reveals */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var revealAll = function () {
    document.documentElement.classList.add('reveal-off');
    revealables.forEach(function (el) { el.classList.add('in'); });
  };

  // Arm the hidden state only now that the script is running. If this file
  // never executes, nothing is ever hidden.
  if (revealables.length) document.documentElement.classList.add('reveal-ready');
  // Backstop: whatever happens with the observer, show everything shortly after.
  window.setTimeout(revealAll, 2500);
  window.addEventListener('load', function () { window.setTimeout(revealAll, 1200); });

  if (!('IntersectionObserver' in window) || prefersReduced()) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Small stagger for siblings inside the same group.
        var group = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
        var i = group.indexOf(el);
        el.style.setProperty('--d', Math.min(i, 6) * 70 + 'ms');
        el.classList.add('in');
        revealObserver.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* -------------------------------------------------------------- hero art */
  var art = document.querySelector('.hero-art');
  if (art) {
    var knot = art.querySelector('.knot-tilt');

    // Pause the continuous animation when offscreen or when the tab is hidden.
    var setPaused = function (paused) { art.setAttribute('data-paused', String(paused)); };
    var offscreen = false;
    var hidden = false;
    var sync = function () { setPaused(offscreen || hidden); };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        offscreen = !entries[0].isIntersecting;
        sync();
      }, { threshold: 0.01 }).observe(art);
    }
    document.addEventListener('visibilitychange', function () {
      hidden = document.hidden;
      sync();
    });

    // Subtle pointer-driven tilt, desktop + fine pointer only.
    var fine = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    if (knot && fine.matches && !prefersReduced()) {
      var raf = 0, tx = 0, ty = 0;
      var apply = function () {
        raf = 0;
        knot.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
      };
      window.addEventListener('mousemove', function (e) {
        var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        tx = ((e.clientX - cx) / cx) * 13;
        ty = ((e.clientY - cy) / cy) * 13;
        if (!raf) raf = requestAnimationFrame(apply);
      }, { passive: true });
    }
  }

  /* --------------------------------------------------------------- filters */
  var filterBar = document.querySelector('[data-filters]');
  var list = document.querySelector('[data-stories]');

  if (filterBar && list) {
    var items = Array.prototype.slice.call(list.querySelectorAll('[data-cats]'));
    var countEl = document.querySelector('[data-count]');
    var current = 'all';

    var render = function (cat) {
      var shown = 0;
      items.forEach(function (el) {
        var match = cat === 'all' || el.getAttribute('data-cats').split(' ').indexOf(cat) > -1;
        el.hidden = !match;
        if (match) shown++;
      });
      if (countEl) {
        countEl.textContent = shown + ' of ' + items.length + ' shown';
      }
    };

    var setActive = function (cat) {
      filterBar.querySelectorAll('.filter').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === cat));
      });
    };

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      if (cat === current) return;
      current = cat;
      setActive(cat);
      if (prefersReduced()) { render(cat); return; }
      list.style.transition = 'opacity 140ms ease';
      list.style.opacity = '0';
      window.setTimeout(function () { render(cat); list.style.opacity = '1'; }, 140);
    });

    render('all');
    setActive('all');
  }

  /* ------------------------------------------------------- active nav link */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (a) {
          a.setAttribute('aria-current', String(a.getAttribute('href') === id));
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ------------------------------------------------------- youtube facade */
  // Swap the poster for the real embed only on click. Nothing reaches YouTube
  // before that, so the page makes no third-party request on load.
  document.querySelectorAll('[data-yt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-yt');
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = 'Trailer';
      frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      frame.setAttribute('style', 'width:100%;aspect-ratio:16/9;border:0;display:block');
      btn.parentNode.replaceChild(frame, btn);
    });
  });

  /* --------------------------------------------------- click-to-play video */
  document.querySelectorAll('[data-play]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var video = document.getElementById(btn.getAttribute('data-play'));
      if (!video) return;
      btn.hidden = true;
      video.hidden = false;
      video.setAttribute('controls', '');
      video.play().catch(function () { /* user can still use the controls */ });
    });
  });
})();
