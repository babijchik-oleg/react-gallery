import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import toast from "react-hot-toast";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const handleSubmit = async (value: string) => {
    try {
      const result = await getPhotos(value);
      if (result.length === 0) {
        toast.error("No photos found for your request");
        return;
      }

      setPhotos(result);
    } catch {
      toast.error("Try again...");
    }
  };
  console.log(photos);

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
        </Container>
      </Section>
    </>
  );
}
