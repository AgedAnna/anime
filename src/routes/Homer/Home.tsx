import React, { useEffect, useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadImageShape } from "@tsparticles/shape-image";

import type { ISourceOptions } from "@tsparticles/engine";
import Anime from "../Animes/Anime";

const Home: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadImageShape(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(() => {
    return {
      background: {
        color: { value: "#000" },
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            area: 800,
          },
        },
        move: {
          enable: true,
          speed: 2,
          direction: "bottom",
          outModes: {
            default: "out",
          },
        },
        shape: {
          type: "image",
          options: {
            image: [
              {
                src: "/sakura.png",
                width: 60,
                height: 60,
              },
              {
                src: "/fantasma.gif",
                width: 60,
                height: 60,
              },
              {
                src: "/fofs_hq.gif",
                width: 60,
                height: 60,
              },
              {
                src: "/stith.gif",
                width: 60,
                height: 60,
              },
            ],
          },
        },
        // tamanho e variação
        size: {
          value: { min: 15, max: 30 },
        },
        // opacidade
        opacity: {
          value: { min: 0.3, max: 0.8 },
        },
        // rotação
        rotate: {
          animation: {
            enable: true,
            speed: 12, // velocidade de rotação
          },
        },
      },
      detectRetina: true,
    };
  }, []);

  return (
    <Box position="relative" w="100%" h="100vh" overflow="hidden">
      {init && (
        <Particles
          id="tsparticles"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
          options={options}
        />
      )}

      <Box position="relative" zIndex={1} w="100%" h="100%">
        <Anime />
      </Box>
    </Box>
  );
};

export default Home;
