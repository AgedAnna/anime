import { useState } from "react";
import { Button, Heading, Text, Image, Flex, Center } from "@chakra-ui/react";
import { fetchRandomAnimeGif } from "../../services";
import { AnimeApiResponseData } from "../../services/interface";
import imgLoading from "../../../public/img/Animation - 1736004414194.gif";

import styles from "./Anime.module.css";

const Anime = () => {
  const [error, setError] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const getRandomAnimeGif = async (format: "gif" | "png") => {
    setLoading(true);
    setError("");
    try {
      const data: AnimeApiResponseData = await fetchRandomAnimeGif(format);
      if (data.images && data.images.length > 0) {
        setGifUrl(data.images[0]);
      } else {
        setError("Formato de resposta inesperado.");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao buscar a imagem. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!gifUrl) return;
    const link = document.createElement("a");
    link.href = gifUrl;
    const fileName = gifUrl.split("/").pop() || "anime_image";
    link.download = fileName;
    link.target = "_blank";
    link.click();
    link.remove();
  };

  // useEffect(() => {
  //   getRandomAnimeGif("gif");
  // }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100%"
      w="100%"
      textAlign="center"
      className={styles.container}
    >
      <Heading mb={4} fontSize={["2xl", "3xl", "4xl"]} className={styles.title}>
        Anime Randomizer
      </Heading>

      {loading && (
        <Center my={10}>
          <Image
            src={imgLoading}
            alt="Loading..."
            className={styles.loadingImage}
            maxW="200px"
            maxH="200px"
            objectFit="cover"
          />
        </Center>
      )}

      {error && !loading && (
        <Text color="red.300" mb={4} fontSize="lg">
          {error}
        </Text>
      )}

      {!loading && !error && gifUrl && (
        <Image
          src={gifUrl}
          alt="Random Anime"
          maxW="100%"
          maxH="500px"
          objectFit="cover"
          borderRadius="md"
          mb={6}
          boxShadow="lg"
        />
      )}

      <Flex className={styles.buttonsContainer}>
        <Button
          size="md"
          boxShadow="lg"
          className={styles.myButton}
          onClick={() => getRandomAnimeGif("gif")}
        >
          Gerar GIF
        </Button>

        <Button
          size="md"
          boxShadow="lg"
          className={styles.myButton}
          onClick={() => getRandomAnimeGif("png")}
        >
          Gerar PNG
        </Button>

        <Button
          size="md"
          boxShadow="lg"
          className={styles.myButton}
          onClick={handleDownload}
          disabled={!gifUrl || !!error}
        >
          Baixar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Anime;
