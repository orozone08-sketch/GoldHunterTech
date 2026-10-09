import { useEffect, useState } from 'react';
import {
  ArrowRight, BadgeCheck, Building2, CheckCircle2, ChevronDown, Factory,
  FlaskConical, Flame, GraduationCap, Mail, MapPin, Menu, Phone, Send,
  Settings, ShieldCheck, Upload, Wrench, X, Zap
} from 'lucide-react';

type MenuGroup = { label: string; links: string[]; target: string };

const menuGroups: MenuGroup[] = [
  { label: 'About Us', links: ['Company', 'Capabilities', 'Infrastructure', 'Quality & Safety'], target: '#about' },
  { label: 'Gold Refinery', links: ['Plants', 'Gold Dust', 'Jewellery Scrap', 'Dore', 'Recovery', 'Process', 'Models'], target: '#gold-refinery' },
  { label: 'Silver Refinery', links: ['Plants', 'Recovery', 'Dore', 'Process'], target: '#silver-refinery' },
  { label: 'Gold Bar & Coin Factory', links: ['Gold Bars', 'Gold Coins', 'Equipment', 'Process', 'Turnkey'], target: '#bar-coin-factory' },
  { label: 'Hallmarking & Assaying', links: ['BIS Centre', 'Fire Assay', 'XRF', 'Equipment', 'Laboratory'], target: '#hallmarking-assaying' },
  { label: 'Products', links: ['Refinery', 'Silver', 'Melting', 'Casting', 'Filtration', 'Recovery', 'XRF', 'Fire Assay', 'Scrubber', 'ETP', 'Bullion'], target: '#products' },
  { label: 'Turnkey Projects', links: ['Gold', 'Silver', 'Bar Factory', 'Coin Factory', 'Hallmarking', 'Laboratory', 'Upgrade'], target: '#turnkey-projects' },
  { label: 'Services', links: ['Consultancy', 'Engineering', 'Installation', 'Commissioning', 'Training', 'AMC', 'Spares'], target: '#services' },
  { label: 'Projects', links: ['Gallery', 'Case Studies', 'Installations'], target: '#projects' },
  { label: 'Knowledge Centre', links: ['Refining', 'Assay', 'Hallmarking', 'Bullion', 'Technology', 'FAQs'], target: '#knowledge' }
];

const planningCards = ['Gold Refinery', 'Silver Refinery', 'Gold Bar Factory', 'Gold Coin Factory', 'Hallmarking Centre', 'Fire Assay Laboratory'];

const capacities = [
  ['0.5 kg', '0.5 KG Gold Refinery Plant'], ['1 kg', '1 KG Gold Refinery Plant'], ['2 kg', '2 KG Gold Refinery Plant'],
  ['5 kg', '5 KG Gold Refinery Plant'], ['10 kg', '10 KG Gold Refinery Plant'], ['20 kg', '20 KG Gold Refinery Plant'],
  ['25 kg', '25 KG Gold Refinery Plant'], ['50 kg', '50 KG Gold Refinery Plant'], ['100 kg+', '100 KG+ Custom Gold Refinery Plant']
];

const goldProducts = [
  { title: 'Gold Dust Refinery Plant', detail: 'Refinery planning for gold dust feed, sampling, assay, refining, filtration and recovery.', tag: 'GOLD / DUST', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Jewellery Scrap Gold Refinery', detail: 'Feed-specific recovery systems for jewellery scrap and mixed precious-metal material.', tag: 'GOLD / SCRAP', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Gold Dore Refinery', detail: 'Process-led gold dore separation with laboratory and environmental systems.', tag: 'GOLD / DORE', image: 'https://images.unsplash.com/photo-1565439399758-3d2c4f8a5e32?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Gold Recovery Systems', detail: 'Filtration, recovery, washing, drying and melting equipment for precious-metal operations.', tag: 'GOLD / RECOVERY' },
  { title: 'Gold Refining Process', detail: 'A controlled process from receiving and sampling through final assay, QC and secure storage.', tag: 'GOLD / PROCESS' },
  { title: 'Gold Refinery Models', detail: 'Capacity-led model pages with feed, throughput, utilities, floor space and equipment details.', tag: 'GOLD / MODELS' }
];

const silverProducts = [
  { title: 'Silver Refinery Plant', detail: 'Scalable silver refining systems for industrial operations.' },
  { title: 'Silver Recovery Systems', detail: 'Recovery equipment designed around feed, process and output requirements.' },
  { title: 'Silver Dore Refinery', detail: 'Process support for silver dore separation and controlled production.' },
  { title: 'Silver Refining Process', detail: 'A documented route for selection, recovery, melting and final QC.' }
];

const hallmarkServices = [
  { icon: BadgeCheck, title: 'BIS Hallmarking Centre', text: 'Equipment and project support for a professional hallmarking facility.' },
  { icon: Flame, title: 'Fire Assay Laboratory', text: 'Furnaces, cupellation and laboratory workflow equipment.' },
  { icon: FlaskConical, title: 'XRF Gold Testing', text: 'Fast, non-destructive analysis systems and laboratory setup.' },
  { icon: Building2, title: 'Assay Laboratory Setup', text: 'Layout, equipment selection, reference materials and documentation.' }
];

const productCategories = [
  ['Gold Refinery', 'Refinery machine; reactors; filtration; recovery'], ['Silver Refinery', 'Silver refinery; recovery'],
  ['Melting & Casting', 'Induction furnace; melting furnace; casting'], ['Filtration & Recovery', 'Filter press; vacuum filtration; recovery; drying'],
  ['Assaying', 'XRF; fire assay furnace; balances'], ['Hallmarking', 'Hallmarking and laboratory systems'],
  ['Environmental', 'Fume scrubber; blower; ducting; ETP'], ['Bullion Manufacturing', 'Rolling mill; blanking; coin press; laser marking; packaging']
];

const services = [
  { icon: Settings, title: 'Project Consultancy', text: 'Gold refinery project consultancy, planning and feed study support.' },
  { icon: Factory, title: 'Process & Plant Engineering', text: 'Engineering, layout, utilities and equipment selection around your operation.' },
  { icon: Wrench, title: 'Installation & Commissioning', text: 'On-site installation, integration and commissioning by experienced teams.' },
  { icon: GraduationCap, title: 'Operator Training', text: 'Practical process, safety and equipment training for confident operators.' },
  { icon: ShieldCheck, title: 'AMC & Technical Support', text: 'Planned maintenance, troubleshooting and responsive after-sales care.' },
  { icon: Zap, title: 'Spare Parts & Upgrades', text: 'Critical consumables, replacement parts and refinery modernisation support.' }
];

const knowledgeArticles = [
  'How Does Gold Refining Work?', 'Gold Dust Refinery Plant: Complete Guide', 'Jewellery Scrap Gold Refinery: Plant & Process',
  'How to Set Up a Gold Refinery in India', '1 KG vs 5 KG vs 10 KG Gold Refinery', 'Gold Refinery Plant Capacity Selection',
  'Gold Dust vs Jewellery Scrap Refining', 'What Equipment Is Required for a Gold Refinery?', 'Gold Refinery Laboratory Setup',
  'Fire Assay vs XRF Gold Testing', 'Gold Bar Manufacturing Factory Setup', 'Gold Coin Manufacturing Factory Setup',
  'Gold Refinery Pollution Control', 'Gold Refinery Project Cost: What Determines CAPEX?', 'Gold Refinery Plant Layout: Engineering Considerations'
];

const capabilities = ['Design', 'Manufacturing', 'Installation', 'Commissioning', 'Training', 'After-sales service'];
const goldFlow = ['Receiving', 'Weighing', 'Sampling', 'Assay', 'Feed Preparation', 'Refining', 'Filtration', 'Recovery', 'Washing / Drying', 'Melting', 'Final Assay / QC', 'Gold Bar / Grain', 'Secure Storage'];
const turnkeyScope = ['Gold refinery plant', 'Silver refinery plant', 'Gold bar factory', 'Gold coin factory', 'Integrated bullion factory', 'Hallmarking centre', 'Fire assay laboratory', 'XRF testing laboratory', 'Pollution-control plant', 'Existing plant upgrade'];
const turnkeyJourney = ['Consultation', 'Feed Study', 'Process Selection', 'Engineering', 'Layout', 'Equipment Manufacturing / Sourcing', 'Installation', 'Commissioning', 'Training', 'Documentation', 'AMC'];

function ProductCard({ product }: { product: typeof goldProducts[number] }) {
  return (
    <article className="product-card">
      {'image' in product && product.image ? <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} /> : <div className="product-image product-image-silver"><span>GHT / SYSTEM</span></div>}
      <div className="product-body">
        <span className="card-label">{product.tag}</span><h3>{product.title}</h3><p>{product.detail}</p>
        <a className="inline-link" href="#quote">Request technical quotation <ArrowRight size={16} /></a>
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [attachmentsAvailable, setAttachmentsAvailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/health', { signal: controller.signal })
      .then(async (response) => {
        if (response.ok) {
          const health = await response.json();
          setAttachmentsAvailable(health.attachments === true);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSending(true); setError(''); setSent(false);
    const form = e.currentTarget;
    try {
      const response = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(typeof result?.message === 'string' ? result.message : 'We could not send your enquiry right now. Please try again.');
      }
      setSent(true); form.reset();
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'We could not send your enquiry right now. Please try again.'); }
    finally { setSending(false); }
  }

  function closeNav() { setMenuOpen(false); setActiveMenu(null); }

  return (
    <div className="site-shell">
      <div className="topbar"><span>TURNKEY PRECIOUS-METAL REFINERY &amp; LABORATORY SOLUTIONS</span><span className="topbar-contact"><Phone size={13} /> +91 00000 00000 <span className="topbar-divider" /> <Mail size={13} /> sales@goldhuntertech.com</span></div>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeNav}><span className="brand-mark"><span>GH</span></span><span className="brand-name"><strong>GOLD HUNTER</strong><small>TECHNOLOGIES</small></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#home" onClick={closeNav}>Home</a>
          {menuGroups.map((group) => <div className={`nav-dropdown ${activeMenu === group.label ? 'active' : ''}`} key={group.label}><button onClick={() => setActiveMenu(activeMenu === group.label ? null : group.label)}>{group.label} <ChevronDown size={14} /></button><div className="dropdown-panel">{group.links.map((link) => <a href={group.target} onClick={closeNav} key={link}>{link}</a>)}</div></div>)}
          <a href="#contact" onClick={closeNav}>Contact</a><a className="quote-button quote-button-small" href="#quote" onClick={closeNav}>Get a Quote <ArrowRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-refinery"><div className="hero-overlay" /><div className="hero-content"><div className="eyebrow"><span /> GOLD HUNTER TECHNOLOGY / PRECIOUS METALS</div><h1>Redefining gold<br /><em>refining technology.</em></h1><p>Complete gold and silver refining, assaying, hallmarking and gold bar &amp; coin manufacturing solutions.</p><div className="hero-actions"><a className="quote-button" href="#planning">Plan Your Project <ArrowRight size={17} /></a><a className="text-button" href="#quote">Get a Quote <ArrowRight size={17} /></a></div></div><div className="hero-technical-card"><div className="technical-top"><span>PROCESS / 01</span><span className="status-dot">● ONLINE</span></div><div className="technical-orbit"><div className="orbit-core">GH</div></div><div className="technical-bottom"><span>PRECISION ENGINEERING</span><strong>99.8%</strong></div><div className="technical-meter"><i /></div></div><div className="hero-scroll">SCROLL TO EXPLORE <ArrowRight size={15} /></div></section>
        <section className="trust-band"><span>GOLD REFINERY</span><i /><span>SILVER REFINERY</span><i /><span>GOLD BAR &amp; COIN</span><i /><span>HALLMARKING</span><i /><span>TURNKEY PROJECTS</span></section>

        <section id="planning" className="section about-section"><div className="section-kicker">01 / HOMEPAGE</div><div className="split-heading"><h2>What are you<br /><em>planning to set up?</em></h2><div className="section-copy"><p className="lead-copy">Complete precious-metal technology and turnkey project support for your next facility.</p><p>Gold Hunter Technology provides equipment, laboratory infrastructure and engineering support for gold and silver refineries, bullion factories, hallmarking centres and fire assay laboratories.</p><a className="inline-link" href="#quote">Request a technical proposal <ArrowRight size={16} /></a></div></div><div className="planning-grid">{planningCards.map((item, index) => <a className="planning-card" href="#quote" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowRight size={18} /></a>)}</div></section>

        <section id="about" className="section capability-section"><div className="section-kicker">02 / ABOUT US</div><div className="split-heading"><h2>Technology for<br /><em>precious metals.</em></h2><div className="section-copy"><p className="lead-copy">Engineering confidence into every refinery, laboratory and bullion operation.</p><p>Our company, capabilities, infrastructure and quality-and-safety approach are built around practical project delivery, responsible systems and long-term technical support.</p></div></div><div className="capability-line">{capabilities.map((capability, index) => <div className="capability" key={capability}><span>0{index + 1}</span><strong>{capability}</strong>{index < capabilities.length - 1 && <ArrowRight size={18} />}</div>)}</div></section>

        <section id="gold-refinery" className="section product-section"><div className="section-kicker">03 / GOLD REFINERY</div><div className="section-heading-row"><h2>Gold refinery plants &amp;<br /><em>refining technology.</em></h2><p>Solutions for gold dust, jewellery scrap, dore, recovery, process selection and capacity-led refinery models. Exact recovery, purity, chemical consumption and daily output are project-dependent and must be validated for the selected process, machine and feed.</p></div><div className="capacity-grid">{capacities.map(([capacity, title]) => <a className="capacity-card" href="#quote" key={capacity}><span>{capacity}</span><strong>{title}</strong><ArrowRight size={16} /></a>)}</div><div className="product-grid gold-product-grid">{goldProducts.map((product) => <ProductCard product={product} key={product.title} />)}</div><div className="process-flow"><span>GOLD REFINING PROCESS</span>{goldFlow.map((step, index) => <div className="flow-step" key={step}><b>0{index + 1}</b>{step}{index < goldFlow.length - 1 && <ArrowRight size={13} />}</div>)}</div></section>

        <section id="silver-refinery" className="section silver-section"><div className="section-kicker">04 / SILVER REFINERY</div><div className="section-heading-row"><h2>Silver refinery plants<br /><em>&amp; technology.</em></h2><p>Scalable refining, recovery, dore and process solutions for silver producers, recyclers and precious-metal operations.</p></div><div className="silver-layout"><div className="silver-feature"><div className="feature-badge"><FlaskConical size={18} /> SILVER / PROCESS CONTROL</div><h3>Refine with<br /><em>confidence.</em></h3><p>Equipment packages for silver refining, recovery, dore separation and controlled process delivery.</p><a className="text-button" href="#quote">Discuss your process <ArrowRight size={16} /></a></div><div className="silver-list">{silverProducts.map((product, index) => <div className="silver-row" key={product.title}><span>SILVER / 0{index + 1}</span><div><h3>{product.title}</h3><p>{product.detail}</p></div><ArrowRight size={19} /></div>)}</div></div></section>

        <section id="bar-coin-factory" className="section bar-coin-section"><div className="section-kicker">05 / GOLD BAR &amp; COIN FACTORY</div><div className="section-heading-row"><h2>From refined gold<br /><em>to finished bullion.</em></h2><p>Complete gold bar and coin factory setup with equipment, process planning and turnkey support.</p></div><div className="bar-coin-grid"><article><span>GOLD BAR FLOW</span><p>Refined Gold <b>→</b> Melting <b>→</b> Casting / Forming <b>→</b> Finishing <b>→</b> Weighing <b>→</b> Marking <b>→</b> Testing <b>→</b> Packaging.</p></article><article><span>GOLD COIN FLOW</span><p>Refined Gold <b>→</b> Casting / Rolling <b>→</b> Blanking <b>→</b> Annealing <b>→</b> Coin Pressing <b>→</b> Finishing <b>→</b> Marking <b>→</b> Testing <b>→</b> Packaging.</p></article></div><div className="equipment-strip"><span>EQUIPMENT</span><strong>Melting furnace</strong><strong>Casting</strong><strong>Rolling mill</strong><strong>Blanking press</strong><strong>Annealing furnace</strong><strong>Coin press</strong><strong>Laser marking</strong><strong>XRF / testing</strong><strong>Packaging</strong></div></section>

        <section id="hallmarking-assaying" className="section hallmarking-section"><div className="section-kicker">06 / HALLMARKING &amp; ASSAYING</div><div className="split-heading"><h2>Measure what<br /><em>matters.</em></h2><div className="section-copy"><p className="lead-copy">Laboratory infrastructure for accurate analysis, responsible documentation and repeatable results.</p><p>Support includes assaying workflow, XRF testing, fire assay, sampling, precision weighing, laboratory layout, reference materials and calibration, equipment lists and documentation. Equipment and project support are distinct from recognition or licensing of the actual facility.</p></div></div><div className="hallmark-grid">{hallmarkServices.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="standards-note"><strong>Applicable standards and recognition</strong><span>Project documentation can be planned around applicable BIS / NABL requirements. BIS recognition or licensing of the customer facility is subject to the applicable authority process.</span></div></section>

        <section id="products" className="section products-catalog-section"><div className="section-kicker">07 / PRODUCTS</div><div className="section-heading-row"><h2>Equipment for every<br /><em>critical stage.</em></h2><p>Explore refinery, melting, casting, filtration, recovery, assaying, environmental and bullion manufacturing categories.</p></div><div className="category-grid">{productCategories.map(([category, products], index) => <article className="category-card" key={category}><span>0{index + 1}</span><h3>{category}</h3><p>{products}</p><a className="inline-link" href="#quote">Request details <ArrowRight size={15} /></a></article>)}</div><div className="cms-template"><span>PRODUCT DETAIL PAGE</span><strong>Every product can be specified with model, capacity, specifications, applications, materials of construction, utilities, dimensions / weight, automation / control, safety features, installation requirements, related products, brochure PDF and FAQ.</strong></div></section>

        <section id="pollution-control" className="section pollution-section"><div className="pollution-copy"><div className="section-kicker">08 / POLLUTION CONTROL</div><h2>Responsible systems<br /><em>for demanding plants.</em></h2><p>Integrated environmental-control systems for precious-metal refining operations.</p></div><div className="pollution-items">{['Fume Scrubber Systems', 'Chemical Fume Extraction', 'Chemical Storage & Safety Systems', 'Effluent Treatment Plant (ETP)', 'Blower and Ducting'].map((item, index) => <div className="pollution-item" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowRight size={17} /></div>)}</div></section>

        <section id="turnkey-projects" className="section projects-section"><div className="section-kicker">09 / TURNKEY PROJECTS</div><div className="section-heading-row"><h2>From process idea<br /><em>to plant reality.</em></h2><p>One accountable partner for consultation, feed study, process selection, engineering, layout, equipment manufacturing or sourcing, installation, commissioning, training, documentation and AMC.</p></div><div className="project-flow">{turnkeyJourney.map((step, index) => <div className="project-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < turnkeyJourney.length - 1 && <ArrowRight size={16} />}</div>)}</div><div className="scope-grid">{turnkeyScope.map((item, index) => <div className="scope-item" key={item}><CheckCircle2 size={16} /><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></section>

        <section id="projects" className="section project-case-section"><div className="section-kicker">10 / PROJECTS &amp; CASE STUDIES</div><div className="split-heading"><h2>Every project,<br /><em>properly documented.</em></h2><div className="section-copy"><p className="lead-copy">Gallery, case studies and installation records built around real project evidence.</p><p>Case studies can include project title, location, customer industry, capacity, feed material, scope, equipment supplied, laboratory, environmental systems, installation photographs, 3D / layout drawings, commissioning and training. Customer names, production data and photographs are published only with permission.</p></div></div><div className="project-gallery"><div className="gallery-card gallery-gold"><span>GOLD REFINERY</span><strong>Plant solutions</strong><a href="#quote">Discuss a project <ArrowRight size={15} /></a></div><div className="gallery-card gallery-lab"><span>HALLMARKING CENTRE</span><strong>Laboratory setup</strong><a href="#quote">Plan your facility <ArrowRight size={15} /></a></div><div className="gallery-card gallery-silver"><span>INSTALLATIONS</span><strong>Recovery systems</strong><a href="#quote">Explore capability <ArrowRight size={15} /></a></div></div></section>

        <section id="services" className="section services-section"><div className="section-kicker">11 / SERVICES</div><div className="section-heading-row"><h2>Support that stays<br /><em>after installation.</em></h2><p>Refinery engineering and technical services for every stage of your operation.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text }) => <article className="service-card" key={title}><Icon size={25} /><h3>{title}</h3><p>{text}</p><a href="#quote"><ArrowRight size={17} /></a></article>)}</div></section>

        <section id="knowledge" className="section knowledge-section"><div className="section-kicker">12 / KNOWLEDGE CENTRE</div><div className="section-heading-row"><h2>Learn the process.<br /><em>Plan with clarity.</em></h2><p>Practical resources across refining, assay, hallmarking, bullion, technology, automation, pollution control and refinery project planning.</p></div><div className="knowledge-topics"><span>Gold Refining Technology</span><span>Gold Dust Recovery</span><span>Jewellery Scrap Refining</span><span>Gold Dore</span><span>Silver Refining</span><span>Fire Assay</span><span>XRF Testing</span><span>Hallmarking</span><span>Gold Bars</span><span>Gold Coins</span><span>Pollution Control</span><span>Technology &amp; Automation</span><span>FAQs</span></div><div className="article-grid">{knowledgeArticles.map((article, index) => <a href="#quote" className="article-card" key={article}><span>ARTICLE / {String(index + 1).padStart(2, '0')}</span><strong>{article}</strong><ArrowRight size={16} /></a>)}</div></section>

        <section id="quote" className="quote-section"><div className="quote-intro"><div className="section-kicker">13 / REQUEST A QUOTE</div><h2>Let&apos;s build the<br /><em>right solution.</em></h2><p>Share your project type, feed, capacity, available area or project drawing. Our team will get back to you with the next technical step.</p><div className="contact-details"><span><Phone size={17} /> +91 00000 00000</span><span><Mail size={17} /> sales@goldhuntertech.com</span><span><MapPin size={17} /> India / Global Projects</span></div></div><form className="quote-form" onSubmit={submitForm}><div className="form-grid"><label>Project type *<select name="project_type" defaultValue="Gold Refinery" required><option>Gold Refinery</option><option>Silver Refinery</option><option>Gold Bar Factory</option><option>Gold Coin Factory</option><option>Gold Bar + Coin Factory</option><option>Hallmarking Centre</option><option>Fire Assay Laboratory</option><option>XRF Laboratory</option><option>Complete Precious Metal Plant</option><option>Existing Plant Upgrade</option></select></label><label>Feed<select name="feed" defaultValue="Gold dust"><option>Gold dust</option><option>Jewellery scrap</option><option>Dore</option><option>Mixed precious-metal scrap</option><option>Other</option></select></label><label>Capacity *<select name="capacity" defaultValue="1–5 kg" required><option>&lt;1 kg</option><option>1–5 kg</option><option>5–10 kg</option><option>10–25 kg</option><option>25–50 kg</option><option>50–100 kg</option><option>100 kg+</option></select></label><label>Required production / day<input name="production_per_day" placeholder="Tell us your target" /></label><label>Name *<input name="name" required placeholder="Your name" /></label><label>Company<input name="company" placeholder="Company name" /></label><label>Country / City<input name="country_city" placeholder="Country or city" /></label><label>Phone / WhatsApp *<input name="phone" required placeholder="+91" /></label><label className="full-field">Email *<input name="email" type="email" required placeholder="you@company.com" /></label><label>Available area<input name="available_area" placeholder="Approx. floor area" /></label><label>Project planner<select name="planner" defaultValue="Not sure yet"><option>Not sure yet</option><option>Need a project plan</option><option>Have a layout / drawing</option><option>Need a feasibility discussion</option></select></label><label className="full-field">Message<textarea name="message" rows={4} required placeholder="Tell us about your requirement" /></label><label className="upload-field full-field"><Upload size={16} /> Upload PDF / Excel / images<input type="file" name="attachment" accept=".pdf,.xlsx,.xls,.png,.jpg,.jpeg,.dwg" disabled={!attachmentsAvailable} />{!attachmentsAvailable && <small>File uploads are currently unavailable. You can submit your enquiry without an attachment.</small>}</label></div><button className="quote-button" type="submit" disabled={sending}>{sending ? 'Sending…' : <>Submit Enquiry <Send size={16} /></>}</button>{sent && <div className="form-message success-message"><CheckCircle2 size={17} /> Thanks — your enquiry has been received.</div>}{error && <div className="form-message error-message">{error}</div>}</form></section>
      </main>
      <footer className="site-footer" id="contact"><div className="footer-main"><div><a className="brand" href="#home"><span className="brand-mark"><span>GH</span></span><span className="brand-name"><strong>GOLD HUNTER</strong><small>TECHNOLOGIES</small></span></a><p>Precision engineering for precious-metal operations.</p></div><div className="footer-contact"><span><Phone size={15} /> +91 00000 00000</span><span><Mail size={15} /> sales@goldhuntertech.com</span><span><MapPin size={15} /> India / Global Projects</span></div><a className="quote-button" href="#quote">Start a conversation <ArrowRight size={16} /></a></div><div className="footer-bottom"><span>© 2026 Gold Hunter Technologies. All rights reserved.</span><span>Refinery · Hallmarking · Assaying · Bullion · Turnkey Projects</span></div></footer>
    </div>
  );
}

export default App;
