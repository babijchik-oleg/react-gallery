import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import toast from "react-hot-toast";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSubmit = async (value: string) => {
    try {
      setPhotos([]);
      setIsLoading(true);
      setIsError(false);
      const result = await getPhotos(value);
      if (result.length === 0) {
        toast.error("No photos found for your request");
        return;
      }

      setPhotos(result);
    } catch {
      toast.error("Try again...");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {photos.length !== 0 && <PhotosGallery photos={photos} />}
          {isLoading && <Loader />}
          {isError && <Text>"Oops try again"</Text>}
        </Container>
      </Section>
    </>
  );
}
