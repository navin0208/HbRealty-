#!/bin/bash
cd public

echo "Compressing HB-Realty-India.mov to compressed.mp4..."
ffmpeg -y -i "HB-Realty-India.mov" -vcodec libx264 -crf 28 -preset fast -an "HB-Realty-India-compressed.mp4"

echo "Compressing Dubai.mp4 to compressed..."
ffmpeg -y -i "Dubai.mp4" -vcodec libx264 -crf 28 -preset fast -an "Dubai-compressed.mp4"

echo "Compressing large images with sips..."
for img in "Warehouse p3.jpg" "WAREHOUSE P4.jpg" "Manoj-Bafana.png" "land_placeholder.png" "warehouse_clearance.png" "Cam_05-scaled.jpg" "Cam_06-scaled.jpg" "Cam_07-scaled.jpg" "Cam_08-scaled.jpg" "Cam_09-scaled.jpg" "Hitesh-scaled.png"; do
  if [ -f "$img" ]; then
    # Resize width to 1920 max and compress to jpeg/webp
    sips -Z 1920 -s format jpeg -s formatOptions 60 "$img" --out "compressed_${img%.*}.jpg"
  fi
done

echo "Done compressing. Listing new sizes:"
ls -lh *-compressed.mp4 compressed_*.jpg
