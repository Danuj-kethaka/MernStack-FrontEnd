import { useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { usePetAdoptionStore } from "../store/PetAdoption/PetAdoption";
import { Link } from "react-router-dom";

const PetPage = () => {
  const { PetAdoption, fetchPetAdoption } = usePetAdoptionStore();
  useEffect(() => {
    fetchPetAdoption();
  }, []);

   const sliderImages = [
  {
    src: "images/huu.jpg",
    alt: "Veterinarian examining a dog",
  },
  {
    src: "images/happy.jpg",
    alt: "Happy cat at the vet",
  },
  {
    src: "images/lab.jpg",
    alt: "Vet technician holding a puppy",
  },
];

const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);

const goToSlide = (index) => setCurrentSlide(index);
const goToPrevSlide = () =>
  setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
const goToNextSlide = () =>
  setCurrentSlide((prev) => (prev + 1) % sliderImages.length);

return (
  <>
    <section className="relative text-black overflow-hidden h-[32rem] mt-16">
      <div className="absolute inset-0">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Give a Pet a Chance  <br />
            <span className="text-yellow-500">Find Their Forever Home</span>
          </h1>
          <p className="text-lg text-gray-800 mb-8">
            Find your perfect companion and give a loving home to a pet in need.
          </p>
        </div>
      </div>

      <button
        onClick={goToPrevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full"
      >
        <ChevronRight />
      </button>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Pets Available for Adoption
      </h2>

      {PetAdoption.length === 0 ? (
        <p className="text-center text-gray-500">
          No pets available for adoption right now.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PetAdoption.filter(Boolean).map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={pet.PetImage}
                alt={pet.Petname}
                className="h-56 w-full object-cover rounded-t-xl"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">{pet.Petname}</h3>
                <p className="text-sm text-gray-600">
                  {pet.breed} • {pet.category}
                </p>

                <p className="text-sm mt-2">
                  Age: {pet.Age} | {pet.sex}
                </p>

                <Link to="/contact">
                <button className="mt-4 w-full bg-yellow-500 py-2 rounded-lg font-semibold">
                  Adopt Me ❤️
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  </>
);

}

export default PetPage;