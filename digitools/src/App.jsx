import { useState, useEffect } from 'react';

const productsData = [
  { id: 1, name: "AI Writing Pro", description: "Generate high-quality content, blogs, and marketing copy in seconds with advanced AI.", price: 29, period: "Mo", tag: "Best Seller", tagType: "warning", features: ["Unlimited AI generations", "50+ writing templates", "Grammar checker"], icon: "fa-solid fa-robot" },
  { id: 2, name: "Design Templates Pack", description: "2000+ premium templates for social media, presentations, and marketing materials.", price: 49, period: "One-Time", tag: "Popular", tagType: "secondary", features: ["2000+ templates", "Monthly updates", "Commercial license"], icon: "fa-solid fa-palette" },
  { id: 3, name: "Premium Stock Assets", description: "Access millions of royalty-free photos, videos, and graphics for your projects.", price: 19, period: "Mo", tag: "New", tagType: "accent", features: ["10M+ assets", "Commercial use", "No attribution"], icon: "fa-solid fa-images" },
  { id: 4, name: "Automation Toolkit", description: "Automate repetitive tasks and streamline your workflow with powerful tools.", price: 79, period: "Mo", tag: "Popular", tagType: "secondary", features: ["50+ automations", "API access", "Custom workflows"], icon: "fa-solid fa-cogs" },
  { id: 5, name: "Resume Builder Pro", description: "Create professional resumes and cover letters that land interviews.", price: 15, period: "One-Time", tag: "New", tagType: "accent", features: ["100+ templates", "ATS optimization", "Export to PDF"], icon: "fa-solid fa-file-alt" },
  { id: 6, name: "Social Media Content Kit", description: "Complete toolkit for creating engaging social media content across all platforms.", price: 39, period: "Mo", tag: "Best Seller", tagType: "warning", features: ["5000+ assets", "Scheduler included", "Analytics dashboard"], icon: "fa-solid fa-share-alt" }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState('products');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const colors = { success: 'bg-emerald-600', info: 'bg-blue-600', error: 'bg-rose-600' };
    const icon = type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle';

    const toastHTML = `
      <div class="toast flex items-center gap-3 ${colors[type]} px-6 py-4 rounded-3xl shadow-2xl text-white min-w-[320px]">
        <i class="fa-solid ${icon} text-xl"></i>
        <p class="flex-1 text-base">${message}</p>
        <button onclick="this.closest('.toast').remove()" class="text-white/70 hover:text-white">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', toastHTML);

    const newToast = container.lastElementChild;
    setTimeout(() => {
      if (newToast) {
        newToast.style.transition = 'all 0.3s ease';
        newToast.style.opacity = '0';
        setTimeout(() => newToast.remove(), 300);
      }
    }, 4200);
  };

  const addToCart = (id) => {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    setCart(prev => [...prev, { ...product }]);
    showToast(`${product.name} has been added to your cart!`, 'success');
  };

  const removeFromCart = (index) => {
    const removed = cart[index];
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast(`${removed.name} removed from cart`, 'info');
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    showToast(`🎉 Order placed successfully! Total $${total} - Thank you!`, 'success');
    setCart([]);
    setTimeout(() => setActiveSection('products'), 1200);
  };

  const fakeLogin = () => showToast('Login modal would open here (demo)', 'info');
  const fakeGetStarted = () => showToast('Redirecting to checkout flow… (demo)', 'success');
  const fakeContactSales = () => showToast('Sales team contacted! (demo)', 'success');
  const watchDemo = () => showToast('🎥 Demo video would play here (demo)', 'info');

  const showSection = (section) => {
    setActiveSection(section);
  };

  const cartCount = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-base-100 text-base-content">
      {/* NAVBAR - Exact */}
      <nav className="navbar bg-base-100 sticky top-0 z-50 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-violet-600">DigiTools</span>
          </div>

          <div className="hidden lg:flex items-center gap-x-8 font-medium text-base">
            <a href="#" onClick={() => showSection('products')} className="hover:text-violet-600 transition-colors">Products</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Features</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Testimonials</a>
            <a href="#" className="hover:text-violet-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <div onClick={() => showSection('cart')} className="cursor-pointer relative p-2 hover:bg-violet-100 rounded-2xl transition-colors">
              <i className="fa-solid fa-cart-shopping text-2xl text-base-content"></i>
              <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </div>
            <button onClick={fakeLogin} className="btn btn-ghost text-base font-medium px-6">Login</button>
            <button onClick={fakeGetStarted} className="btn bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 rounded-3xl">Get Started</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden btn btn-ghost">
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl z-50 px-6 py-6 border-t">
            <div className="flex flex-col gap-6 text-lg font-medium">
              <a href="#" onClick={() => { showSection('products'); setMobileMenuOpen(false); }} className="hover:text-violet-600">Products</a>
              <a href="#" className="hover:text-violet-600">Features</a>
              <a href="#" className="hover:text-violet-600">Pricing</a>
              <a href="#" className="hover:text-violet-600">Testimonials</a>
              <a href="#" className="hover:text-violet-600">FAQ</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO - Exact */}
      <header className="hero-bg min-h-screen lg:min-h-[85vh] flex items-center px-6 pt-8 lg:pt-0">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-6 py-2 rounded-3xl mb-6 text-sm font-semibold">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
              New: AI-Powered Tools Available
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Supercharge Your<br /><span className="text-violet-600">Digital Workflow</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Access premium AI tools, design assets, templates, and productivity software—all in one place. Start creating faster today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
              <button onClick={() => showSection('products')} className="btn bg-violet-600 hover:bg-violet-700 text-white text-lg h-14 px-8 rounded-3xl flex items-center gap-3">
                Explore Products <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button onClick={watchDemo} className="btn btn-outline border-2 border-violet-600 text-violet-600 hover:bg-violet-50 text-lg h-14 px-8 rounded-3xl flex items-center gap-3">
                <i className="fa-solid fa-play"></i> Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex -space-x-4">
                <div className="w-8 h-8 bg-violet-200 rounded-2xl flex items-center justify-center text-xs font-bold">4.9</div>
              </div>
              <div>
                <div className="flex text-yellow-400 text-lg">★★★★★</div>
                <p className="text-sm font-medium">Rated by 50K+ creators</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
              alt="Hand interacting with futuristic digital workflow interface"
              className="w-full max-w-[520px] rounded-3xl shadow-2xl border-8 border-white"
            />
            <div className="absolute -top-4 -right-4 bg-white shadow-xl px-5 py-3 rounded-3xl flex items-center gap-3 text-sm font-semibold">
              <i className="fa-solid fa-bolt text-violet-600"></i> AI-Powered
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-violet-600 py-6 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <div><div className="text-4xl font-bold">50K+</div><div className="text-violet-200 text-sm tracking-widest mt-1">ACTIVE USERS</div></div>
          <div><div className="text-4xl font-bold">200+</div><div className="text-violet-200 text-sm tracking-widest mt-1">PREMIUM TOOLS</div></div>
          <div><div className="text-4xl font-bold flex items-center justify-center gap-1">4.9 <i className="fa-solid fa-star text-yellow-300"></i></div><div className="text-violet-200 text-sm tracking-widest mt-1">RATING</div></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Premium Digital Tools</h2>
          <p className="text-gray-600 mt-3">Choose from our curated collection of premium digital products designed to boost your productivity and creativity.</p>

          <div className="inline-flex bg-gray-100 p-1 rounded-3xl mt-10 shadow-inner">
            <button 
              onClick={() => showSection('products')}
              className={`px-10 py-3.5 rounded-3xl font-semibold flex items-center gap-2 ${activeSection === 'products' ? 'bg-violet-600 text-white shadow-sm' : 'text-base-content'}`}
            >
              <i className="fa-solid fa-cube"></i> Products
            </button>
            <button 
              onClick={() => showSection('cart')}
              className={`px-10 py-3.5 rounded-3xl font-semibold flex items-center gap-2 ${activeSection === 'cart' ? 'bg-violet-600 text-white shadow-sm' : 'text-base-content'}`}
            >
              Cart <span className="bg-violet-600 text-white text-xs px-2.5 h-5 rounded-3xl flex items-center justify-center font-bold">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Products Grid - Exact match to your description */}
        {activeSection === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map(product => (
              <div key={product.id} className="card bg-white border border-gray-200 rounded-3xl overflow-hidden">
                <div className="card-body p-7">
                  <div className="flex justify-between items-start mb-6">
                    <i className={`${product.icon} text-5xl ${product.tagType === 'warning' ? 'text-amber-500' : product.tagType === 'secondary' ? 'text-violet-500' : 'text-teal-500'}`}></i>
                    <div className={`badge badge-${product.tagType} badge-outline font-medium`}>{product.tag}</div>
                  </div>
                  <h3 className="card-title text-2xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-base mb-6 line-clamp-3">{product.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold">${product.price}</span>
                    <span className="text-gray-400 text-base ml-1">/{product.period}</span>
                  </div>
                  <ul className="mb-8 space-y-3 text-sm">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-emerald-500"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="btn bg-violet-600 hover:bg-violet-700 text-white w-full h-12 rounded-3xl text-base font-semibold"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Section */}
        {activeSection === 'cart' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <i className="fa-solid fa-cart-shopping"></i> Your Cart
            </h2>

            <div className="space-y-6 min-h-[300px]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <i className="fa-solid fa-cart-shopping text-6xl mb-6 opacity-30"></i>
                  <p className="text-2xl font-medium">Your cart is empty</p>
                  <p className="text-sm mt-2">When you add products, they will appear here</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-start gap-5 bg-gray-50 rounded-3xl p-5">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl shadow-inner flex-shrink-0">
                      <i className={`${item.icon} text-3xl text-violet-600`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg leading-tight">{item.name}</p>
                      <p className="text-3xl font-bold text-violet-600 mt-1">${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-rose-500 hover:text-rose-600 font-medium text-sm flex items-center gap-1">
                      <i className="fa-solid fa-trash-can"></i> Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-8 mt-6">
                <div className="flex justify-between items-baseline text-3xl font-bold mb-8">
                  <span className="text-gray-700">Total:</span>
                  <span className="text-violet-600">${totalPrice}</span>
                </div>
                <button onClick={proceedToCheckout} className="btn bg-violet-600 hover:bg-violet-700 text-white w-full h-14 text-xl rounded-3xl">
                  Proceed To Checkout
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">Secure checkout • Instant delivery</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3 Steps Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">Get Started In 3 Steps</h2>
            <p className="text-gray-600 mt-3">Start using premium digital tools in minutes, not hours.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white w-8 h-8 flex items-center justify-center rounded-2xl font-bold text-lg">01</div>
              <div className="mt-8 w-16 h-16 mx-auto bg-violet-100 rounded-3xl flex items-center justify-center">
                <i className="fa-solid fa-user-plus text-4xl text-violet-600"></i>
              </div>
              <h3 className="font-semibold text-2xl mt-8">Create Account</h3>
              <p className="text-gray-500 mt-3">Sign up for free in seconds. No credit card required to get started.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white w-8 h-8 flex items-center justify-center rounded-2xl font-bold text-lg">02</div>
              <div className="mt-8 w-16 h-16 mx-auto bg-violet-100 rounded-3xl flex items-center justify-center">
                <i className="fa-solid fa-cube text-4xl text-violet-600"></i>
              </div>
              <h3 className="font-semibold text-2xl mt-8">Choose Products</h3>
              <p className="text-gray-500 mt-3">Browse our catalog and select the tools that fit your needs.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white w-8 h-8 flex items-center justify-center rounded-2xl font-bold text-lg">03</div>
              <div className="mt-8 w-16 h-16 mx-auto bg-violet-100 rounded-3xl flex items-center justify-center">
                <i className="fa-solid fa-rocket text-4xl text-violet-600"></i>
              </div>
              <h3 className="font-semibold text-2xl mt-8">Start Creating</h3>
              <p className="text-gray-500 mt-3">Download and start using your premium tools immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Exact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 mt-3">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter, Pro, Enterprise cards - identical to your HTML */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col">
              <div className="font-medium text-gray-500">Starter</div>
              <div className="mt-2 text-6xl font-bold">$0</div>
              <div className="text-gray-500">/month</div>
              <p className="mt-6 text-sm text-gray-500">Perfect for getting started</p>
              <ul className="mt-8 space-y-4 flex-1">
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Access to 10 free tools</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Basic templates</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Community support</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>1 project per month</li>
              </ul>
              <button onClick={fakeGetStarted} className="mt-10 btn btn-outline border-violet-300 w-full rounded-3xl py-6 text-lg">Get Started Free</button>
            </div>

            <div className="bg-violet-600 text-white rounded-3xl p-8 flex flex-col relative scale-105 shadow-2xl">
              <div className="absolute -top-3 right-8 bg-yellow-400 text-violet-700 text-xs font-bold px-6 py-1 rounded-3xl">Most Popular</div>
              <div className="font-medium opacity-75">Pro</div>
              <div className="mt-2 text-6xl font-bold">$29</div>
              <div className="opacity-75">/month</div>
              <p className="mt-6 opacity-75 text-sm">Best for professionals</p>
              <ul className="mt-8 space-y-4 flex-1">
                <li className="flex gap-3"><i className="fa-solid fa-check mt-px"></i>Access to all premium tools</li>
                <li className="flex gap-3"><i className="fa-solid fa-check mt-px"></i>Unlimited templates</li>
                <li className="flex gap-3"><i className="fa-solid fa-check mt-px"></i>Priority support</li>
                <li className="flex gap-3"><i className="fa-solid fa-check mt-px"></i>Unlimited projects</li>
                <li className="flex gap-3"><i className="fa-solid fa-check mt-px"></i>Cloud sync</li>
                <li className="flex gap-3"><i className="fa-solid fa-check mt-px"></i>Advanced analytics</li>
              </ul>
              <button onClick={fakeGetStarted} className="mt-10 btn bg-white text-violet-600 hover:bg-white w-full rounded-3xl py-6 text-lg">Start Pro Trial</button>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col">
              <div className="font-medium text-gray-500">Enterprise</div>
              <div className="mt-2 text-6xl font-bold">$99</div>
              <div className="text-gray-500">/month</div>
              <p className="mt-6 text-sm text-gray-500">For teams and businesses</p>
              <ul className="mt-8 space-y-4 flex-1">
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Everything in Pro</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Team collaboration</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Custom integrations</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Dedicated support</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>SLA guarantee</li>
                <li className="flex gap-3"><i className="fa-solid fa-check text-green-500 mt-px"></i>Custom branding</li>
              </ul>
              <button onClick={fakeContactSales} className="mt-10 btn btn-outline border-violet-300 w-full rounded-3xl py-6 text-lg">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Ready To Transform Your Workflow?</h2>
          <p className="mt-4 max-w-md mx-auto">Join thousands of professionals who are already using DigiTools to work smarter.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button onClick={() => showSection('products')} className="btn bg-white text-violet-600 hover:bg-white text-lg px-10 h-14 rounded-3xl">Explore Products</button>
            <button onClick={fakeGetStarted} className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-10 h-14 rounded-3xl">View Pricing</button>
          </div>
          <p className="text-violet-200 text-sm mt-8">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </div>

      {/* FOOTER - Fully Included */}
      <footer className="bg-neutral text-neutral-content">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10">
            <div>
              <span className="text-3xl font-bold">DigiTools</span>
              <p className="text-neutral-400 text-sm mt-4 leading-relaxed max-w-[220px]">
                Premium digital tools for creators, professionals, and businesses. Work smarter with our suite of powerful tools.
              </p>
              <div className="mt-8 flex gap-4 text-2xl">
                <i className="fa-brands fa-x-twitter cursor-pointer hover:text-white"></i>
                <i className="fa-brands fa-facebook cursor-pointer hover:text-white"></i>
                <i className="fa-brands fa-instagram cursor-pointer hover:text-white"></i>
              </div>
            </div>
            <div>
              <p className="uppercase text-xs font-medium tracking-widest mb-4">Product</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href="#" className="hover:text-white">Features</a>
                <a href="#" className="hover:text-white">Pricing</a>
                <a href="#" className="hover:text-white">Templates</a>
                <a href="#" className="hover:text-white">Integrations</a>
              </div>
            </div>
            <div>
              <p className="uppercase text-xs font-medium tracking-widest mb-4">Company</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href="#" className="hover:text-white">About</a>
                <a href="#" className="hover:text-white">Blog</a>
                <a href="#" className="hover:text-white">Careers</a>
                <a href="#" className="hover:text-white">Press</a>
              </div>
            </div>
            <div>
              <p className="uppercase text-xs font-medium tracking-widest mb-4">Resources</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href="#" className="hover:text-white">Documentation</a>
                <a href="#" className="hover:text-white">Help Center</a>
                <a href="#" className="hover:text-white">Community</a>
                <a href="#" className="hover:text-white">Contact</a>
              </div>
            </div>
            <div>
              <p className="uppercase text-xs font-medium tracking-widest mb-4">Legal</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Cookies</a>
              </div>
              <div className="mt-10 text-xs text-neutral-400">© 2026 DigiTools. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>

      <div id="toast-container" className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3"></div>
    </div>
  );
}