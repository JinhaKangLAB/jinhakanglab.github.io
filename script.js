/* ================================================================
   SITE-WIDE SCRIPT
   Shared by legacy pages that link to style.css (creative/*, cv/cv.html,
   work/ai2html.html, work/datavisualization.html, work/productdesign_ai2html.html).
   Newer pages (sports.html, editorial.html, amazon.html, ecommerce.html,
   onthegoga.html, index.html) inline this same logic and don't need this file.
   ================================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    /* ── CUSTOM CURSOR ── */
    var cursorRing = document.getElementById('cursor-ring');
    var cursorDot  = document.getElementById('cursor-dot');

    if (cursorRing && cursorDot) {
      var cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;

      document.addEventListener('mousemove', function (e) {
        document.body.classList.add('mouse-moved');
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top  = cursorY + 'px';
      });

      (function animateCursor() {
        ringX += (cursorX - ringX) * 0.13;
        ringY += (cursorY - ringY) * 0.13;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top  = ringY + 'px';
        requestAnimationFrame(animateCursor);
      })();

      function cursorGrow() {
        cursorRing.style.width  = '52px';
        cursorRing.style.height = '52px';
        cursorRing.style.opacity = '0.5';
      }
      function cursorReset() {
        cursorRing.style.width  = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.opacity = '1';
      }
      document.querySelectorAll('a, button').forEach(function (el) {
        el.addEventListener('mouseenter', cursorGrow);
        el.addEventListener('mouseleave', cursorReset);
      });
    }

    /* ── HAMBURGER / MOBILE MENU ── */
    var hamburger = document.querySelector('.hamburger');
    var menu      = document.querySelector('.menu');
    if (hamburger && menu) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
      });
      document.querySelectorAll('.menu-item a').forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.classList.remove('active');
          menu.classList.remove('active');
        });
      });
    }

    /* ── NAV SCROLL STATE ── */
    var nav = document.querySelector('nav');
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      }, { passive: true });
    }

    /* ── ANIMATED FAVICON ──
       Most browsers (Chrome, Edge, Safari) only render the first frame
       of an animated GIF favicon. To actually animate it everywhere we
       manually cycle the <link rel="icon"> through individual frame
       PNGs in images/favicon-frames/. */
    var favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      var faviconBase  = favicon.href.replace(/[^/]*$/, 'favicon-frames/f');
      var faviconFrame = 0;
      var faviconTotal = 16;
      setInterval(function () {
        faviconFrame = (faviconFrame + 1) % faviconTotal;
        favicon.href = faviconBase + (faviconFrame < 10 ? '0' : '') + faviconFrame + '.png';
      }, 80);
    }
  });
})();
