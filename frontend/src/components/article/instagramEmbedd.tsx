"use client";
import React, { useEffect } from "react";

const InstagramEmbedd = ({ embeddCode }: { embeddCode: string }) => {
  if (!embeddCode) return;

  useEffect(() => {
    const htmlObject = document.getElementById("instagram_EmbeddDiv");
    if (htmlObject) {
      htmlObject.innerHTML = embeddCode;

      if (!window.instgrm) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        };
        document.body.appendChild(script);
      } else {
        window.instgrm.Embeds.process();
      }
    }
  }, [embeddCode]);

  return <div id="instagram_EmbeddDiv"></div>;
};

export default InstagramEmbedd;
