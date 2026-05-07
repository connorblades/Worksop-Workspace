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
    'hot-desk':         'Hot Desk Daily',
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

  /* Single submit handler per form. Capture phase + stopImmediatePropagation
     stops any per-page bubble-phase handlers from running, so the broken
     contact-page handler (PLACEHOLDER_WEBHOOK_URL, references to renamed
     #cf-name) can't error and can't intercept. The button is disabled
     immediately so a triple-click only fires one webhook + one redirect. */
  function bindLeadForm(id, source) {
    var form = document.getElementById(id);
    if (!form) return;
    var submitting = false;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (submitting) return;
      submitting = true;

      var btn = form.querySelector('button[type="submit"], .form-submit, .cf-submit');
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.7';
        btn.textContent = 'Sending…';
      }

      postLead(form, source);

      /* Brief delay so the keepalive POST has a chance to dispatch
         before we navigate away. With keepalive: true the request
         continues even after navigation, so 120ms is plenty. */
      setTimeout(function () {
        window.location.href = '/thank-you/?source=' + encodeURIComponent(source);
      }, 120);
    }, { capture: true });
  }

  bindLeadForm('waitlist-form', 'waitlist');
  bindLeadForm('contact-form',  'contact');

  /* ── 7. Chat widget — floating bottom-right, FAQ-driven ─────────────
     Injects a chat button + panel into every page. The knowledge base
     below is keyword-matched against the user's input; the highest
     scoring entry wins, with a fallback to a "talk to the team" CTA
     if nothing matches. */
  if (document.querySelector('.ww-chat-toggle')) return;

  var KB = [
    { keys: ['hello','hi ','hi!','hi.','hey','hiya','good morning','good afternoon','good evening'],
      a: 'Hi! 👋 Ask me about pricing, opening dates, location, parking, broadband, anything you like.' },
    { keys: ['price','cost','how much','rate','rates'],
      a: '<p>Here is what we charge:</p><ul><li><strong>Hot Desk Daily</strong>: £12 per day</li><li><strong>Hot Desk Weekly</strong>: £50 per week</li><li><strong>Private Office</strong>: from £125 per week (size dependent)</li></ul><p>All plans include free parking, 1 Gbps fibre and unlimited filter coffee.</p>' },
    { keys: ['private office','team office','office for','my office','rent an office','office space'],
      a: 'Private offices start from <strong>£125 per week</strong>. Lockable, fitted out for teams of 2 to 8 people, with all building amenities included. Want to <a href="/contact">book a viewing</a>?' },
    { keys: ['hot desk','daily desk','one day','drop in'],
      a: 'Hot desks are <strong>£12 per day</strong>. Walk in, pick a desk, get to work. No commitment, no membership required.' },
    { keys: ['weekly','week','5 days','five days','monday to friday'],
      a: 'The Hot Desk Weekly is <strong>£50 per week</strong>, rolling. No long contract. Same building every weekday — a proper rhythm without committing to a fixed desk.' },
    { keys: ['meeting room','boardroom','book a room','meeting space'],
      a: 'The boardroom is part of <strong>Phase 2</strong> and opens later in the year. It seats up to 10, with a whiteboard wall, fast broadband and free parking for all attendees. <strong>From £20 per hour.</strong>' },
    { keys: ['when','open ','opening','launch','launch date','start date','available from','first of june','1 june'],
      a: 'We are opening <strong>1 June 2026</strong> on Carlton Road, Worksop. Phase 2 (boardroom, podcast studio, basement zone) follows a few months later.' },
    { keys: ['where','location','address','find you','directions','postcode','carlton road'],
      a: '<strong>30 Carlton Road, Worksop, S80 1PH.</strong> Two minutes from the town centre and an 8-minute walk from Worksop train station.' },
    { keys: ['park','parking','car space','spaces'],
      a: 'Yes — <strong>free parking on site</strong>. No permits, no meters, no time limit.' },
    { keys: ['coffee','tea','drink','beverage','filter coffee'],
      a: 'Yes, <strong>unlimited filter coffee, tea and water</strong> are included with every membership. Help yourself.' },
    { keys: ['wifi','wi-fi','internet','broadband','fibre','speed','gbps'],
      a: '<strong>1 Gbps dedicated fibre.</strong> Not shared, not throttled. Roughly 24 times the average Bassetlaw home connection — your video calls will not stutter.' },
    { keys: ['hour','what time','opening time','open from','closing time','9 to 5','9-5','close','what days'],
      a: 'Phase 1 is open <strong>Monday to Friday during business hours</strong>. Extended access is planned for a later phase.' },
    { keys: ['contact','email','phone','call','get in touch','reach you','hello@'],
      a: 'Email <a href="mailto:hello@worksopworkspace.com">hello@worksopworkspace.com</a> or fill in the form via the "Join the Waiting List" button at the top of the page.' },
    { keys: ['print','scan','printer'],
      a: 'Printing is something we are looking at adding once we have been open a little while. Not in the day-one offering.' },
    { keys: ['member','sign up','register','join','waiting list','founder','founding'],
      a: 'You can <strong>join the waiting list</strong> using the orange button at the top of any page. Founding members get priority access and locked-in rates.' },
    { keys: ['food','lunch','eat','restaurant'],
      a: 'No kitchen on day one, but the town centre is two minutes away with plenty of lunch options. The basement coffee shop zone (Phase 2) will have food.' },
    { keys: ['tour','visit','look around','view ','see the space','see it'],
      a: 'Yes, we would love to show you round. <a href="/contact">Get in touch</a> with a couple of times that work for you and we will arrange a walk-around before opening.' },
    { keys: ['sponsor','partner','who is behind','who runs','founder','funded by','backed by'],
      a: 'Worksop Workspace is supported by two founding sponsors: <a href="https://www.bullseyeproperties.co.uk/" target="_blank" rel="noopener">Bullseye Properties Ltd</a> and <a href="https://southyorkshirepropertybuyers.com/" target="_blank" rel="noopener">South Yorkshire Property Buyers</a>. <a href="/sponsors">Read more about our sponsors</a>.' },
    { keys: ['podcast','studio','recording','record'],
      a: 'A <strong>podcast and recording studio</strong> is coming as part of Phase 2 — acoustically treated for content creators, podcasters and business owners. Around £40 per hour.' },
    { keys: ['blog','journal','article','read'],
      a: 'You can read articles for freelancers and remote workers in north Notts on our <a href="/blog">Journal</a> page — pieces on commuting costs, broadband in Bassetlaw villages, hybrid worker maths and more.' },
    { keys: ['membership','plans','membership options','what membership'],
      a: 'Three options: <strong>Hot Desk daily</strong> (£12), <strong>Hot Desk weekly</strong> (£50/wk), and <strong>Private Office</strong> (from £125/wk). All include parking, fibre, coffee and meeting room access. <a href="/membership">See full details</a>.' },
    { keys: ['floor plan','floorplan','layout','how big','square feet','sqft','square metres'],
      a: 'The building is <strong>4,086 sqft (379.6 m²)</strong> across two floors. <a href="/space">See the floor plan</a> on our Space page — colour-coded so you can see quiet desks, private offices, hourly rooms and communal areas at a glance.' },
    { keys: ['train','station','rail','sheffield','retford','lincoln'],
      a: 'Worksop train station is an <strong>8-minute walk</strong>. Direct services to Sheffield (22 min), Retford (12 min) and Lincoln. Carlton Road is on the same side of town as the rail and bus connections.' },
    { keys: ['bus','public transport','transport'],
      a: 'Carlton Road bus stop is a <strong>one-minute walk</strong> from the door. Stagecoach and Travel Master routes connect Worksop with Bassetlaw, Doncaster and Sheffield.' },
    { keys: ['quiet','focus','focused','noisy','noise','can i concentrate'],
      a: 'Yes — quiet, focused work is the <strong>blue zone</strong> on the floor plan. Plus there is a private room with a door that closes if you need to take a call.' },
    { keys: ['social','community','people','meet','networking'],
      a: 'There is a community of locals — freelancers, small teams, remote workers, tradespeople. Read more about <a href="/community">who works here</a>. The orange zone on the floor plan is communal social space.' },
    { keys: ['discount','deal','offer','founder rate','founding member'],
      a: 'Founding members get <strong>locked-in rates</strong> and priority access when we open. Get on the waiting list now to secure them.' },
    { keys: ['thank','thanks','cheers','great','perfect','awesome','ta'],
      a: 'You are welcome. Anything else I can help with?' },
  ];

  var FALLBACK = 'I do not have an answer for that one off the top of my head. The team can definitely help though — drop us an email at <a href="mailto:hello@worksopworkspace.com">hello@worksopworkspace.com</a> or use the "Join the Waiting List" button to leave your details.';

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  function findAnswer(text) {
    var input = (text || '').toLowerCase().trim();
    if (!input) return null;
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      var score = 0;
      for (var j = 0; j < entry.keys.length; j++) {
        if (input.indexOf(entry.keys[j]) !== -1) {
          score += entry.keys[j].length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }
    return best ? best.a : FALLBACK;
  }

  // Inject DOM
  var toggle = document.createElement('button');
  toggle.className = 'ww-chat-toggle';
  toggle.setAttribute('aria-label', 'Open chat');
  toggle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'ww-chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Worksop Workspace chat');
  panel.innerHTML =
    '<div class="ww-chat-header">' +
      '<div>' +
        '<div class="ww-chat-header-title">Worksop Workspace</div>' +
        '<div class="ww-chat-header-sub">Ask us anything</div>' +
      '</div>' +
      '<button class="ww-chat-close" aria-label="Close chat">&times;</button>' +
    '</div>' +
    '<div class="ww-chat-messages"></div>' +
    '<div class="ww-chat-quick">' +
      '<button class="ww-chat-chip">How much is it?</button>' +
      '<button class="ww-chat-chip">When are you opening?</button>' +
      '<button class="ww-chat-chip">Where are you?</button>' +
      '<button class="ww-chat-chip">Is parking included?</button>' +
      '<button class="ww-chat-chip">Is coffee included?</button>' +
    '</div>' +
    '<form class="ww-chat-input-row">' +
      '<input type="text" class="ww-chat-input" placeholder="Ask anything…" autocomplete="off" />' +
      '<button type="submit" class="ww-chat-send" aria-label="Send"><svg viewBox="0 0 24 24" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>' +
    '</form>';

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  var messagesEl = panel.querySelector('.ww-chat-messages');
  var formEl     = panel.querySelector('.ww-chat-input-row');
  var inputEl    = panel.querySelector('.ww-chat-input');
  var quickEl    = panel.querySelector('.ww-chat-quick');
  var greeted    = false;

  function append(html, who) {
    var msg = document.createElement('div');
    msg.className = 'ww-chat-msg ww-chat-msg-' + who;
    msg.innerHTML = html;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function botSay(html) {
    var typing = document.createElement('div');
    typing.className = 'ww-chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    setTimeout(function () {
      typing.remove();
      append(html, 'bot');
    }, 550 + Math.random() * 350);
  }

  function userAsks(text) {
    append(escapeHtml(text), 'user');
    inputEl.value = '';
    botSay(findAnswer(text));
  }

  function openChat() {
    toggle.classList.add('is-open');
    panel.classList.add('is-open');
    if (!greeted) {
      greeted = true;
      botSay('Hi! 👋 I can help with pricing, opening dates, location, parking, broadband, all the usual. What would you like to know?');
    }
    setTimeout(function () { inputEl.focus(); }, 250);
  }
  function closeChat() {
    toggle.classList.remove('is-open');
    panel.classList.remove('is-open');
  }

  toggle.addEventListener('click', openChat);
  panel.querySelector('.ww-chat-close').addEventListener('click', closeChat);
  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = inputEl.value.trim();
    if (v) userAsks(v);
  });
  quickEl.addEventListener('click', function (e) {
    if (e.target.classList && e.target.classList.contains('ww-chat-chip')) {
      userAsks(e.target.textContent);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closeChat();
  });

}());
