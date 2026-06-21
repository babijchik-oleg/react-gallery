import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotosGallery({ photos }: PhotoGalleryProps) {
  return (
    <Grid>
      {photos.map((item) => (
        <PhotosGalleryItem key={item.id} photo={item} />
      ))}
    </Grid>
  );
}
