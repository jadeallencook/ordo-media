# Ordo Media

Gives your media wings.

## Rust Functions

### get_directory_tree

takes a directory and returns an object tree representation of all media.

"/Users/Joe Doe/Desktop/media-dump" => Ok()
(emit each path name while searching)

Example:

- "/Last Summer/G123_32.jpg"
- "/Last Summer/G534_234.jpg"
- "/Last Summer/HTRRETGH.mov"

global_state = {
"/Last Summer/G123_32.jpg": { ...metadata },
"/Last Summer/G534_234.jpg": { ...metadata },
"/Last Summer/HTRRETGH.mov": { ...metadata },
"/Christmas/2024/BFGDS_234423.mp4": { ...metadata },
"/Christmas/2024/G453_435.jpg": { ...metadata },
}

### get_media_types (FE-API)

takes a directory tree and returns object of media types

"/Users/Joe Doe/Desktop/media-dump" => {
cameras: ["iPhone 16 Pro", "Canon T3i", "Meta Ray Bans"],
orientation: ["vertical", "horizontal", "square"];
}: MediaOptions

TODO Maybeeee?

- Date

### organize_media (FE-API)

{
cameras: ["Canon T3i"],
orientation: ["vertical"]
} => Stream

- "/Last Summer/G123_32.jpg": { camera: "Canon T3i", "orientation": "horizonal" } (/Users/Joe Doe/Desktop/media-dump/misc)
- "/Last Summer/G534_234.jpg": { camera: "Canon T3i", "orientation": "vertical" } (/Users/Joe Doe/Desktop/media-dump/Canon T3i Vertical)
- "/Last Summer/HTRRETGH.mov": { camera: "iPhone", "orientation": "horizonal" } (/Users/Joe Doe/Desktop/media-dump/misc)
