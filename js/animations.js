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

  /* ── 7. Chat widget. floating bottom-right, content-driven Q&A ─────
     Knowledge base built from public website content + customer-safe
     parts of our internal points-of-truth doc. Matching uses tokenised
     scoring so vague phrases ("what do I do then?", "tell me about
     this") still resolve to a useful answer.

     SAFETY: SENSITIVE_PATTERNS catches financial / staff / backend
     questions and refuses politely with a contact route, so this
     widget can't leak revenue, costs, bank details, internal team
     names or private docs even if someone asks directly. */
  if (document.querySelector('.ww-chat-toggle')) return;

  /* Sensitive topics we won't answer here. If the user input matches
     any of these, we return a calm refusal pointing them to email. */
  var SENSITIVE_PATTERNS = [
    /\b(revenue|profit|turnover|earnings|net worth|valuation)\b/,
    /\b(financial|finances|p&l|p and l|balance sheet|accounts|takings|takings|gross|salary|salaries|wage|wages|pay slip|payslip)\b/,
    /\bhow much (?:does|do) (?:the |this |you |they |we )?(?:business |company |place |it )?(?:make|earn|take|generate)\b/,
    /\b(?:director'?s? )?(?:pay|salary|earnings)\b/,
    /\b(?:bank|banking) (?:details|account|info|information|number)\b/,
    /\b(?:account number|sort code|iban|swift)\b/,
    /\b(?:vat number|tax id|tax number|company number|registration number)\b/,
    /\b(staff|employees) (?:details|info|information|list|names|salaries|pay)\b/,
    /\bwho works (?:at|for) (?:the |this )?(?:company|business|workspace)?\s*(?:office|hq)?\??$/,
    /\b(?:home address|director address|registered (?:office )?address)\b/,
    /\b(?:phone number|mobile number|personal number|direct line)\b/,
    /\b(?:investor|investment) (?:details|deck|memo)\b/,
    /\b(supplier|suppliers|landlord|lease cost|rent)\b/,
    /\b(?:internal|backend|admin) (?:doc|docs|document|documents|details)\b/,
    /\b(?:lord cnb|cnb accommodation)\b/i,
  ];

  var SENSITIVE_REPLY = 'That is not something I can share through chat. For any business or finance questions, the best route is to email <a href="mailto:hello@worksopworkspace.com">hello@worksopworkspace.com</a> directly and the team will come back to you personally.';

  var KB = [
    /* Greetings ----------------------------------------------- */
    { keys: ['hello','hi','hey','hiya','good morning','good afternoon','good evening','howdy','yo'],
      a: "Hey! 👋 Lovely to have you. Ask me anything about Worksop Workspace. Pricing, opening dates, what is in the building, who works here, all sorts. What can I help with?" },

    /* Pricing. general — leads with a qualifier question so we can
       point them at the right tier rather than dumping everything */
    { keys: ['price','prices','cost','costs','how much','rate','rates','pricing','charge','charges'],
      a: "<p>Depends what you are after. Which sounds most like you?</p>",
      qr: ['Drop in occasionally','A permanent base for the week','A private office for a team','Show me everything'] },

    /* Qualifier-response routes ------------------------------- */
    { keys: ['drop in occasionally','occasional','occasionally','some days','a few days','now and then','sometimes','flexible','as needed','when i need'],
      a: "<p><strong>Hot Desk Daily, £12 a day.</strong> Walk in, plug in, no commitment. Includes parking, coffee and 1 Gbps fibre. If you end up coming 3+ days a week, the weekly works out cheaper.</p>",
      qr: ['Weekly desk details','Join the waiting list','Where are you?'] },
    { keys: ['permanent base','my base','full week','every day','every weekday','my regular','consistent','rhythm','same place every day'],
      a: "<p><strong>Hot Desk Weekly, £50 a week.</strong> Rolling weekly, no long contract. Same building every day, builds a proper rhythm. Parking, coffee and fibre all included.</p>",
      qr: ['Dedicated desk details','Cancellation policy','Join the waiting list'] },
    { keys: ['office for team','for my team','small team','team of','my company','my business','a few of us'],
      a: "<p><strong>Private Office, from £125 a week.</strong> Lockable, fits 1-4 people, exact rate depends on the room size. Best to come for a viewing so we match the right room to your team.</p>",
      qr: ['What is included?','Book a viewing','Join the waiting list'] },
    { keys: ['show me everything','show me all','all prices','all the prices','all options','full pricing','everything','give me everything','full breakdown','show all'],
      a: "<ul><li><strong>Hot Desk Daily</strong>: £12/day</li><li><strong>Hot Desk Weekly</strong>: £50/week, rolling</li><li><strong>Private Office</strong>: from £125/week</li></ul><p>All include parking, coffee and 1 Gbps fibre. No VAT.</p>",
      qr: ['What is included?','When are you opening?','Join the waiting list'] },
    { keys: ['not sure yet','not sure which','no idea','i dunno','undecided','help me pick','help me choose','which one','which is best'],
      a: "<p>No stress. Roughly how often would you use it?</p>",
      qr: ['One or two days a week','Most days of the week','Every working day','It would be a small team'] },

    /* Frequency-response routes for the "not sure" branch ---- */
    { keys: ['one or two days','one or two days a week','occasional days','couple of days','few days a week'],
      a: "<p><strong>Hot Desk Daily at £12</strong> is the one. No commitment, walk in when you need a focused day.</p>",
      qr: ['Join the waiting list','Where are you?','What is included?'] },
    { keys: ['most days','most of the week','three or four days','four days'],
      a: "<p><strong>Hot Desk Weekly, £50 a week.</strong> Rolling, no long contract. Sweet spot for hybrid workers.</p>",
      qr: ['Dedicated desk details','Cancellation policy','Join the waiting list'] },
    { keys: ['every working day','every day','5 days a week','five days a week','full time'],
      a: "<p>You want a <strong>dedicated desk</strong> on the weekly plan, or a <strong>private office</strong> from £125 a week if you want a door that closes.</p>",
      qr: ['Private office details','Dedicated desk details','Join the waiting list'] },
    { keys: ['small team','its a team','team of two','team of three','team of four','few of us would come'],
      a: "<p>That points to a <strong>Private Office</strong>. From £125/week, lockable, 1-4 people, rate depends on room size.</p>",
      qr: ['Book a viewing','What is included?','Join the waiting list'] },

    /* Pricing. specific tiers -------------------------------- */
    { keys: ['private office','team office','office for','rent an office','office space','office cost','office price','my own office','lockable office','dedicated office','private office details'],
      a: 'Private offices start at <strong>£125 a week</strong>. Lockable rooms for small teams of 1 to 4 people, with all the building amenities included. The exact rate depends on the size of the office. Want to <a href="/contact">come and have a look around</a>? Or get on the waiting list at the top of the page and we will be in touch.' },
    { keys: ['hot desk','daily desk','one day','drop in','day pass','day rate','single day'],
      a: "Hot desks are <strong>£12 a day</strong>. Walk in, pick any free desk, plug in and get on with it. No commitment, no contract. Properly low-friction. If it suits you, the orange button at the top puts your name on the list for founding rates." },
    { keys: ['weekly','week rate','5 days','five days','full week','weekly desk','desk for the week','rolling','weekly desk details','about the weekly'],
      a: "The Hot Desk Weekly is <strong>£50 a week</strong>, rolling weekly. Same building every weekday so you build a proper rhythm. Works out at roughly the cost of four day passes for the full week, with no long contract. Most weekly members tell us it is the consistency of one place to work that changes their week." },
    { keys: ['dedicated desk','reserved desk','same desk','my desk','permanent desk','fixed desk','dedicated desk details'],
      a: 'A dedicated desk is your reserved seat. same desk every visit. Available as part of the weekly subscription. <a href="/membership">See membership</a> for full details.' },
    { keys: ['meeting room','boardroom','book a room','meeting space','board room','room hire','client meeting'],
      a: 'The boardroom is part of <strong>Phase 3</strong>, bookable by the hour, ideal for client meetings, interviews and workshops. <a href="/meeting-room">Read more</a>.' },
    { keys: ['podcast','studio','recording','record','audio'],
      a: 'A <strong>podcast and recording studio</strong> is part of Phase 3. Acoustically treated for content creators, podcasters and business owners. <a href="/podcast-studio">Read more</a>.' },
    { keys: ['hourly','by the hour','per hour','hour rate'],
      a: 'Hourly hot desk access is available as a pay as you go option. Hourly bookings on the boardroom and podcast studio (Phase 3) will be open to members and visitors.' },

    /* Opening + phases ---------------------------------------- */
    { keys: ['when','opening','launch','launch date','start date','available from','first of june','1 june','june 1','june','date'],
      a: "We open <strong>1 June 2026</strong> on Carlton Road. Phase 2 (basement coffee shop) and Phase 3 (boardroom + podcast studio) follow later in the year." },
    { keys: ['phase','phase 1','phase 2','phase 3','phases','first phase','second phase','third phase','later'],
      a: '<ul><li><strong>Phase 1</strong> (1 June): hot desks, dedicated desks, private offices</li><li><strong>Phase 2</strong>: basement coffee shop zone, kitchen</li><li><strong>Phase 3</strong>: boardroom, podcast studio</li></ul>' },
    { keys: ['progress','build','construction','fit out','fit-out','renovation','update'],
      a: 'Phase 0 is the current build phase. Fit out is underway and the waiting list is open. We are happy to share progress photos with anyone interested. <a href="/contact">Drop us a message</a>.' },

    /* Location ------------------------------------------------ */
    { keys: ['where','location','address','find you','find this','directions','postcode','carlton road','near','closest','located'],
      a: "<strong>Carlton Road, Worksop town centre.</strong> Two minutes from the high street, eight from the train station. Free parking outside." },

    /* Parking ------------------------------------------------- */
    { keys: ['park','parking','car space','car spaces','where do i park','car park','drive','vehicle'],
      a: "Yes, <strong>free parking on site</strong>. No permits, no meters, no time limit." },

    /* Refreshments -------------------------------------------- */
    { keys: ['coffee','tea','drinks','drink','beverage','filter coffee','espresso','refreshment','refreshments','water'],
      a: "Yes, <strong>unlimited tea, coffee and water</strong> are included. No buying coffee to justify the seat." },
    { keys: ['food','lunch','eat','restaurant','snack','breakfast','meal'],
      a: 'No formal kitchen in Phase 1, but the town centre is two minutes away with plenty of lunch options. The basement coffee shop zone (Phase 2) will include a self catering kitchen.' },

    /* Connectivity -------------------------------------------- */
    { keys: ['wifi','wi-fi','internet','broadband','fibre','fiber','speed','gbps','mbps','connection','bandwidth','network'],
      a: '<strong>1 Gbps fibre Wi-Fi.</strong> Roughly 24x the average Bassetlaw home. Video calls won't stutter.' },

    /* Hours --------------------------------------------------- */
    { keys: ['hour','hours','what time','opening time','open from','closing time','9 to 5','9-5','what days','24/7','out of hours','evening','weekend','24 hour'],
      a: '<strong>8am to 5pm Monday to Friday</strong> in Phase 1. Later phases bring 24/7 QR access for members.' },

    /* Furniture / equipment ----------------------------------- */
    { keys: ['chair','desk','furniture','ergonomic','monitor','locker','storage','equipment'],
      a: "Every dedicated desk has drawers for your stuff. They are not lockable in Phase 1, but they will be in later phases. If you are hot desking, just take your bag with you when you leave for lunch. Comfortable ergonomic chairs and full-size desks throughout." },

    /* Contact ------------------------------------------------- */
    { keys: ['contact','email','phone','call','get in touch','reach you','hello@','message','speak to'],
      a: 'Email <a href="mailto:hello@worksopworkspace.com">hello@worksopworkspace.com</a> or fill in the form via the "Join the Waiting List" button at the top of the page. Or use the <a href="/contact">contact page</a>.' },

    /* Joining ------------------------------------------------- */
    { keys: ['member','membership','sign up','register','join','waiting list','founding','enquiry','enquire','enquiry form'],
      a: "Yes please! Hit the orange <strong>Join the Waiting List</strong> button at the top. 30 seconds. Founders get first dibs and the founder rate locked in." },

    /* Onboarding journey -------------------------------------- */
    { keys: ['process','onboarding','sign up process','first day','first visit','induction','starting','get started'],
      a: '<p>The journey is straightforward:</p><ol><li>Initial conversation to understand what you need (private office, dedicated desk, or hot desk).</li><li>Match to the right plan.</li><li>Tour of the space.</li><li>Sign up via Stripe (direct debit for weekly plans, card for day passes).</li></ol><p>No formal induction on day one. You are shown around, given the Wi-Fi, and you sit down and work. That is the entire point.</p>' },
    { keys: ['app','member app','book a desk','book a session','qr code','check in','occupancy'],
      a: 'Members get a dedicated app for booking desks and rooms, checking real-time availability, accessing their QR code for entry, raising issues, and managing their membership. Check-in is automatic when the QR is scanned.' },
    { keys: ['cancel','cancellation','contract','lock in','locked in','tied in','commitment','minimum term','notice period','cancellation policy'],
      a: 'No long contracts and no lock in. Membership rolls weekly and you can cancel directly through the member app. no excessive notice periods. The system is designed to be as flexible as the membership itself.' },

    /* Tour / viewing ------------------------------------------ */
    { keys: ['tour','visit','look around','view','see the space','see it','viewing','walk around','walk around','show me','see inside'],
      a: "Yes, we'd love to have you round. <a href=\"/contact\">Drop us a message</a> with a couple of times that work. No pitch, no pressure." },

    /* What is included --------------------------------------- */
    { keys: ['included','what do i get','what comes with','amenities','what is included','what features','perks','benefits','what is in','what comes'],
      a: '<p>Every membership and visit includes:</p><ul><li>Unlimited tea, coffee and water</li><li>High-speed Wi-Fi throughout</li><li>Proper ergonomic desk and chair</li><li>Lockers for personal storage</li><li>Free on site parking</li><li>Access to meeting rooms (later phases)</li></ul>' },

    /* Print / scan ------------------------------------------- */
    { keys: ['print','scan','printer','printing','copy'],
      a: 'Printing is something we are looking at adding once we have been open a little while. Not in the day-one offering.' },

    /* Sponsors ------------------------------------------------ */
    { keys: ['sponsor','sponsors','partner','partners','funded by','backed by'],
      a: 'Worksop Workspace is supported by two founding sponsors: <a href="https://www.bullseyeproperties.co.uk/" target="_blank" rel="noopener">Bullseye Properties Ltd</a> and <a href="https://southyorkshirepropertybuyers.com/" target="_blank" rel="noopener">South Yorkshire Property Buyers</a>. <a href="/sponsors">Read more</a>.' },

    /* Resources ----------------------------------------------- */
    { keys: ['blog','journal','article','articles','read','content','posts','resources'],
      a: 'You can read articles for freelancers and remote workers in north Notts on our <a href="/blog">Journal</a> page: pieces on commuting costs, broadband in Bassetlaw villages, hybrid worker maths, working alone in Worksop, the cost of working from a coffee shop, and more.' },

    /* Floor plan / size --------------------------------------- */
    { keys: ['floor plan','floorplan','layout','how big','square feet','sqft','square metres','size','space','spaces','two floors','basement','ground floor'],
      a: 'The building is <strong>4,086 sqft (379.6 m²)</strong> across two floors. <a href="/space">See the floor plan</a> on our Space page, colour-coded so you can see quiet desks (blue), private offices (green), hourly rooms (red), communal spaces (orange) and the coffee shop zone (purple) at a glance.' },

    /* Transport ----------------------------------------------- */
    { keys: ['train','station','rail','sheffield','retford','lincoln','train times','platform','railway'],
      a: 'Worksop train station is an <strong>8-minute walk</strong>. Direct services to Sheffield (22 min), Retford (12 min) and Lincoln. Same side of town as the bus interchange.' },
    { keys: ['bus','public transport','transport','stagecoach'],
      a: 'Carlton Road bus stop is a <strong>one-minute walk</strong> from the door. Stagecoach and Travel Master routes connect Worksop with Bassetlaw, Doncaster and Sheffield.' },
    { keys: ['drive','driving','from doncaster','from retford','from mansfield','from sheffield','distance','how far','commute'],
      a: 'By car: Retford 15 min, Doncaster 20 min, Mansfield 25 min, Sheffield 25 min. Five minutes from the A57. Free parking on site once you arrive.' },

    /* Atmosphere / fit ---------------------------------------- */
    { keys: ['quiet','focus','focused','noisy','noise','concentrate','distract','distractions','silent'],
      a: 'Yes. quiet, focused work is the <strong>blue zone</strong> on the floor plan. There is also a private room with a door that closes if you need to take a call without disturbing anyone.' },
    { keys: ['social','community','people','meet','networking','who else','who works','clients','customers','others'],
      a: 'There is a community of locals here for the same reason: freelancers, small teams, remote workers, tradespeople. People who came to do their work, not to be sold to. <a href="/community">Read more about who works here</a>.' },
    { keys: ['for me','suit me','right for','is this for','should i','my type','my kind','will it work for','work for me'],
      a: "<p>Probably yes if any of these sound like you:</p><ul><li>Remote employee at a kitchen table</li><li>Tradesperson doing admin from the van</li><li>Freelancer bouncing between coffee shops</li><li>Small business that doesn't need a full lease</li><li>Home worker who wants more structure</li></ul>",
      qr: ['How much is it?','Book a viewing','Join the waiting list'] },
    { keys: ['mindset','vibe','culture','atmosphere','feel','feels like'],
      a: "A blend between a coffee shop and a business centre. Welcoming, focused, human, local. The feeling we go for is: <em>\"I can drop my shoulders here. This is a place for me.\"</em> No pressure, no networking expectations, no hard sell. Somewhere proper to get on with the work and feel at home doing it." },

    /* Brand / what we are not -------------------------------- */
    { keys: ['networking event','pitch','pitching','sell to','solicit','market to','prospect'],
      a: 'Worksop Workspace is not a networking hub. People come here to do their work, not to pitch or be pitched at. Members who use the space to solicit other members for business will not be welcomed back. It is a workplace.' },
    { keys: ['political','politics','party','religious'],
      a: 'We stay neutral. No political affiliations, commentary or associations. The brand focuses entirely on work, community and the local area.' },

    /* Founder benefits --------------------------------------- */
    { keys: ['discount','deal','offer','founder rate','founder rates','founding member','early bird','special','introductory'],
      a: 'Introductory offers are available at launch for founding members: priority access and locked in rates. Beyond launch, discounting is not the model. The pricing you see is the pricing you get.' },
    { keys: ['google review','review','testimonial','feedback'],
      a: 'Members and visitors who leave a Google review get a free day pass as a thank-you. A community gesture, not a transactional exchange.' },

    /* Vague action / next steps ------------------------------ */
    { keys: ['what do i do','what should i do','what next','what now','what then','next step','next steps','where do i start','how do i start','how do i get','what is the next','where do i go from here','so what','okay what','ok what','how do i','how can i','any tips','help me decide','what would you recommend'],
      a: "<p>Simplest move: <strong>join the waiting list</strong> via the orange button at the top.</p><p>Or have a look at <a href=\"/space\">the space</a>, <a href=\"/membership\">the plans</a>, or <a href=\"/contact\">book a viewing</a>.</p>" },

    /* Existential / about us --------------------------------- */
    { keys: ['what is this','what is it','what is worksop workspace','what are you','what do you do','tell me about','about you','who are you','about the space','about worksop workspace'],
      a: "<p>The first proper coworking space in Worksop. <em>\"A blend between a coffee shop and a business centre.\"</em></p><p>Hot desks, dedicated desks and private offices opening 1 June. Coffee shop zone, boardroom and podcast studio coming later. Parking, broadband and proper coffee included.</p>",
      qr: ['How much is it?','When are you opening?','Is it for me?','Join the waiting list'] },
    { keys: ['why does it exist','why are you','why open','why worksop','why now','what gap','market gap'],
      a: '<p>The nearest coworking spaces are Sheffield, Nottingham and other major cities. Nothing comparable existed in Worksop or the surrounding area until now.</p><p>It is built for the people who have been working from vans, kitchen tables, friends houses and shed-offices because there was no proper local option. Worksop Workspace is the answer to every workaround people have invented to avoid working from their kitchen table.</p>' },
    { keys: ['gap','first','only','unique','differentiator','what makes you different','competitors','alternatives'],
      a: '<p>Only space of its kind within a 10-mile radius of Worksop town centre. What sets it apart:</p><ul><li>On site parking, rare for town centre</li><li>All environment types in one building (quiet focus, social zones, private offices, meeting rooms, podcast studio)</li><li>Flexible pricing: fixed weekly subscriptions plus pay as you go for occasional use</li><li>No pressure to buy anything (coffee included)</li><li>Feels like a solution, not a compromise</li></ul>' },

    /* Audience / target -------------------------------------- */
    { keys: ['target','audience','who is it for','who comes here','demographic','age range','clientele'],
      a: 'The typical member works from home but finds home unworkable as a working environment. Remote employees, freelancers, sole traders, small business owners (1 to 4 people), tradespeople doing admin, and people who want more community and structure to their day. Mostly within a 10-mile radius of Worksop town centre.' },

    /* Booking & timing --------------------------------------- */
    { keys: ['can i book','book now','book today','reserve','book ahead'],
      a: 'You cannot book a desk just yet, we are pre-launch. <strong>Join the waiting list</strong> using the button at the top, and we will be in touch the moment doors open. For meeting room enquiries, <a href="/contact">drop us a message</a>.' },

    /* Safety / compliance ------------------------------------- */
    { keys: ['safe','safety','fire','emergency','compliance','accessib','disabled','wheelchair','step free','step free','lift','ramp'],
      a: 'The building meets all required safety and compliance standards before opening: fire safety assessments, marked escape routes, emergency lighting, ventilation. For specific accessibility needs, <a href="/contact">drop us a message</a> and we will give you a straight answer.' },

    /* Pets / kids -------------------------------------------- */
    { keys: ['dog','dogs','pet','pets','animal','animals'],
      a: "No pets in Phase 1, sorry. The first phase is set up for properly quiet focused work, with zero distractions. Some people have allergies, and dogs are a big focus-breaker. We are open to it later in Phase 2 (the more relaxed coffee shop area downstairs), but not at the moment." },
    { keys: ['child','children','kids','baby','school holiday','half term'],
      a: 'The space is set up as a quiet professional working environment, so children would not be the right fit during normal hours. If you need a place to work during school holidays specifically, get in touch and we can talk it through.' },

    /* Stripe / payment --------------------------------------- */
    { keys: ['payment','pay','stripe','direct debit','card','invoice','billing'],
      a: 'Payment is via Stripe. Direct debit for weekly rolling subscriptions, card for day passes and hourly bookings. No invoicing or messy paperwork.' },

    /* Reciprocal warmth — when someone says wow / love it / this looks
       great, mirror the energy and gently nudge them toward the
       waiting list. */
    { keys: ['wow','amazing','incredible','fantastic','love this','love it','looks amazing','looks great','looking good','this is great','this is brilliant','this looks brilliant','sounds great','sounds brilliant','sounds amazing','exciting','can not wait','cant wait','looking forward'],
      a: "Aw, thank you! That means a lot. We are properly excited. Got your name on the waiting list yet? Founders get priority access and the founder rate locked in." },

    /* Thanks / closers --------------------------------------- */
    { keys: ['thank','thanks','cheers','ta','brilliant','helpful','perfect','great help','good help'],
      a: "You're very welcome! Joined the waiting list yet? Orange button at the top, takes 30 seconds." },
    { keys: ['bye','goodbye','see you','later','catch you','cheerio'],
      a: "Take care! Orange button at the top whenever you are ready, no rush." },

    /* Already joined the list -------------------------------- */
    { keys: ['already joined','already on the list','already signed up','signed up already','filled in the form','already filled','already enquired'],
      a: "Brilliant, thank you! That is everything you need to do. We will be in touch as we get closer to opening. Anything else you want to know?" },

    /* Practical / facilities ---------------------------------- */
    { keys: ['phone call','take a call','phone calls','take calls','quiet call','private call','call from','privacy for calls'],
      a: 'Yes. The blue zone on the floor plan keeps things quiet for focused work, and there is a private room with a door that closes for client calls or sensitive conversations. From Phase 3, the boardroom is also bookable by the hour for longer calls.' },
    { keys: ['phone booth','call booth','meeting pod','soundproof','signal','phone signal','reception','5g','4g'],
      a: "Phone signal is good in Phase 1 (it is the ground floor). Phase 2 is the basement, so for calls down there you will use Wi-Fi calling. There is also a quiet spot outside if you want fresh air for a call, and a dedicated phone-call room is on the way so calls do not distract anyone else. Phase 3 boardroom for longer or more formal calls." },
    { keys: ['visitor','visitors','guest','guests','bring a friend','bring someone'],
      a: 'Members can bring a guest in for short visits (a coffee chat, a quick handover). Day passes are open to anyone if a guest wants to work alongside you for the day. Get in touch with anything more specific.' },
    { keys: ['standing desk','sit stand','adjustable desk'],
      a: "Not at launch, but they are on the plan for later phases. The first phase is properly fitted ergonomic seated desks. If standing desks are essential for you, mention it when you join the waiting list and we will keep you in the loop as we add them." },
    { keys: ['monitor','external monitor','second screen','dual screen','display'],
      a: 'You bring your own laptop and any preferred monitor. We are looking at adding shared screens for hot desks once we have been open a while. Dedicated desk and private office members can leave their own kit in place between visits.' },
    { keys: ['plug socket','power','outlet','plug point','charging','charger','usb'],
      a: 'Plenty of plug sockets at every desk. Bring your usual laptop charger. USB-C and USB-A charging at the meeting room.' },
    { keys: ['ethernet','wired','cable','lan','rj45'],
      a: "It is Wi-Fi throughout, no wired ethernet. The fibre handles video calls, file transfers and the rest comfortably. Roughly 24x what most homes have." },
    { keys: ['wifi password','wifi name','network name','ssid','connect to wifi'],
      a: 'You will get the Wi-Fi credentials when you join. They are also displayed inside the building for guests on day passes.' },

    /* Comfort ------------------------------------------------- */
    { keys: ['heating','heated','warm','cold','temperature','aircon','air con','air conditioning','climate','too hot','too cold'],
      a: 'The building is heated throughout the winter and ventilated throughout the summer. Designed for working comfort across the whole day, not just the warm months.' },
    { keys: ['window','windows','natural light','daylight','daylit','light','dark'],
      a: 'Phase 1 has natural light through large front windows on the ground floor. The basement (Phase 2) uses a mix of natural and warm artificial lighting designed for the coffee shop atmosphere.' },
    { keys: ['music','playlist','sound','background music','speaker'],
      a: 'Phase 1 stays quiet for focus. The basement coffee shop zone (Phase 2) has soft background music and televisions on mute, more in line with a relaxed coffee shop than a quiet library.' },

    /* Drinks / specific ------------------------------------------- */
    { keys: ['decaf','decaffeinated','green tea','herbal tea','no caffeine','caffeine free'],
      a: 'Tea, coffee and water are included. Standard caffeinated and decaf options at launch. If there is a specific drink you cannot live without, drop us a message and we will see what we can do.' },
    { keys: ['milk','dairy free','oat milk','soya','soy milk','almond milk','plant milk','vegan'],
      a: "Dairy is the standard. Plant milk options are available on request, just ask. Tell us what you drink and we will get it in." },

    /* Bike / EV ----------------------------------------------- */
    { keys: ['bike','cycle','bicycle','bike rack','cycle rack','bike storage'],
      a: "Yes, there is a spot outside where you can lock up. Not sheltered, just an open lock-up area. Bring your own lock." },
    { keys: ['electric car','ev charger','ev charge','car charging','tesla','charging point'],
      a: "No EV charging on site, just standard free parking. The closest public chargers are in the town centre car parks, a couple of minutes walk away. Could change down the line, but no concrete plans right now." },

    /* Showers / facilities ----------------------------------- */
    { keys: ['shower','showers','changing room','run to work','cycle to work','sweat'],
      a: "No showers, sorry. Not in the current plan. If you cycle in, the bike racks are right outside but you will need to freshen up some other way." },
    { keys: ['toilet','toilets','loo','bathroom','wc','restroom'],
      a: 'Yes, accessible toilets on every floor. Standard, nothing exciting, but properly looked after.' },

    /* Membership operations ------------------------------------- */
    { keys: ['pause','freeze','holiday','break','suspend membership','take a break','pause membership'],
      a: 'Members can pause or cancel directly through the member app. Useful if you are travelling or taking a longer break. The system is designed to be as flexible as the membership itself.' },
    { keys: ['vat','receipt','invoice','tax','expenses','business expense','business pays'],
      a: "Yes, businesses can pay via Stripe and you will get a receipt automatically. Worth flagging though, we are not VAT registered yet, so there is no VAT to add on or claim back. Many members still claim their membership as a business expense." },
    { keys: ['lost qr','forgot phone','forgot my qr','no phone','locked out','cant get in'],
      a: 'During staffed hours (Phase 1) just speak to whoever is on the desk. Out of hours, the member app supports a backup login if you have lost your phone. If all else fails, email hello@worksopworkspace.com.' },
    { keys: ['complaint','complain','issue','problem','feedback'],
      a: 'You can raise issues directly through the member app. We read every one. For anything urgent, email hello@worksopworkspace.com and the team will come back to you personally.' },

    /* Brand / company structure ------------------------------ */
    { keys: ['chain','franchise','part of','locations','other branches','elsewhere'],
      a: 'Independent and local. Worksop Workspace is one building on Carlton Road. No other locations, no chain. Built specifically for north Nottinghamshire.' },
    { keys: ['hiring','jobs','vacancies','work for you','employment','careers'],
      a: 'Nothing publicly advertised right now. As we move through phases there will be opportunities. Drop us a message if you have a specific skill set you think fits.' },
    { keys: ['become a sponsor','sponsor opportunity','sponsor us','want to sponsor','partnership'],
      a: 'A handful of founder sponsorship slots are available. Brand visibility on the website, in the building, and across our content. <a href="/sponsors">Read about our current sponsors</a> and <a href="/contact">get in touch</a> if interested.' },

    /* Events / activities ------------------------------------ */
    { keys: ['event','workshop','training','seminar','class','run an event','host an event'],
      a: 'The boardroom (Phase 3) is bookable by the hour for workshops, training sessions, and small events. We do not host external networking events at the workspace itself, by design.' },
    { keys: ['photo','photography','film','filming','shoot','content shoot','take photos'],
      a: 'For private filming or content shoots, get in touch and we will work out a slot outside busy member hours. The podcast studio (Phase 3) is set up for paid sessions by the hour.' },

    /* Vetting / who's there ---------------------------------- */
    { keys: ['vet','vetting','background check','safe','secure','dodgy','strangers'],
      a: 'Members sign up via Stripe and are tied to a verified payment method. Day pass visitors leave their details. Out of hours access is QR controlled. We protect the environment carefully.' },

    /* Insurance / startup ----------------------------------- */
    { keys: ['insurance','public liability','indemnity','covered'],
      a: 'The building carries the appropriate public liability cover. Members are responsible for their own equipment and any professional indemnity related to their own work. Bring your own laptop insurance if you carry expensive kit.' },
    { keys: ['startup','start a company','starting out','new business','sole trader registration','registered office'],
      a: 'Plenty of our prospective members are sole traders or new small businesses. The space gives you the structure of a working day without the overhead. We do not currently offer a registered office address.' },

    /* Reviews / proof ---------------------------------------- */
    { keys: ['review','reviews','testimonials','what do members say','any reviews'],
      a: 'We are pre-launch, so member reviews will land after we open. Once members are using the space, leaving a Google review unlocks a free day pass as a thank-you.' },
  ];

  function fallbackResponse() {
    return '<p>Not sure I caught that. Let me give you the lay of the land. I can answer questions about:</p>'
      + '<ul>'
      + '<li><strong>Prices</strong>: hot desk daily/weekly, private office, hourly</li>'
      + '<li><strong>When and where</strong>: opening date (1 June 2026), location, parking</li>'
      + '<li><strong>What is included</strong>: broadband, coffee, meeting rooms, lockers</li>'
      + '<li><strong>Getting started</strong>: joining the waiting list, booking a viewing</li>'
      + '<li><strong>The space itself</strong>: floor plan, who works here, transport</li>'
      + '<li><strong>How it works</strong>: onboarding, member app, cancellation</li>'
      + '</ul>'
      + '<p>Try asking one of those, or use the chips above. If I still cannot help, drop us an email at <a href="mailto:hello@worksopworkspace.com">hello@worksopworkspace.com</a>.</p>';
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  /* Tokenise input by stripping punctuation and splitting on whitespace.
     Used so single-word keys must match as whole words (avoids "office"
     matching "we offer..."). Multi-word keys still substring-match. */
  function tokenise(s) {
    return (s || '').toLowerCase()
      .replace(/[^\w\s'-]/g, ' ')
      .split(/\s+/)
      .filter(function (t) { return t.length > 0; });
  }

  function isSensitive(input) {
    for (var i = 0; i < SENSITIVE_PATTERNS.length; i++) {
      if (SENSITIVE_PATTERNS[i].test(input)) return true;
    }
    return false;
  }

  function scoreEntry(entry, input, tokens) {
    var score = 0;
    for (var i = 0; i < entry.keys.length; i++) {
      var key = entry.keys[i];
      if (key.indexOf(' ') !== -1) {
        // Multi-word phrase: substring match, weighted higher
        if (input.indexOf(key) !== -1) score += key.length * 2;
      } else {
        // Single word: must appear as a whole token
        if (tokens.indexOf(key) !== -1) score += key.length;
      }
    }
    return score;
  }

  /* Threshold tuned so single common words ("the", "a", "is") don't
     trigger unrelated answers, but a single meaningful word like
     "parking" (length 7) clears it comfortably. */
  var MIN_SCORE = 4;

  /* Returns { a: html, qr: [labels] } so the renderer can offer
     clickable quick-reply pills under multi-choice answers. */
  function findAnswer(text) {
    var input = (text || '').toLowerCase().trim();
    if (!input) return null;

    if (isSensitive(input)) return { a: SENSITIVE_REPLY, qr: null };

    var tokens = tokenise(input);
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var s = scoreEntry(KB[i], input, tokens);
      if (s > bestScore) {
        bestScore = s;
        best = KB[i];
      }
    }
    if (best && bestScore >= MIN_SCORE) {
      return { a: best.a, qr: best.qr || null };
    }
    return { a: fallbackResponse(), qr: ['Show me prices','When are you opening?','Where are you?','How do I join?'] };
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
      '<div class="ww-chat-header-avatar" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>' +
      '</div>' +
      '<div class="ww-chat-header-text">' +
        '<div class="ww-chat-header-title">Worksop Workspace</div>' +
        '<div class="ww-chat-header-sub">Ask us anything</div>' +
      '</div>' +
      '<button class="ww-chat-close" aria-label="Close chat and return to website">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '<span class="ww-chat-close-label">Back to site</span>' +
      '</button>' +
    '</div>' +
    '<div class="ww-chat-messages"></div>' +
    '<form class="ww-chat-input-row">' +
      '<input type="text" class="ww-chat-input" placeholder="Ask anything…" autocomplete="off" />' +
      '<button type="submit" class="ww-chat-send" aria-label="Send"><svg viewBox="0 0 24 24" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>' +
    '</form>';

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  var messagesEl = panel.querySelector('.ww-chat-messages');
  var formEl     = panel.querySelector('.ww-chat-input-row');
  var inputEl    = panel.querySelector('.ww-chat-input');
  var greeted    = false;

  function append(html, who) {
    var msg = document.createElement('div');
    msg.className = 'ww-chat-msg ww-chat-msg-' + who;
    msg.innerHTML = html;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderQuickReplies(labels) {
    if (!labels || !labels.length) return;
    /* Disable any previous QR row (so stale buttons can't be
       re-clicked once a newer message appears). */
    var prev = messagesEl.querySelectorAll('.ww-chat-qr-row');
    prev.forEach(function (row) {
      row.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    });

    var row = document.createElement('div');
    row.className = 'ww-chat-qr-row';
    labels.forEach(function (label) {
      var b = document.createElement('button');
      b.className = 'ww-chat-qr';
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', function () {
        if (b.disabled) return;
        userAsks(label);
      });
      row.appendChild(b);
    });
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function botSay(payload) {
    /* Accepts either a string (legacy: just message) or
       { a: html, qr: [labels] } from findAnswer. */
    var html = (typeof payload === 'string') ? payload : payload.a;
    var qr   = (typeof payload === 'string') ? null     : payload.qr;

    var typing = document.createElement('div');
    typing.className = 'ww-chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    setTimeout(function () {
      typing.remove();
      append(html, 'bot');
      renderQuickReplies(qr);
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
      botSay({
        a: "Hey! 👋 What can I help you with?",
        qr: ['How much is it?','When are you opening?','Where are you?','What is included?']
      });
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
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closeChat();
  });

}());
