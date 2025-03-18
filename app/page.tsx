"use client";

import { Space_Grotesk } from "next/font/google";
import {
  BookOpen,
  Moon,
  Eye,
  PenLine,
  Users,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollToTop from "../components/scroll-to-top";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "../components/particle-background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionRefs = {
    happening: useRef<HTMLDivElement>(null),
    reasons: useRef<HTMLDivElement>(null),
    actions: useRef<HTMLDivElement>(null),
    final: useRef<HTMLDivElement>(null),
    resources: useRef<HTMLDivElement>(null),
  };

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs).forEach(
      (ref) => ref.current && observer.observe(ref.current)
    );

    return () => {
      Object.values(sectionRefs).forEach(
        (ref) => ref.current && observer.unobserve(ref.current)
      );
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-[#0c0613] text-zinc-200 ${spaceGrotesk.className}`}
    >
      <ParticleBackground />

      {/* Fixed side navigation for desktop */}
      <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
        <nav className="space-y-6">
          {Object.keys(sectionRefs).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`flex items-center group transition-all duration-300 ${
                activeSection === section
                  ? "text-indigo-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span
                className={`w-8 h-px mr-2 transition-all duration-300 ${
                  activeSection === section
                    ? "w-12 bg-indigo-400"
                    : "bg-zinc-700 group-hover:bg-zinc-500"
                }`}
              ></span>
              <span className="text-sm uppercase tracking-wider">
                {section === "happening" && "What's Happening"}
                {section === "reasons" && "Why It Happens"}
                {section === "actions" && "What To Do"}
                {section === "final" && "Final Words"}
                {section === "resources" && "Resources"}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full shadow-lg"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6 text-indigo-400" />
        ) : (
          <Menu className="h-6 w-6 text-indigo-400" />
        )}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md"
          >
            <div className="flex flex-col justify-center items-center h-full">
              <nav className="space-y-8 w-full px-8">
                {Object.keys(sectionRefs).map((section, index) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(section)}
                    className={`flex items-center w-full py-3 border-b border-zinc-800 ${
                      activeSection === section
                        ? "text-indigo-400"
                        : "text-zinc-400"
                    }`}
                  >
                    <span className="text-lg font-light">
                      {section === "happening" && "What's Happening"}
                      {section === "reasons" && "Why It Happens"}
                      {section === "actions" && "What To Do"}
                      {section === "final" && "Final Words"}
                      {section === "resources" && "Resources"}
                    </span>
                    <ChevronRight className="ml-auto h-5 w-5 opacity-60" />
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <header className="mb-24 pt-12 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-900/30 flex items-center justify-center">
                <Moon className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="h-px flex-grow bg-zinc-800"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-zinc-100 leading-tight">
              Understanding Your Experiences <br className="hidden md:block" />
              <span className="text-indigo-400">with the Shadow Figure</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              A comprehensive exploration of shadow figure experiences, their
              potential causes, and how to understand them through both
              scientific and cultural lenses.
            </p>
          </motion.div>
        </header>

        <section
          id="happening"
          ref={sectionRefs.happening}
          className="mb-32 scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-900/50 to-transparent"></div>
            <div className="pl-6 md:pl-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center -ml-16">
                  <Eye className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-light text-zinc-100">
                  What's Happening
                </h2>
              </div>
              <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8 shadow-xl">
                <p className="text-lg mb-6 text-zinc-300 leading-relaxed">
                  You've seen a faint{" "}
                  <span className="text-indigo-300">
                    shadow that looks like a person
                  </span>{" "}
                  when you're alone at night. It shows up near the{" "}
                  <span className="text-indigo-300">
                    stairs or on the rooftop
                  </span>
                  . It feels like{" "}
                  <span className="text-indigo-300">
                    someone is watching you
                  </span>
                  , but when you look, no one's there. The shadow never hurts
                  you, and it only happens in those specific spots. You
                  <span className="text-indigo-300"> meditate regularly</span>,
                  so that might be part of it too.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="reasons"
          ref={sectionRefs.reasons}
          className="mb-32 scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-900/50 to-transparent"></div>
            <div className="pl-6 md:pl-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center -ml-16">
                  <BookOpen className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-light text-zinc-100">
                  Why This Might Be Happening
                </h2>
              </div>
              <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8 shadow-xl">
                <p className="text-lg mb-8 text-zinc-300 leading-relaxed">
                  There are two ways to think about this—everyday reasons based
                  on science and story-based reasons from cultural beliefs.
                  Let's look at both in detail.
                </p>

                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-4 text-indigo-300 border-b border-zinc-800 pb-2">
                    Everyday Reasons (Based on Science)
                  </h3>
                  <ul className="space-y-6 text-zinc-300">
                    <li className="pl-6 border-l border-indigo-900/30">
                      <h4 className="text-lg font-medium mb-2 text-zinc-100">
                        Pareidolia (Lighting and Pattern Recognition)
                      </h4>
                      <p className="leading-relaxed">
                        Our brains are wired to recognize patterns, especially
                        human-like shapes. This phenomenon, called
                        <span className="text-indigo-300"> pareidolia</span>, is
                        why we see faces in clouds or car headlights. At night,
                        ordinary objects like chairs, plants, or light patterns
                        can create shadows that our brain interprets as human
                        figures. This is especially common in low-light
                        conditions when our visual system has less information
                        to work with.
                      </p>
                    </li>
                    <li className="pl-6 border-l border-indigo-900/30">
                      <h4 className="text-lg font-medium mb-2 text-zinc-100">
                        Hypnagogic Hallucinations
                      </h4>
                      <p className="leading-relaxed">
                        When you're tired or between wakefulness and sleep
                        (especially if you meditate before bed), your brain can
                        produce brief
                        <span className="text-indigo-300">
                          {" "}
                          hypnagogic hallucinations
                        </span>
                        . These are sensory experiences that feel real but are
                        created by your brain. Shadow figures are among the most
                        commonly reported hypnagogic hallucinations. They
                        typically appear in peripheral vision and vanish when
                        looked at directly.
                      </p>
                    </li>
                    <li className="pl-6 border-l border-indigo-900/30">
                      <h4 className="text-lg font-medium mb-2 text-zinc-100">
                        Feeling Watched (Hypervigilance)
                      </h4>
                      <p className="leading-relaxed">
                        Humans evolved a{" "}
                        <span className="text-indigo-300">
                          threat detection system
                        </span>{" "}
                        that's highly sensitive to potential dangers, including
                        the presence of others. When you're alone in quiet, dark
                        places, this system can become hyperactive, creating the
                        sensation of being watched even when no one is there.
                        This is a survival mechanism—it's better for your brain
                        to occasionally trigger a false alarm than to miss a
                        real threat.
                      </p>
                    </li>
                    <li className="pl-6 border-l border-indigo-900/30">
                      <h4 className="text-lg font-medium mb-2 text-zinc-100">
                        Meditation Effects
                      </h4>
                      <p className="leading-relaxed">
                        Regular meditation{" "}
                        <span className="text-indigo-300">
                          increases sensory awareness
                        </span>{" "}
                        and can alter how your brain processes information.
                        Studies show meditators have enhanced activity in areas
                        responsible for attention and sensory processing. This
                        heightened awareness means you might notice subtle
                        environmental changes—like slight movements of shadows
                        or small sounds—that others would miss.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-4 text-indigo-300 border-b border-zinc-800 pb-2">
                    Story-Based Reasons (Based on Beliefs)
                  </h3>
                  <ul className="space-y-6 text-zinc-300">
                    <li className="pl-6 border-l border-indigo-900/30">
                      <h4 className="text-lg font-medium mb-2 text-zinc-100">
                        Spirits and Energy Forms
                      </h4>
                      <p className="leading-relaxed">
                        Many cultural traditions believe in non-physical
                        entities that can manifest as shadows. In Indian
                        folklore, these might be
                        <span className="text-indigo-300">
                          {" "}
                          chaya (shadow beings)
                        </span>{" "}
                        or certain types of spirits. Unlike the more malevolent
                        entities in some stories, your experience seems
                        benign—just observing rather than interacting. Some
                        traditions view these as guardians or neutral entities
                        that simply share the space.
                      </p>
                    </li>
                    <li className="pl-6 border-l border-indigo-900/30">
                      <h4 className="text-lg font-medium mb-2 text-zinc-100">
                        Meditation and Spiritual Sensitivity
                      </h4>
                      <p className="leading-relaxed">
                        Across many spiritual traditions, meditation is seen as
                        a practice that
                        <span className="text-indigo-300">
                          {" "}
                          opens perceptual doorways
                        </span>
                        . Regular meditators are thought to develop sensitivity
                        to subtle energies or planes of existence that others
                        cannot perceive. Your meditation practice might be
                        enhancing your ability to perceive these entities that
                        have always been present but were previously beyond your
                        awareness threshold.
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4 text-indigo-300 border-b border-zinc-800 pb-2">
                    Why Only Those Specific Spots?
                  </h3>
                  <p className="text-lg mb-4 text-zinc-300 leading-relaxed">
                    The stairs and rooftop have specific characteristics that
                    make them more likely locations for these experiences:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-300">
                    <li className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/30">
                      <span className="text-indigo-300 block mb-1">
                        Lighting conditions
                      </span>
                      in these areas often create unusual shadows and light
                      patterns
                    </li>
                    <li className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/30">
                      <span className="text-indigo-300 block mb-1">
                        Transitional spaces
                      </span>
                      that might trigger our evolutionary alertness
                    </li>
                    <li className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/30">
                      <span className="text-indigo-300 block mb-1">
                        Acoustic properties
                      </span>
                      that amplify small sounds, increasing alertness
                    </li>
                    <li className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/30">
                      <span className="text-indigo-300 block mb-1">
                        Liminal spaces
                      </span>
                      (thresholds between different areas) where unusual
                      phenomena are more likely to occur
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="actions"
          ref={sectionRefs.actions}
          className="mb-32 scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-900/50 to-transparent"></div>
            <div className="pl-6 md:pl-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center -ml-16">
                  <PenLine className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-light text-zinc-100">
                  What You Can Do
                </h2>
              </div>
              <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8 shadow-xl">
                <p className="text-lg mb-8 text-zinc-300 leading-relaxed">
                  Here are some practical approaches to understand and address
                  your experiences:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30">
                    <h3 className="text-xl font-medium mb-3 text-indigo-300 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 text-sm">
                        1
                      </span>
                      Investigate the Lighting
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Use a flashlight at night to systematically examine the
                        stairs and rooftop
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Try changing the lighting in these areas to see if it
                        affects the appearances
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Take photos of the areas at different times to compare
                        and analyze any patterns
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30">
                    <h3 className="text-xl font-medium mb-3 text-indigo-300 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 text-sm">
                        2
                      </span>
                      Seek Corroboration
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Invite a trusted friend or family member to spend time
                        with you in these locations
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Without telling them what to look for, ask if they
                        notice anything unusual
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        If they don't see anything when you do, it might suggest
                        the experience is subjective
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30">
                    <h3 className="text-xl font-medium mb-3 text-indigo-300 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 text-sm">
                        3
                      </span>
                      Document Your Experiences
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Keep a detailed journal of each occurrence
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Note date, time, location, physical state, and
                        environmental factors
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Record your emotional state before, during, and after
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Look for patterns that might provide insights into
                        triggers
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30">
                    <h3 className="text-xl font-medium mb-3 text-indigo-300 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 text-sm">
                        4
                      </span>
                      Consult Appropriate Resources
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        If the experiences cause anxiety, speak with a counselor
                        familiar with perceptual experiences
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        For spiritual interpretations, consult with someone
                        knowledgeable in your tradition
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        Read scientific literature on perception and
                        hallucinations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="final"
          ref={sectionRefs.final}
          className="mb-32 scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-900/50 to-transparent"></div>
            <div className="pl-6 md:pl-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center -ml-16">
                  <Users className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-light text-zinc-100">
                  Final Words
                </h2>
              </div>
              <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8 shadow-xl">
                <div className="border-l-4 border-indigo-500/30 pl-6 py-2 mb-8">
                  <p className="text-xl italic text-zinc-300 leading-relaxed">
                    "The boundary between the real and the unreal is not fixed,
                    but just a consensus."
                  </p>
                </div>

                <p className="text-lg mb-6 text-zinc-300 leading-relaxed">
                  Shadow experiences like yours are{" "}
                  <span className="text-indigo-300">surprisingly common</span>.
                  Scientific research suggests they're usually the result of
                  normal brain processes interpreting ambiguous sensory
                  information, especially in low light. The fact that these
                  shadows don't interact with you or cause harm is reassuring.
                </p>
                <p className="text-lg mb-6 text-zinc-300 leading-relaxed">
                  Whether you view these experiences through a{" "}
                  <span className="text-indigo-300">
                    scientific or spiritual lens
                  </span>{" "}
                  (or both), they don't appear to represent a threat. Many
                  people find that understanding the potential mechanisms behind
                  such experiences helps reduce any anxiety associated with
                  them.
                </p>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  If the experiences ever become distressing or interfere with
                  your daily life, that would be the time to seek additional
                  support. Otherwise, you might simply view them as an{" "}
                  <span className="text-indigo-300">
                    interesting perceptual phenomenon
                  </span>{" "}
                  that reminds us how complex and fascinating human
                  consciousness can be.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="resources"
          ref={sectionRefs.resources}
          className="mb-32 scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute -left-4 md:-left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-900/50 to-transparent"></div>
            <div className="pl-6 md:pl-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center -ml-16">
                  <ExternalLink className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-light text-zinc-100">
                  More Stuff to Read
                </h2>
              </div>
              <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8 shadow-xl">
                <p className="text-lg mb-8 text-zinc-300 leading-relaxed">
                  Here are some reliable sources if you want to explore this
                  topic further:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="https://en.wikipedia.org/wiki/Shadow_person"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30 hover:border-indigo-700/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-medium mb-2 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 flex items-center">
                      Wikipedia on Shadow People
                      <ExternalLink className="h-4 w-4 ml-2 opacity-60" />
                    </h3>
                    <p className="text-zinc-400">
                      An overview of shadow figure phenomena across cultures.
                    </p>
                  </Link>

                  <Link
                    href="https://www.nature.com/articles/443287a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30 hover:border-indigo-700/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-medium mb-2 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 flex items-center">
                      Nature Article on Shadow Illusions
                      <ExternalLink className="h-4 w-4 ml-2 opacity-60" />
                    </h3>
                    <p className="text-zinc-400">
                      Scientific research on how our brains interpret shadows as
                      human figures.
                    </p>
                  </Link>

                  <Link
                    href="https://www.bbc.com/future/article/20170512-what-causes-that-feeling-of-being-watched"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30 hover:border-indigo-700/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-medium mb-2 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 flex items-center">
                      BBC Article on Feeling Watched
                      <ExternalLink className="h-4 w-4 ml-2 opacity-60" />
                    </h3>
                    <p className="text-zinc-400">
                      Explores the psychological mechanisms behind sensing an
                      unseen presence.
                    </p>
                  </Link>

                  <Link
                    href="https://liveanddare.com/your-shadow-self-and-meditation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30 hover:border-indigo-700/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-medium mb-2 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 flex items-center">
                      Live and Dare on Meditation
                      <ExternalLink className="h-4 w-4 ml-2 opacity-60" />
                    </h3>
                    <p className="text-zinc-400">
                      How meditation practices can alter perception and
                      awareness.
                    </p>
                  </Link>

                  <Link
                    href="https://www.quora.com/What-are-some-ghosts-and-demons-in-Indian-folklore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30 hover:border-indigo-700/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-medium mb-2 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 flex items-center">
                      Quora on Indian Stories
                      <ExternalLink className="h-4 w-4 ml-2 opacity-60" />
                    </h3>
                    <p className="text-zinc-400">
                      Collection of traditional Indian perspectives on spirits
                      and apparitions.
                    </p>
                  </Link>

                  <Link
                    href="https://www.reddit.com/r/Meditation/comments/1epl2yv/a_shadow_figure_of_a_woman_helping_meditate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-zinc-800/30 p-6 rounded-lg border border-zinc-700/30 hover:border-indigo-700/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-medium mb-2 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 flex items-center">
                      Reddit on Meditation and Shadows
                      <ExternalLink className="h-4 w-4 ml-2 opacity-60" />
                    </h3>
                    <p className="text-zinc-400">
                      Personal accounts from meditators who have experienced
                      shadow phenomena.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="mt-16 pt-6 border-t border-zinc-800 text-zinc-500 text-xs">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 Shadow Figure Explanation</p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="hover:text-indigo-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
      <ScrollToTop />
    </main>
  );
}
