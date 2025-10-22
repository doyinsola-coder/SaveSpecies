// src/pages/Home.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  ChevronDown,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  HelpCircle,
  MapPin,
  HandHeart,
  Share2,
  ShoppingBag,
  Recycle,
  Users,
  DollarSign,
  Megaphone,
  Lightbulb
} from "lucide-react";
import StatisticsSection from "../components/StatisticsSection";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
export default function Home() {
  // Scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const Button = ({ children, variant = "solid", className = "", onClick }) => {
    const base =
      "inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none";
    const variants = {
      solid: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md",
      outline:
        "border border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600",
    };
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  };

  const ImageWithFallback = ({ src, alt, className }) => (
    <img
      src={`${src}?auto=format&fit=crop&w=600&q=60`}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => (e.target.src = "/fallback.jpg")}
    />
  );

  // --- Species section state & logic ---
  const [speciesData] = useState([
    {
      id: 1,
      commonName: "African Elephant",
      scientificName: "Loxodonta africana",
      image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694798/nam-anh-QJbyG6O0ick-unsplash_1_aropzk.jpg",
      status: "Endangered",
      trend: "Decreasing",
      region: "Sub-Saharan Africa",
      habitat: "Savanna",
      pledges: 5320,
    },
    {
      id: 2,
      commonName: "Green Sea Turtle",
      scientificName: "Chelonia mydas",
      image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694779/randall-ruiz-LVnJlyfa7Zk-unsplash_qfi5le.jpg",
      status: "Endangered",
      trend: "Decreasing",
      region: "Tropical and Subtropical Seas",
      habitat: "Marine",
      pledges: 12800,
    },
    {
      id: 3,
      commonName: "Snow Leopard",
      scientificName: "Panthera uncia",
      image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694811/robert-sachowski-HFIvhaOcHVA-unsplash_db7pzm.jpg",
      status: "Endangered",
      trend: "Decreasing",
      region: "Central and South Asia",
      habitat: "Mountain",
      pledges: 9400,
    },
  ]);

  const [pledged, setPledged] = useState({});

  const togglePledge = (id) => {
    setPledged((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "Increasing":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "Decreasing":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "Stable":
        return <Minus className="h-4 w-4 text-yellow-600" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Endangered":
        return "bg-red-100 text-red-700 border-red-300";
      case "Vulnerable":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Near Threatened":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };
  const actions = [
    {
      icon: DollarSign,
      title: "Donate to Conservation",
      description: "Support organizations working to protect endangered species and their habitats.",
      difficulty: "Easy",
      impact: "High",
      color: "from-primary/10 to-primary/5",
    },
    {
      icon: Share2,
      title: "Spread Awareness",
      description: "Share information about endangered species on social media and educate others.",
      difficulty: "Easy",
      impact: "Medium",
      color: "from-secondary/10 to-secondary/5",
    },
    {
      icon: ShoppingBag,
      title: "Choose Sustainable Products",
      description: "Buy products with eco-certifications and avoid items that harm wildlife.",
      difficulty: "Medium",
      impact: "High",
      color: "from-accent/10 to-accent/5",
    },
    {
      icon: Recycle,
      title: "Reduce Plastic Waste",
      description: "Minimize single-use plastics that harm marine life and pollute ecosystems.",
      difficulty: "Easy",
      impact: "High",
      color: "from-green-100 to-green-50",
    },
    {
      icon: Users,
      title: "Volunteer Locally",
      description: "Join local conservation groups and participate in habitat restoration projects.",
      difficulty: "Medium",
      impact: "High",
      color: "from-blue-100 to-blue-50",
    },
    {
      icon: Megaphone,
      title: "Advocate for Policy",
      description: "Contact representatives and support legislation that protects wildlife.",
      difficulty: "Medium",
      impact: "Very High",
      color: "from-purple-100 to-purple-50",
    },
  ];
  

  return (
    <>
      {/* 🦋 HERO SECTION */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 bg-emerald-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                <span className="text-sm text-emerald-700 font-medium">SDG 14 & 15 Initiative</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                Protecting Our Planet’s{" "}
                <span className="block text-emerald-600 mt-2">Endangered Species</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Join the global movement to protect endangered land and aquatic species. Learn about biodiversity,
                conservation efforts, and how you can make a difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={() => scrollToSection("species")}>
                  Explore Species
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => scrollToSection("learn")}>
                  Learn How to Help
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                {[
                  { label: "Species at Risk", value: "41K+", color: "emerald" },
                  { label: "Featured Species", value: "12", color: "blue" },
                  { label: "Pledges Made", value: "20K+", color: "teal" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className={`text-2xl sm:text-3xl font-semibold text-${stat.color}-600`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeLeft}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
                <div className="space-y-4">
                  <div className="h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-md">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1567022138889-ec78266cae0e"
                      alt="Tiger"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-md">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1721314525187-fbd947f8d06e"
                      alt="Sea Turtle"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-md">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1726773714189-de951695d154"
                      alt="Panda"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-md">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1683665281529-90ea475286e3"
                      alt="Forest"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🌿 LEARN SECTION */}
      <section id="learn" className="py-20 bg-white border-t border-gray-100">
        <motion.div
          className="container mx-auto px-6 text-center space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Learn How You Can Help</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Get involved in conservation efforts by reducing waste, supporting clean energy,
            and protecting wildlife habitats. Every action counts.
          </p>
          <Button onClick={() => window.open("https://www.worldwildlife.org", "_blank")}>
            Join the Mission
          </Button>
        </motion.div>
      </section>

      {/* 🐾 SPECIES SECTION */}
      <section id="species" className="py-20 bg-emerald-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Featured Species</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Discover some of the world's most vulnerable and inspiring species we’re working to protect.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {speciesData.map((s, i) => (
              <motion.div
                key={s.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.15 }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.commonName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <button
                    onClick={() => togglePledge(s.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      pledged[s.id] ? "bg-red-500 hover:bg-red-600" : "bg-white/90 hover:bg-white"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${pledged[s.id] ? "text-white" : "text-gray-600"}`}
                      fill={pledged[s.id] ? "currentColor" : "none"}
                    />
                  </button>
                  <span
                    className={`absolute bottom-3 left-3 text-xs px-3 py-1 rounded-full border ${getStatusColor(
                      s.status
                    )}`}
                  >
                    {s.status}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{s.commonName}</h3>
                    <p className="text-sm text-gray-500 italic">{s.scientificName}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{s.region}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(s.trend)}
                      <span>{s.trend}</span>
                    </div>
                    <span className="text-xs px-3 py-1 border rounded-full text-gray-600">{s.habitat}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart className="h-4 w-4" />
                      <span>{s.pledges.toLocaleString()} pledges</span>
                    </div>
                    {/* button for specieshshowacase page */}
                    <Link to="/learnmore">
                    <button
                      onClick={() => alert(`Viewing details for ${s.commonName}`)}
                      className="text-emerald-600 text-sm font-medium hover:underline"
                    >
                      Learn More →
                    </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
       < StatisticsSection />
      </section>
     
      

{/* === TAKE ACTION SECTION === */}
<section id="take-action" className="py-16 sm:py-24 bg-muted/50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
        <HandHeart className="h-4 w-4 text-primary" />
        <span className="text-sm text-primary">Make a Difference</span>
      </div>
      <h2 className="mb-4">How You Can Help</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Every action counts. Choose from these practical ways to contribute to wildlife conservation and protect endangered species.
      </p>
    </div>

    {/* === Action Cards === */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Card
            key={index}
            className={`p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${action.color}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs">
                {action.difficulty}
              </Badge>
            </div>
            <h3 className="mb-2">{action.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Impact: <span className="text-primary">{action.impact}</span>
              </div>
              {/* <Link to="/learnmore">
              <Button variant="ghost" size="sm">
                Learn More →
              </Button>
              </Link> */}
            </div>
          </Card>
        );
      })}
    </div>

    {/* === CTA SECTION === */}
    <Card className="overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="p-8 lg:p-12 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">Join the Movement</span>
          </div>
          <h2>Take the Conservation Pledge</h2>
          <p className="text-muted-foreground">
            Commit to protecting endangered species by taking simple, actionable steps. Join thousands of others making a difference for wildlife.
          </p>

          <ul className="space-y-3">
            {[
              "Reduce your carbon footprint",
              "Support sustainable businesses",
              "Educate others about conservation",
              "Donate to verified conservation efforts",
            ].map((pledge, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm">{pledge}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
           <Link to="/pledge">
            <Button size="lg" className="flex-1">
              Take the Pledge
            </Button>
           </Link>
          </div>
        </div>

        <div className="relative h-64 lg:h-full min-h-[400px] bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <div className="text-6xl sm:text-7xl">🌍</div>
              <div className="space-y-2">
                <div className="text-4xl text-primary">20,847</div>
                <p className="text-sm text-muted-foreground">People have taken the pledge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</section>
</>
  )
}    
  

