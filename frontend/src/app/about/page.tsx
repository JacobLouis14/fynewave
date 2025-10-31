import Appbar from "@/components/common/Appbar";
import Footer from "@/components/common/Footer";
import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <main className="flex-grow py-4 px-16">
        <h1 className="text-4xl font-semibold font-raleway mb-4 text-center">
          About
        </h1>
        <p className="text-center">
          Fynewave is a space for exploring music and more of music – genres,
          instruments, and artists. Designed for people who are eager to explore
          beyond the familiar and dive into a varied realm of music and all its
          facets, by opening a gateway to a boundless musical world through
          inspiring collection of genres, instruments, artist, and sonic
          experimentations. It offers you more than just music; it extends an
          invitation to join a vibrant and dynamic community where sounds,
          tales, and cross-cultural interactions coexist harmoniously.
        </p>
        <p className="text-center mt-2">
          At its heart, Fynewave is a dynamic platform committed to reinventing
          the digital experience of music and artist. It serves as a stage where
          artist profiling takes centre, offering musicians more than just a
          page, but a canvas to express who they are. The articles portray
          beyond their music by illustrating layers of their journey,
          inspiration, and creative process. Fynewave allows listeners to become
          more engaged by showcasing the individual who produces the sound,
          exhibiting music as more than merely a product bur as a reflection of
          life experiences and creative energy. Artists find a sanctuary to
          express their authentic stories and share their creative journeys,
          offering glimpses into the heart and soul behind every beat, melody,
          and lyric. Along with an audience, the platform offers musicians a
          supportive environment that celebrates risk-taking, innovation, and
          intimacy in the art of music-making. Listeners discover their position
          within this ecosystem through unique account profiling which creates
          distinct lines of inquiry. Every genre, experiment, and story is
          included in Fynewave's diversity, which is as broad as your
          imagination. It fosters awe at the multitude ways that music may
          inspire us, arouse our passions, and create connections between ideas
          and cultures. Music has the power to connect, inspire, and celebrate
          culture, and this is the spirit that flows through Fynewave. It
          celebrates the ever-expanding spectrum of sound and the people behind
          it. It also extends into real-world experiences; Fynewave tickets, a
          ticketing platform which is the gateway into events, concerts,
          workshops, gatherings, and live performances. Furthermore partnering
          with Fahmhaus, an electronic music event where original tracks and
          experimental sounds combine to create bold and unforgettable sonic
          experiences. Step into Fynewave, a vibrant space where music never
          stops evolving, every note leads to discovery, and every artist,
          listener, and visionary is part of an ever-growing, ever-celebrated
          family. This is the true heart of music culture where the pulse never
          fades and waves of infinite sea of rhythms stirs the soul, here to be
          truly felt. Let yourself feel the wave.
        </p>
        <h1 className="text-4xl font-semibold font-raleway mb-4 text-center mt-5">
          Contact
        </h1>
        <p className="text-center">
          email: <span>info@fynewave@gmail.com</span>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
