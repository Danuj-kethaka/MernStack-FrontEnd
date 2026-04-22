"use client";
import { useState, useEffect, useRef } from "react";
import { Star, PawPrint, ArrowRight, Users, Shield, Zap } from "lucide-react";
import { Heart, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { MessageCircle, Calendar } from "lucide-react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
    contactMethod: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [mapInView, setMapInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

  const contactRef = useRef(null);
  const mapRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observers for scroll animations
    const observers = [
      { ref: contactRef, setter: setContactInView },
      { ref: mapRef, setter: setMapInView },
      { ref: faqRef, setter: setFaqInView },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observers.forEach(({ ref, setter }) => {
            if (entry.target === ref.current && entry.isIntersecting) {
              setter(true);
            }
          });
        });
      },
      { threshold: 0.3 }
    );

    observers.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observers.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
        contactMethod: "email",
      });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const faqs = [
    {
      question: "What are your adoption hours?",
      answer:
        "Our adoption center is open Monday-Friday 10AM-6PM, Saturday 9AM-5PM, and Sunday 11AM-4PM. We recommend calling ahead to ensure the pet you're interested in is available.",
    },
    {
      question: "Do you offer emergency veterinary services?",
      answer:
        "Yes, we provide 24/7 emergency veterinary care. For emergencies, please call our emergency line at 0718314202 or visit our facility immediately.",
    },
    {
      question: "How long does the adoption process take?",
      answer:
        "The adoption process typically takes 1-3 days, depending on the completeness of your application and reference checks. Same-day adoptions are possible for pre-approved applicants.",
    },
    {
      question: "Do you accept pet surrenders?",
      answer:
        "Yes, we accept pet surrenders by appointment only. Please call us to discuss your situation and schedule a surrender appointment. There may be a surrender fee depending on circumstances.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, credit cards (Visa, MasterCard, American Express), debit cards, and CareCredit financing for veterinary services. Payment plans are available for major procedures.",
    },
    {
      question: "Do you offer volunteer opportunities?",
      answer:
        "We have various volunteer opportunities including dog walking, cat socialization, administrative help, and special events. Contact our volunteer coordinator for more information.",
    },
  ];

  const contactStats = [
    { number: "24/7", label: "Emergency Support", icon: Clock },
    { number: "15min", label: "Average Response Time", icon: Zap },
    { number: "5000+", label: "Happy Clients", icon: Users },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <Link
              href="/"
              className="text-[#666666] hover:text-[#6D9886] transition-colors duration-300"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-[#666666]" />
            <span className="text-[#6D9886] font-semibold">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 overflow-hidden flex items-center">
        {/* Background Image with Blur Effect */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/contact.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6D9886]/30 to-[#8FB8A8]/30 z-0"></div>

        <div className="container mx-auto relative z-10 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-lg font-semibold text-[#6D9886]">
                We're Here to Help
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Contact{" "}
              <span className="bg-gradient-to-r from-[#F2E7D5] to-[#e6d4b9] bg-clip-text text-transparent">
                City Pet
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
              Get in touch with our team for appointments, pet adoption
              inquiries, or any questions about our services
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gradient-to-br from-white to-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {contactStats.map((stat, index) => {
              const Icon = stat.icon;
              const colorSchemes = [
                { bg: "from-[#6D9886] to-[#8FB8A8]", text: "text-[#6D9886]" },
                { bg: "from-[#F2A154] to-[#F2C94C]", text: "text-[#F2A154]" },
                { bg: "from-[#6C63FF] to-[#8A84E2]", text: "text-[#6C63FF]" },
                { bg: "from-[#E76F51] to-[#F4A261]", text: "text-[#E76F51]" },
              ];

              const colors = colorSchemes[index];

              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colors.bg} rounded-full mb-4 shadow-md`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`text-3xl font-bold ${colors.text} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-[#6c757d] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section
        ref={contactRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div
              className={`transition-all duration-1000 ${
                contactInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-4xl font-bold text-[#393E46] mb-8">
                Get in Touch
              </h2>

              {/* Contact Cards */}
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: MapPin,
                    color: "#6D9886",
                    title: "Visit Us",
                    content: "No. 133/2E, High level Road, Kottawa, Sri Lanka",
                    delay: 0,
                  },
                  {
                    icon: Phone,
                    color: "#F2A154",
                    title: "Call Us",
                    content:
                      "Main: 0777901213\nEmergency: 0718314202\nAdoption: 0777901213",
                    delay: 100,
                  },
                  {
                    icon: Mail,
                    color: "#8B5CF6",
                    title: "Email Us",
                    content:
                      "General: info@citypet.com\nAdoption: adopt@citypet.com\nMedical: medical@citypet.com",
                    delay: 200,
                  },
                  {
                    icon: Clock,
                    color: "#10B981",
                    title: "Hours",
                    content:
                      "Regular Hours: Mon-Fri 8AM-6PM, Sat 9AM-4PM, Sun 10AM-2PM\nEmergency Care: 24/7",
                    delay: 300,
                  },
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 ${
                        contactInView
                          ? "animate-slide-in-left"
                          : "opacity-0 translate-x-[-50px]"
                      }`}
                      style={{
                        animationDelay: `${item.delay}ms`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-full shadow-md`}
                          style={{ backgroundColor: `${item.color}10` }}
                        >
                          <IconComponent
                            className="h-6 w-6"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#393E46] mb-2">
                            {item.title}
                          </h3>
                          <p className="text-[#6c757d] whitespace-pre-line leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Contact Options */}
              <div className="bg-gradient-to-br from-[#F7F3F0] to-[#F8F9FA] p-6 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-[#393E46] mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="tel:0718314202"
                    className="bg-gradient-to-r from-red-500 to-red-400 text-white p-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg group"
                  >
                    <Phone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Emergency Call
                  </a>
                  <Link
                    href="/Appointment"
                    className="bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white p-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg group"
                  >
                    <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Book Appointment
                  </Link>
                  <a
                    href="https://wa.me/94717901213?text=Hello%20City%20Pet%20Animal%20Hospital%2C%20I%20need%20assistance%20with%20my%20pet."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg group"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    WhatsApp Chat
                  </a>
                  <Link
                    href="/pets"
                    className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white p-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg group"
                  >
                    <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    View Pets
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                contactInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500">
                <h2 className="text-3xl font-bold text-[#393E46] mb-6">
                  Send us a Message
                </h2>

                {submitStatus === "success" && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6 animate-fade-in shadow-md">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Thank you! Your message has been sent successfully. We'll
                      get back to you soon.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-[#393E46] mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D9886] focus:ring-2 focus:ring-[#6D9886] focus:ring-opacity-20 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#393E46] mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D9886] focus:ring-2 focus:ring-[#6D9886] focus:ring-opacity-20 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-[#393E46] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D9886] focus:ring-2 focus:ring-[#6D9886] focus:ring-opacity-20 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-[#393E46] mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D9886] focus:ring-2 focus:ring-[#6D9886] focus:ring-opacity-20 transition-all duration-300"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="adoption">Pet Adoption</option>
                      <option value="medical">Medical Services</option>
                      <option value="volunteer">Volunteer Opportunities</option>
                      <option value="donation">Donations</option>
                      <option value="complaint">Complaint/Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#393E46] mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D9886] focus:ring-2 focus:ring-[#6D9886] focus:ring-opacity-20 transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                    <div className="text-right text-sm text-[#6c757d] mt-1">
                      {formData.message.length}/500
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg group"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide-in-left {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out forwards;
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}</style>
      </section>

      {/* Interactive Map */}
      {/* Interactive Map */}
      <section
        ref={mapRef}
        className="py-20 bg-gradient-to-br from-[#F7F3F0] to-[#F8F9FA] relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              mapInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Find Our <span className="text-[#6D9886]">Location</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              Visit us at our conveniently located facility in Kottawa
            </p>
          </div>

          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:shadow-xl transition-all duration-500 ${
              mapInView ? "animate-scale-in" : "opacity-0 scale-95"
            }`}
          >
            {/* Google Maps Embed */}
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.950234100799!2d79.99117547583296!3d6.822955219372673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245416a1fffd7%3A0x2ecf2d5f8f8f8f8f!2sKottawa%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-t-2xl"
                title="City Pet Animal Hospital Location - No. 133/2E, High level Road, Kottawa"
              ></iframe>
            </div>

            <div className="p-8 bg-white">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-[#393E46] mb-2">
                  City Pet Animal Hospital
                </h3>
                <p className="text-[#6c757d]">
                  No. 133/2E, High level Road, Kottawa, Sri Lanka
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
                {[
                  {
                    title: "Parking",
                    description:
                      "Ample parking space available in our facility",
                    icon: "🅿️",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    title: "Public Transit",
                    description: "Easy access via public transportation",
                    icon: "🚌",
                    color: "from-green-500 to-green-600",
                  },
                  {
                    title: "Accessibility",
                    description: "Wheelchair accessible with ramp",
                    icon: "♿",
                    color: "from-purple-500 to-purple-600",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-[#FAFAFA] rounded-xl transition-all duration-300 group"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-[#393E46] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#6c757d] text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://maps.app.goo.gl/GmspaqDbX3K9hGSm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1 shadow-lg group"
                >
                  <MapPin className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Open in Google Maps
                </a>
                <a
                  href="https://www.google.com/maps/dir//No.+133%2F2E,+High+level+Road,+Kottawa,+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-[#6D9886] text-[#6D9886] px-6 py-3 rounded-xl font-semibold hover:bg-[#6D9886] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Get Directions
                </a>
              </div>

              {/* Quick Travel Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-[#F7F3F0] to-[#F8F9FA] rounded-xl">
                <h4 className="font-semibold text-[#393E46] mb-2 text-center">
                  📍 How to Reach Us
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#6c757d]">
                  <div>
                    <strong>By Car:</strong> Located on High Level Road,
                    Kottawa. Ample parking available.
                  </div>
                  <div>
                    <strong>By Bus:</strong> Multiple bus routes stop near our
                    location.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              faqInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Frequently Asked <span className="text-[#6D9886]">Questions</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              Quick answers to common questions about our services and
              facilities
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/20 ${
                  faqInView
                    ? "animate-slide-in-up"
                    : "opacity-0 translate-y-[20px]"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-[#FAFAFA] transition-all duration-300 group"
                >
                  <h3 className="text-lg font-semibold text-[#393E46] group-hover:text-[#6D9886] transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-[#6D9886] transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-8 pb-6 animate-fade-in">
                    <p className="text-[#6c757d] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes slide-in-up {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-in-up {
            animation: slide-in-up 0.8s ease-out forwards;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need <span className="text-[#F2E7D5]">Immediate Assistance</span>?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-95">
            Don't hesitate to reach out. Our team is ready to help you and your
            pet
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0718314202"
              className="bg-white text-[#6D9886] px-8 py-4 rounded-xl font-semibold hover:bg-[#F2E7D5] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Emergency: 0718314202
            </a>
            <Link
              href="/Appointment"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#393E46] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full flex items-center justify-center">
                  <PawPrint className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">
                  CityPet Animal Hospital
                </span>
              </div>
              <p className="text-[#adb5bd] mb-4">
                Connecting hearts, saving lives. Your trusted partner in pet
                adoption and veterinary care.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center hover:bg-[#5a8070] transition-colors duration-300">
                  <i className="fab fa-facebook-f text-white text-sm"></i>
                </div>
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center hover:bg-[#5a8070] transition-colors duration-300">
                  <i className="fab fa-instagram text-white text-sm"></i>
                </div>
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center hover:bg-[#5a8070] transition-colors duration-300">
                  <i className="fab fa-twitter text-white text-sm"></i>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-[#adb5bd]">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pets"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Adopt a Pet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Our Services</h3>
              <ul className="space-y-2 text-[#adb5bd]">
                <li>
                  <Link
                    href="/services#adoption"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Pet Adoption
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#veterinary"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Veterinary Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#emergency"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Emergency Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#grooming"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Pet Grooming
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#boarding"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Pet Boarding
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3 text-[#adb5bd]">
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#6D9886] mr-3" />
                  <span>No. 133/2E, High level Road, Kottawa, Sri Lanka</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-[#6D9886] mr-3" />
                  <span>0777901213</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-[#6D9886] mr-3" />
                  <span>Emergency: 0718314202</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-[#6D9886] mr-3" />
                  <span>info@citypet.lk</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-[#6D9886] mr-3" />
                  <span>Open 24/7</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#495057] mt-8 pt-8 text-center text-[#adb5bd]">
            <p>&copy; 2025 City Pet Animal Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
