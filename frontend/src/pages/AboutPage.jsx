"use client";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { PawPrint, Users, Award, Zap, Clock } from "lucide-react";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { Heart, Star, ChevronRight } from "lucide-react";

export default function About() {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [missionInView, setMissionInView] = useState(false);
  const [timelineInView, setTimelineInView] = useState(false);
  const [teamInView, setTeamInView] = useState(false);
  const [facilityInView, setFacilityInView] = useState(false);
  const [awardsInView, setAwardsInView] = useState(false);

  const missionRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const facilityRef = useRef(null);
  const awardsRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observers for scroll animations
    const observers = [
      { ref: missionRef, setter: setMissionInView },
      { ref: timelineRef, setter: setTimelineInView },
      { ref: teamRef, setter: setTeamInView },
      { ref: facilityRef, setter: setFacilityInView },
      { ref: awardsRef, setter: setAwardsInView },
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

  const timeline = [
    {
      year: "2010",
      title: "Foundation",
      description:
        "City Pet Animal Hospital was founded with a mission to connect loving families with pets in need.",
      image: "/images/adopt3.jpg",
    },
    {
      year: "2015",
      title: "Expansion",
      description:
        "Opened our state-of-the-art veterinary clinic to provide comprehensive medical care.",
      image: "/images/about2.jpg",
    },
    {
      year: "2018",
      title: "Recognition",
      description:
        "Received the Community Service Award for outstanding contribution to animal welfare.",
      image: "/images/about7.jpg",
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description:
        "Launched our online platform to make pet adoption more accessible during the pandemic.",
      image: "/images/about5.jpg",
    },
    {
      year: "2024",
      title: "Today",
      description:
        "Continuing to grow and serve our community with over 500 successful adoptions.",
      image: "/images/about8.jpg",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sugath Pemachandra",
      title: "Chief Veterinarian",
      specialization: "Small Animal Surgery",
      image: "/images/1.jpg",
      bio: "Dr. Sugath has over 15 years of experience in veterinary medicine with a specialization in small animal surgery. He graduated from University of Peradeniya Faculty of Veterinary Medicine and has been with City Pet since 2012.",
      contact: "sugath.pemachandra@citypet.lk",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 2,
      name: "Dr. Pavithra Eshwara",
      title: "Veterinary Surgeon",
      specialization: "Emergency & Critical Care",
      image: "/images/2.jpg",
      bio: "Dr. Pavithra specializes in emergency and critical care medicine. She completed her residency at UC Davis and has been providing 24/7 emergency services at City Pet for over 8 years.",
      contact: "pavithra.eshwara@citypet.lk",
      social: {
        linkedin: "#",
        facebook: "#",
      },
    },
    {
      id: 3,
      name: "Dr. Sugandhika Gothami",
      title: "Veterinary Surgeon",
      specialization: "Pet Matching & Counseling",
      image: "/images/3.jpg",
      bio: "Dr. Sugandhika has been helping families find their perfect companions for over 6 years. She has a degree in Animal Behavior and is passionate about ensuring successful adoptions.",
      contact: "sugandhika.gothami@citypet.lk",
      social: {
        instagram: "#",
        facebook: "#",
      },
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Adoptions", icon: Heart },
    { number: "15+", label: "Years Experience", icon: Clock },
    { number: "50+", label: "Expert Staff", icon: Users },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <Link
              href="/"
              className="text-[#666666] hover:text-[#6D9886] transition-colors duration-300"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-[#666666]" />
            <span className="text-[#6D9886] font-semibold">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 overflow-hidden flex items-center">
        {/* Background Image with Blur Effect */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/city.jpg")',
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
                Sri Lanka's Trusted Animal Hospital
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              About{" "}
              <span className="bg-gradient-to-r from-[#F2E7D5] to-[#e6d4b9] bg-clip-text text-transparent">
                City Pet
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
              Connecting hearts, saving lives. Your trusted partner in pet
              adoption and veterinary care since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gradient-to-br from-white to-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        ref={missionRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#F2A154]/10 to-[#F2C94C]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 ${
                missionInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="inline-flex items-center justify-center lg:justify-start w-20 h-20 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full mb-6 shadow-lg">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-[#393E46] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-[#6c757d] leading-relaxed mb-6">
                At City Pet Animal Hospital, we are dedicated to connecting
                loving families with pets in need while providing exceptional
                veterinary care. We believe every pet deserves a loving home and
                quality medical care throughout their lives.
              </p>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                Our comprehensive approach combines adoption services,
                veterinary medicine, and community education to create a better
                world for pets and their families.
              </p>
            </div>

            {/* Vision */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 delay-300 ${
                missionInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="inline-flex items-center justify-center lg:justify-start w-20 h-20 bg-gradient-to-r from-[#F2A154] to-[#F2C94C] rounded-full mb-6 shadow-lg">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-[#393E46] mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-[#6c757d] leading-relaxed mb-6">
                We envision a community where every pet has a loving home and
                access to quality healthcare. Through our innovative programs,
                compassionate care, and community partnerships.
              </p>
              <p className="text-lg text-[#6c757d] leading-relaxed">
                We strive to eliminate pet homelessness and ensure that all
                animals receive the love, care, and medical attention they
                deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section
        ref={timelineRef}
        className="py-20 bg-gradient-to-br from-[#F7F3F0] to-[#F8F9FA] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-[#6D9886]/10 to-[#8FB8A8]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-[#F2A154]/10 to-[#F2C94C]/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Our <span className="text-[#6D9886]">Journey</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              A story of compassion, growth, and impact in animal welfare
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#6D9886] to-[#8FB8A8] hidden lg:block"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center mb-16 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } transition-all duration-1000 ${
                  timelineInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-full lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                  }`}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white px-6 py-2 rounded-full font-bold text-lg shadow-md">
                        {item.year}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#393E46] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[#6c757d] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                  <div className="relative group cursor-pointer">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-2xl transform rotate-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-2xl p-2 shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-xl w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section
        ref={teamRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Meet Our <span className="text-[#6D9886]">Expert Team</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              Dedicated professionals committed to animal welfare and excellence
              in veterinary care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-white/20 ${
                  teamInView ? "animate-scale-in" : "opacity-0 scale-90"
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: "forwards",
                }}
                onClick={() => setSelectedTeamMember(member)}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                      <ArrowRight className="h-6 w-6 mb-2" />
                      <span className="font-semibold">View Profile</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#393E46] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#6D9886] font-semibold mb-2">
                    {member.title}
                  </p>
                  <p className="text-[#6c757d] text-sm mb-4">
                    {member.specialization}
                  </p>
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

      {/* Team Member Modal */}
      {selectedTeamMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-scale-in">
            <div className="relative">
              <button
                onClick={() => setSelectedTeamMember(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all duration-300 z-10 shadow-lg hover:scale-110"
              >
                <svg
                  className="h-6 w-6 text-[#393E46]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={selectedTeamMember.image}
                alt={selectedTeamMember.name}
                className="w-full h-80 object-cover rounded-t-2xl"
              />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-[#393E46] mb-2">
                {selectedTeamMember.name}
              </h3>
              <p className="text-[#6D9886] font-semibold text-lg mb-2">
                {selectedTeamMember.title}
              </p>
              <p className="text-[#6c757d] mb-6">
                {selectedTeamMember.specialization}
              </p>
              <p className="text-[#6c757d] leading-relaxed mb-6">
                {selectedTeamMember.bio}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-[#6D9886]" />
                  <a
                    href={`mailto:${selectedTeamMember.contact}`}
                    className="text-[#6D9886] hover:text-[#5a8070] transition-colors duration-300"
                  >
                    {selectedTeamMember.contact}
                  </a>
                </div>
                <div className="flex space-x-3">
                  {selectedTeamMember.social.linkedin && (
                    <a
                      href={selectedTeamMember.social.linkedin}
                      className="text-[#6D9886] hover:text-[#5a8070] transition-colors duration-300 transform hover:scale-110"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                  {selectedTeamMember.social.twitter && (
                    <a
                      href={selectedTeamMember.social.twitter}
                      className="text-[#6D9886] hover:text-[#5a8070] transition-colors duration-300 transform hover:scale-110"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                  {selectedTeamMember.social.facebook && (
                    <a
                      href={selectedTeamMember.social.facebook}
                      className="text-[#6D9886] hover:text-[#5a8070] transition-colors duration-300 transform hover:scale-110"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {selectedTeamMember.social.instagram && (
                    <a
                      href={selectedTeamMember.social.instagram}
                      className="text-[#6D9886] hover:text-[#5a8070] transition-colors duration-300 transform hover:scale-110"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Facility Tour */}
      <section
        ref={facilityRef}
        className="py-20 bg-gradient-to-br from-[#F7F3F0] to-[#F8F9FA] relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E46] mb-4">
              Our <span className="text-[#6D9886]">Facility</span>
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
              State-of-the-art facilities designed for optimal pet care and
              comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: "/images/res.jpg" },
              { image: "/images/place1.jpg" },
              { image: "/images/place5.jpg" },
              { image: "/images/play.jpg" },
            ].map((area, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-1000 ${
                  facilityInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                      <h3 className="text-white text-xl font-bold mb-2">
                        {area.name}
                      </h3>
                      <div className="w-0 group-hover:w-16 h-1 bg-white transition-all duration-500 delay-200"></div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6D9886] to-[#8FB8A8] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Visit Our <span className="text-[#F2E7D5]">Facility</span>?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-95">
            Come see our state-of-the-art facilities and meet our dedicated
            team. We're excited to welcome you and your pet!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#6D9886] px-8 py-4 rounded-xl font-semibold hover:bg-[#F2E7D5] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Schedule a Visit
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Us
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
                  <Facebook className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center hover:bg-[#5a8070] transition-colors duration-300">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-[#6D9886] rounded-full flex items-center justify-center hover:bg-[#5a8070] transition-colors duration-300">
                  <Twitter className="h-4 w-4 text-white" />
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
