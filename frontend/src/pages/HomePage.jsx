"use client";
import { useState, useEffect, useRef } from "react";
import { Heart, PawPrint, Users, Clock, Star } from "lucide-react";
import { Shield, Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import { Calendar, Award, Zap, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counted, setCounted] = useState(false);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const [servicesInView, setServicesInView] = useState(false);
  const [whyChooseUsInView, setWhyChooseUsInView] = useState(false);

  // Stats counting animation
  const [statsValues, setStatsValues] = useState({
    happyPets: 0,
    expertStaff: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    // Intersection Observer for stats counting animation
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    // Intersection Observer for services animation
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesInView(true);
        }
      },
      { threshold: 0.3 }
    );

    // Intersection Observer for Why Choose Us animation
    const whyChooseUsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhyChooseUsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    if (servicesRef.current) {
      servicesObserver.observe(servicesRef.current);
    }

    if (whyChooseUsRef.current) {
      whyChooseUsObserver.observe(whyChooseUsRef.current);
    }

    return () => {
      clearInterval(interval);
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
      if (servicesRef.current) {
        servicesObserver.unobserve(servicesRef.current);
      }
      if (whyChooseUsRef.current) {
        whyChooseUsObserver.unobserve(whyChooseUsRef.current);
      }
    };
  }, [counted]);

  const animateStats = () => {
    const durations = {
      happyPets: 2000,
      expertStaff: 1500,
      satisfaction: 2500,
    };

    // Happy Pets counting
    const happyPetsInterval = setInterval(() => {
      setStatsValues((prev) => {
        if (prev.happyPets >= 500) {
          clearInterval(happyPetsInterval);
          return { ...prev, happyPets: 500 };
        }
        return { ...prev, happyPets: prev.happyPets + 25 };
      });
    }, durations.happyPets / 20);

    // Expert Staff counting
    const expertStaffInterval = setInterval(() => {
      setStatsValues((prev) => {
        if (prev.expertStaff >= 50) {
          clearInterval(expertStaffInterval);
          return { ...prev, expertStaff: 50 };
        }
        return { ...prev, expertStaff: prev.expertStaff + 2.5 };
      });
    }, durations.expertStaff / 20);

    // Satisfaction counting
    const satisfactionInterval = setInterval(() => {
      setStatsValues((prev) => {
        if (prev.satisfaction >= 98) {
          clearInterval(satisfactionInterval);
          return { ...prev, satisfaction: 98 };
        }
        return { ...prev, satisfaction: prev.satisfaction + 4.9 };
      });
    }, durations.satisfaction / 20);
  };

  const stats = [
    {
      number: `${Math.min(Math.round(statsValues.happyPets), 500)}+`,
      label: "Happy Pets",
      icon: PawPrint,
    },
    {
      number: `${Math.min(Math.round(statsValues.expertStaff), 50)}+`,
      label: "Expert Staff",
      icon: Users,
    },
    {
      number: "24/7",
      label: "Emergency Care",
      icon: Clock,
    },
    {
      number: `${Math.min(Math.round(statsValues.satisfaction), 98)}%`,
      label: "Satisfaction",
      icon: Star,
    },
  ];

  const services = [
    {
      title: "Pet Adoption",
      description:
        "Find your perfect furry companion from our loving pets waiting for their forever homes.",
      icon: Heart,
      image: "adopt2.jpg",
    },
    {
      title: "Veterinary Care",
      description:
        "Comprehensive medical services including check-ups, vaccinations, and specialized treatments.",
      icon: Shield,
      image: "adopt7.jpg",
    },
    {
      title: "Emergency Services",
      description:
        "24/7 emergency care when your pet needs immediate medical attention.",
      icon: Zap,
      image: "adpot8.jpg",
    },
    {
      title: "Pet Grooming",
      description:
        "Professional grooming services to keep your pet looking and feeling their best.",
      icon: Award,
      image: "adopt3.jpg",
    },
  ];

  const whyChooseUsPoints = [
    {
      icon: Shield,
      title: "Certified Professionals",
      description:
        "Our team consists of highly qualified and certified veterinarians with years of experience.",
    },
    {
      icon: Zap,
      title: "24/7 Emergency Care",
      description:
        "Round-the-clock emergency services to ensure your pet gets immediate attention when needed.",
    },
    {
      icon: Award,
      title: "Award-Winning Facility",
      description:
        "State-of-the-art equipment and modern facilities for comprehensive pet care.",
    },
    {
      icon: Heart,
      title: "Compassionate Approach",
      description:
        "We treat every pet with the love and care they deserve, like family.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Multidisciplinary team of specialists working together for your pet's wellbeing.",
    },
    {
      icon: Star,
      title: "Proven Track Record",
      description:
        "Years of successful treatments and happy pet families across Sri Lanka.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
      {/* Hero Section */}
      <section className="relative min-h-screen px-4 overflow-hidden flex items-center">
        {/* Background Image with Blur Effect */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/hero.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6D9886]/20 to-[#8FB8A8]/20 z-0"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div
              className={`text-center md:text-left transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 md:mb-6 shadow-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-[#6D9886]">
                  Sri Lanka's Trusted Animal Hospital
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                Compassionate Care for Your{" "}
                <span className="bg-gradient-to-r from-[#F2E7D5] to-[#e6d4b9] bg-clip-text text-transparent">
                  Beloved Pets
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 drop-shadow-md">
                Professional veterinary services, pet adoption, and emergency
                care with the warmth of Sri Lankan hospitality.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link
                  to="/"
                  className="bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
                >
                  <Heart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Book Appointment
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-2" />
                </Link>
                <Link
                  to="/"
                  className="border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-white/20 backdrop-blur-sm transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
                >
                  <Play className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Our Services
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div
              className={`hidden md:block relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-2xl transform rotate-3 shadow-2xl"></div>
                <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                  <img
                    src="/images/about7.jpg"
                    alt="Happy pets"
                    className="rounded-xl w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full flex items-center justify-center">
                        <PawPrint className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#393E46]">
                          Emergency Care Available
                        </h3>
                        <p className="text-sm text-[#6c757d]">
                          24/7 veterinary services
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 bg-gradient-to-br from-[#F7F3F0] to-[#F8F9FA]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#393E46] mb-4">
              Our <span className="text-[#6D9886]">Achievements</span>
            </h2>
            <p className="text-lg text-[#6c757d] max-w-2xl mx-auto">
              Years of dedicated service and countless happy pets speak to our
              commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
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

                  <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 ease-out`}
                      style={{
                        width: counted ? "100%" : "0%",
                        transitionDelay: `${index * 200}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
              <Zap className="h-5 w-5 text-[#F2A154]" />
              <span className="text-sm font-medium text-[#393E46]">
                Trusted by pet owners since 2010
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Scroll Animations */}
      <section
        ref={servicesRef}
        className="py-20 bg-[#F7F3F0] relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#F2A154]/10 to-[#F2C94C]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Our <span className="text-[#6D9886]">Services</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              Comprehensive care solutions tailored to meet all your pet's needs
              with compassion and expertise.
            </p>
          </div>

          {/* Animated Grid Layout */}
          <div
            className={`grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ${
              servicesInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Emergency Room - Image (Slides from left) */}
            <div
              className={`relative h-80 bg-gradient-to-br from-red-500 to-red-400 group overflow-hidden transition-all duration-1000 delay-200 ${
                servicesInView
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <img
                src="/images/adpot8.jpg"
                alt="Emergency Room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    EMERGENCY ROOM
                  </h3>
                  <div className="w-0 group-hover:w-16 h-1 bg-white transition-all duration-500 delay-200"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-all duration-500"></div>
            </div>

            {/* Emergency Room - Description (Slides from right) */}
            <div
              className={`bg-white p-8 flex flex-col justify-center group hover:bg-gradient-to-br hover:from-white hover:to-red-50 transition-all duration-500 ${
                servicesInView
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg text-[#6c757d] leading-relaxed group-hover:text-[#393E46] transition-colors duration-300">
                Our Emergency Department is an American College of Surgeons
                certified level one pediatric trauma center.
              </p>
              <Link
                href="/services/emergency"
                className="mt-4 flex items-center text-red-500 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500"
              >
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Pet Adoption - Image (Slides from right) */}
            <div
              className={`relative h-80 bg-gradient-to-br from-[#6D9886] to-[#8FB8A8] group overflow-hidden transition-all duration-1000 delay-400 ${
                servicesInView
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <img
                src="/images/about4.jpg"
                alt="Pet Adoption"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    PET ADOPTION
                  </h3>
                  <div className="w-0 group-hover:w-16 h-1 bg-white transition-all duration-500 delay-200"></div>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <Heart
                      key={i}
                      className="h-4 w-4 text-white fill-current animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Pet Adoption - Description (Slides from left) */}
            <div
              className={`bg-white p-8 flex flex-col justify-center group hover:bg-gradient-to-br hover:from-white hover:to-[#6D9886]/10 transition-all duration-500 delay-200 ${
                servicesInView
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <PawPrint className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg text-[#6c757d] leading-relaxed group-hover:text-[#393E46] transition-colors duration-300">
                Find your perfect furry companion from our loving pets waiting
                for their forever homes.
              </p>
              <Link
                href="/services/adoption"
                className="mt-4 flex items-center text-[#6D9886] opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500"
              >
                Meet our pets <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Veterinary Care - Image (Slides from left) */}
            <div
              className={`relative h-80 bg-gradient-to-br from-green-500 to-green-400 group overflow-hidden transition-all duration-1000 delay-600 ${
                servicesInView
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <img
                src="/images/adopt7.jpg"
                alt="Veterinary Care"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    VETERINARY CARE
                  </h3>
                  <div className="w-0 group-hover:w-16 h-1 bg-white transition-all duration-500 delay-200"></div>
                </div>
              </div>
              <div className="absolute top-6 left-6 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>

            {/* Veterinary Care - Description (Slides from right) */}
            <div
              className={`bg-white p-8 flex flex-col justify-center group hover:bg-gradient-to-br hover:from-white hover:to-green-50 transition-all duration-500 delay-400 ${
                servicesInView
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg text-[#6c757d] leading-relaxed group-hover:text-[#393E46] transition-colors duration-300">
                Comprehensive medical services for your pet's health and
                wellbeing.
              </p>
              <Link
                href="/services/veterinary"
                className="mt-4 flex items-center text-green-500 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500"
              >
                View services <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Call to Action Button */}
          <div
            className={`text-center mt-12 transition-all duration-700 delay-1000 ${
              servicesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              href="/services"
              className="inline-flex items-center bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:-translate-y-1 shadow-lg hover:scale-105 group"
            >
              <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={whyChooseUsRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-[#F2A154]/10 to-[#F2C94C]/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Why Choose <span className="text-[#6D9886]">City Pet</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              Experience the difference with Sri Lanka's most trusted animal
              care facility
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Left Points Grid */}
            <div className="space-y-6">
              {whyChooseUsPoints.slice(0, 3).map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-white to-[#F8F9FA] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 transform hover:-translate-y-1 border border-white/20 ${
                      whyChooseUsInView
                        ? "animate-slide-in-left"
                        : "opacity-0 translate-x-[-50px]"
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#393E46] text-lg mb-2">
                          {point.title}
                        </h3>
                        <p className="text-[#6c757d] text-sm leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Doctor Image */}
            <div className="relative">
              <div
                className={`relative mx-auto w-64 h-80 lg:w-80 lg:h-96 ${
                  whyChooseUsInView ? "animate-scale-in" : "opacity-0 scale-90"
                }`}
                style={{
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-2xl transform rotate-3 shadow-2xl"></div>
                <div className="relative bg-white rounded-2xl p-2 shadow-2xl h-full">
                  <img
                    src="/images/1.jpg"
                    alt="Our Veterinary Doctor"
                    className="rounded-xl w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <div className="text-center">
                      <h3 className="font-bold text-[#393E46]">
                        Dr. Sugath Pemachandra
                      </h3>
                      <p className="text-sm text-[#6c757d]">
                        Chief Veterinary Surgeon
                      </p>
                      <div className="flex justify-center mt-2 space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating certification badge */}
              <div
                className={`absolute -top-4 -right-4 bg-gradient-to-r from-[#F2A154] to-[#F2C94C] text-white px-4 py-2 rounded-full shadow-lg transform rotate-12 ${
                  whyChooseUsInView
                    ? "animate-slide-in-up"
                    : "opacity-0 translate-y-[20px]"
                }`}
                style={{
                  animationDelay: "0.6s",
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-bold">Certified</span>
                </div>
              </div>
            </div>

            {/* Right Points Grid */}
            <div className="space-y-6">
              {whyChooseUsPoints.slice(3, 6).map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-white to-[#F8F9FA] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 transform hover:-translate-y-1 border border-white/20 ${
                      whyChooseUsInView
                        ? "animate-slide-in-right"
                        : "opacity-0 translate-x-[50px]"
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#393E46] text-lg mb-2">
                          {point.title}
                        </h3>
                        <p className="text-[#6c757d] text-sm leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
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

          @keyframes slide-in-right {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes scale-in {
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slide-in-up {
            to {
              opacity: 1;
              transform: rotate(12deg) translateY(0);
            }
          }

          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out forwards;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out forwards;
          }

          .animate-scale-in {
            animation: scale-in 0.8s ease-out forwards;
          }

          .animate-slide-in-up {
            animation: slide-in-up 0.8s ease-out forwards;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Give a Pet a{" "}
            <span className="text-[#F2E7D5]">Loving Home</span>?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-95">
            Join thousands of happy families who found their perfect companion
            through us. Let's make a difference together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pets"
              className="bg-white text-[#6D9886] px-8 py-4 rounded-xl font-semibold hover:bg-[#F2E7D5] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
            >
              <PawPrint className="h-5 w-5 mr-2" />
              Browse Available Pets
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Schedule a Visit
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
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook-f text-white text-sm"></i>
                </div>
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram text-white text-sm"></i>
                </div>
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center">
                  <i className="fab fa-twitter text-white text-sm"></i>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-[#adb5bd]">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/adopt"
                    className="hover:text-white transition-colors"
                  >
                    Adopt a Pet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
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
                    className="hover:text-white transition-colors"
                  >
                    Pet Adoption
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#veterinary"
                    className="hover:text-white transition-colors"
                  >
                    Veterinary Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#emergency"
                    className="hover:text-white transition-colors"
                  >
                    Emergency Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#grooming"
                    className="hover:text-white transition-colors"
                  >
                    Pet Grooming
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#boarding"
                    className="hover:text-white transition-colors"
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
