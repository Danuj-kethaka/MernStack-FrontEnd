"use client";
import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Users,
  Clock,
  Stethoscope,
  Phone,
  ChevronRight,
  ChevronDown,
  Calendar,
  DollarSign,
  PawPrint,
  Star,
  Shield,
  Zap,
  Award,
  ArrowRight,
  MapPin,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const [activeService, setActiveService] = useState("veterinary");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [servicesInView, setServicesInView] = useState(false);
  const [comparisonInView, setComparisonInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

  const servicesRef = useRef(null);
  const comparisonRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observers for scroll animations
    const observers = [
      { ref: servicesRef, setter: setServicesInView },
      { ref: comparisonRef, setter: setComparisonInView },
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

  const services = {
    veterinary: {
      title: "Veterinary Services",
      icon: Stethoscope,
      color: "#6D9886",
      gradient: "from-[#6D9886] to-[#8FB8A8]",
      description: "Comprehensive medical care for your beloved pets",
      services: [
        {
          name: "Routine Care",
          description: "Regular checkups, vaccinations, and preventive care",
          price: "Starting at LKR 1000",
          features: [
            "Annual wellness exams",
            "Vaccination schedules",
            "Dental cleanings",
            "Parasite prevention",
          ],
          image: "/images/r.jpg",
        },
        {
          name: "Surgical Services",
          description: "Expert surgical procedures in our modern facility",
          price: "Varies by procedure",
          features: [
            "Spay/neuter procedures",
            "Soft tissue surgery",
            "Orthopedic surgery",
            "Emergency surgery",
          ],
          image: "/images/s.jpg",
        },
        {
          name: "Diagnostic Services",
          description: "Advanced diagnostic tools for accurate diagnosis",
          price: "Starting at LKR 1500",
          features: [
            "Digital X-rays",
            "Blood work analysis",
            "Ultrasound imaging",
            "ECG monitoring",
          ],
          image: "/images/d.jpg",
        },
        {
          name: "Specialized Care",
          description: "Specialized treatments for complex conditions",
          price: "Consultation required",
          features: [
            "Cardiology services",
            "Dermatology treatment",
            "Oncology care",
            "Behavioral therapy",
          ],
          image: "/images/sc.jpg",
        },
      ],
    },
    adoption: {
      title: "Adoption Services",
      icon: Heart,
      color: "#FFB344",
      gradient: "from-[#FFB344] to-[#F2C94C]",
      description:
        "Find your perfect companion with our comprehensive adoption program",
      services: [
        {
          name: "Pet Matching",
          description:
            "Professional compatibility assessment for successful adoptions",
          price: "Included with adoption",
          features: [
            "Lifestyle assessment",
            "Pet personality evaluation",
            "Family compatibility",
            "Follow-up support",
          ],
          image: "/images/pm.jpg",
        },
        {
          name: "Adoption Process",
          description: "Streamlined adoption process with ongoing support",
          price: "Adoption fees vary",
          features: [
            "Application review",
            "Meet and greet sessions",
            "Home visit (if needed)",
            "Adoption contract",
          ],
          image: "/images/pa.jpg",
        },
        {
          name: "Post-Adoption Support",
          description: "Continued support after you take your pet home",
          price: "Free for 6 months",
          features: [
            "Training resources",
            "Behavioral consultation",
            "Health check follow-ups",
            "24/7 support hotline",
          ],
          image: "/images/pps.jpg",
        },
      ],
    },
    additional: {
      title: "Additional Services",
      icon: Users,
      color: "#8B5CF6",
      gradient: "from-[#8B5CF6] to-[#A78BFA]",
      description: "Comprehensive care services for your pet's wellbeing",
      services: [
        {
          name: "Pet Grooming",
          description: "Professional grooming services for all breeds",
          price: "Starting at LKR 500",
          features: [
            "Full-service baths",
            "Haircuts and styling",
            "Nail trimming",
            "Ear cleaning",
          ],
          image: "/images/pg.jpg",
        },
        {
          name: "Pet Boarding",
          description: "Safe and comfortable boarding for your pets",
          price: "LKR 2500/night",
          features: [
            "Climate-controlled rooms",
            "Daily exercise",
            "Medication administration",
            "Webcam monitoring",
          ],
          image: "/images/pb.jpg",
        },
        {
          name: "Training Classes",
          description: "Professional training for pets of all ages",
          price: "Starting at LKR 10000/course",
          features: [
            "Puppy socialization",
            "Basic obedience",
            "Advanced training",
            "Behavioral modification",
          ],
          image: "/images/pt.jpg",
        },
      ],
    },
    emergency: {
      title: "Emergency Services",
      icon: Clock,
      color: "#EF4444",
      gradient: "from-[#EF4444] to-[#F87171]",
      description:
        "24/7 emergency care when your pet needs immediate attention",
      services: [
        {
          name: "24/7 Emergency Care",
          description: "Round-the-clock emergency medical services",
          price: "Emergency fee applies",
          features: [
            "Immediate triage",
            "Critical care monitoring",
            "Emergency surgery",
            "Intensive care unit",
          ],
          image: "/images/e.jpg",
        },
        {
          name: "Urgent Care",
          description:
            "Same-day appointments for urgent but non-critical issues",
          price: "Starting at LKR 2000",
          features: [
            "Same-day appointments",
            "Minor injury treatment",
            "Illness evaluation",
            "Pain management",
          ],
          image: "/images/u.jpg",
        },
      ],
    },
  };

  const faqs = [
    {
      category: "General",
      question: "What are your operating hours?",
      answer:
        "We are open Monday-Friday 8AM-6PM, Saturday 9AM-4PM, and Sunday 10AM-2PM. Emergency services are available 24/7.",
    },
    {
      category: "Veterinary",
      question: "Do I need an appointment for veterinary services?",
      answer:
        "Yes, we recommend scheduling appointments in advance. However, we do accept walk-ins for urgent care during business hours.",
    },
    {
      category: "Adoption",
      question: "What is included in the adoption fee?",
      answer:
        "Adoption fees include spay/neuter surgery, current vaccinations, microchipping, and a health certificate. Fees vary by pet age and type.",
    },
    {
      category: "Emergency",
      question: "How do I know if my pet needs emergency care?",
      answer:
        "Contact us immediately if your pet is experiencing difficulty breathing, severe bleeding, seizures, loss of consciousness, or severe pain.",
    },
    {
      category: "Pricing",
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer flexible payment plans for major procedures. We also accept pet insurance and CareCredit financing.",
    },
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
            <span className="text-[#6D9886] font-semibold">Services</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 overflow-hidden flex items-center">
        {/* Background Image with Blur Effect */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/t.jpg")',
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
                Professional Pet Care Services
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Our{" "}
              <span className="bg-gradient-to-r from-[#F2E7D5] to-[#e6d4b9] bg-clip-text text-transparent">
                Services
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
              Comprehensive veterinary care, adoption services, and emergency
              support for your beloved pets
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories Navigation */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(services).map(([key, service]) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveService(key)}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:-translate-y-2 shadow-lg ${
                    activeService === key
                      ? "text-white scale-105 shadow-xl"
                      : "bg-white text-[#393E46] hover:shadow-xl border border-white/20"
                  }`}
                  style={{
                    background:
                      activeService === key
                        ? `linear-gradient(135deg, ${service.color}, ${service.color}dd)`
                        : undefined,
                  }}
                >
                  <IconComponent className="h-6 w-6" />
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Service Content */}
      <section
        ref={servicesRef}
        className="py-20 bg-gradient-to-br from-[#F7F3F0] to-[#F8F9FA] relative overflow-hidden"
      >
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#F2A154]/10 to-[#F2C94C]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              servicesInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full mb-6 shadow-lg">
              {(() => {
                const IconComponent = services[activeService].icon;
                return <IconComponent className="h-10 w-10 text-white" />;
              })()}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              {services[activeService].title}
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              {services[activeService].description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services[activeService].services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/20 ${
                  servicesInView ? "animate-scale-in" : "opacity-0 scale-90"
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="relative group overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[#393E46]">
                      {service.name}
                    </h3>
                    <div className="text-right">
                      <div className="flex items-center text-[#6D9886] font-semibold bg-[#6D9886]/10 px-3 py-1 rounded-full">
                        <span>{service.price}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#6c757d] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#393E46] mb-3">
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-[#6c757d]"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scale-in {
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-scale-in {
            animation: scale-in 0.8s ease-out forwards;
          }
        `}</style>
      </section>

      {/* Service Comparison Table */}
      <section
        ref={comparisonRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              comparisonInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Service <span className="text-[#6D9886]">Packages</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              Compare our different service packages to find the perfect fit for
              your pet
            </p>
          </div>

          <div
            className={`overflow-x-auto transition-all duration-1000 delay-300 ${
              comparisonInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <table className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <thead className="bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white">
                <tr>
                  <th className="px-8 py-6 text-left font-bold text-lg">
                    Service
                  </th>
                  <th className="px-8 py-6 text-center font-bold text-lg">
                    Basic
                  </th>
                  <th className="px-8 py-6 text-center font-bold text-lg">
                    Standard
                  </th>
                  <th className="px-8 py-6 text-center font-bold text-lg">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    service: "Wellness Exam",
                    basic: "✓",
                    standard: "✓",
                    premium: "✓",
                  },
                  {
                    service: "Vaccinations",
                    basic: "Core only",
                    standard: "✓",
                    premium: "✓",
                  },
                  {
                    service: "Blood Work",
                    basic: "-",
                    standard: "Basic",
                    premium: "Comprehensive",
                  },
                  {
                    service: "Dental Cleaning",
                    basic: "-",
                    standard: "-",
                    premium: "✓",
                  },
                  {
                    service: "Emergency Discount",
                    basic: "-",
                    standard: "10%",
                    premium: "20%",
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                  >
                    <td className="px-8 py-6 font-semibold text-[#393E46]">
                      {row.service}
                    </td>
                    <td className="px-8 py-6 text-center text-[#6c757d]">
                      {row.basic}
                    </td>
                    <td className="px-8 py-6 text-center text-[#6c757d]">
                      {row.standard}
                    </td>
                    <td className="px-8 py-6 text-center text-[#6c757d]">
                      {row.premium}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
                  <td className="px-8 py-6 font-bold text-[#393E46] text-lg">
                    Price
                  </td>
                  <td className="px-8 py-6 text-center font-bold text-[#6D9886] text-lg">
                    LKR 7500
                  </td>
                  <td className="px-8 py-6 text-center font-bold text-[#6D9886] text-lg">
                    LKR 15000
                  </td>
                  <td className="px-8 py-6 text-center font-bold text-[#6D9886] text-lg">
                    LKR 25000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-20 bg-gradient-to-br from-[#F7F3F0] to-[#F8F9FA] relative overflow-hidden"
      >
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
              Find answers to common questions about our services
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
                  <div>
                    <span className="inline-block bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#393E46] group-hover:text-[#6D9886] transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
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

          .animate-slide-in-up {
            animation: slide-in-up 0.8s ease-out forwards;
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}</style>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/paw-pattern.svg')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Schedule <span className="text-[#F2E7D5]">Your Visit</span>
            ?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-95">
            Book an appointment today and give your pet the professional care
            they deserve
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Appointment"
              className="bg-white text-[#6D9886] px-8 py-4 rounded-xl font-semibold hover:bg-[#F2E7D5] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Appointment
            </Link>
            <a href="tel:0777901213">
              <button className="bg-[#F2A154] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#e09d3a] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg">
                <Phone className="h-5 w-5 mr-2" />
                Call Now: 0777901213
              </button>
            </a>
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
