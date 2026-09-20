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
  var grid = document.querySelector('[data-cards]');

  if (filterBar && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-categories]'));
    var countEl = document.querySelector('[data-count]');
    var emptyEl = document.querySelector('[data-empty]');
    var moreBtn = document.querySelector('[data-more]');
    var expanded = false;

    var FEATURED = 6;

    var visibleFor = function (cat) {
      return cards.filter(function (c) {
        return cat === 'all' || c.getAttribute('data-categories').split(' ').indexOf(cat) > -1;
      });
    };

    var render = function (cat) {
      var matching = visibleFor(cat);
      // When collapsed on "all", show only the featured six.
      var shown = (!expanded && cat === 'all') ? matching.slice(0, FEATURED) : matching;

      cards.forEach(function (c) { c.hidden = shown.indexOf(c) === -1; });

      if (countEl) {
        countEl.textContent = shown.length + ' of ' + cards.length + ' projects';
      }
      if (emptyEl) emptyEl.hidden = shown.length > 0;
      if (moreBtn) {
        // The control is only meaningful while "all" is collapsed or expanded.
        var relevant = cat === 'all' && matching.length > FEATURED;
        moreBtn.hidden = !relevant;
        moreBtn.textContent = expanded ? 'Show fewer projects' : 'View all projects';
        moreBtn.setAttribute('aria-expanded', String(expanded));
      }
    };

    var setActive = function (cat) {
      filterBar.querySelectorAll('.filter').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === cat));
      });
    };

    var current = 'all';

    var transitionTo = function (cat) {
      current = cat;
      setActive(cat);
      if (prefersReduced()) { render(cat); return; }
      // Fade the grid out and back in so results do not snap.
      grid.style.transition = 'opacity 150ms ease';
      grid.style.opacity = '0';
      window.setTimeout(function () {
        render(cat);
        grid.style.opacity = '1';
      }, 150);
    };

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      if (cat === current) return;
      if (cat !== 'all') expanded = true; // category views always show everything
      else expanded = false;
      transitionTo(cat);
    });

    if (moreBtn) {
      moreBtn.addEventListener('click', function () {
        expanded = !expanded;
        transitionTo(current);
        if (expanded) {
          // Move focus to the first newly revealed card for keyboard users.
          var revealed = visibleFor(current)[FEATURED];
          var link = revealed && revealed.querySelector('a');
          if (link) link.focus({ preventScroll: true });
        }
      });
    }

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
